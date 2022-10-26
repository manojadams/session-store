import { IStore } from "./constants";

/**
 * @author - manojgetwealthy
 * Simple state management with session storage
 */
abstract class SessionStore<T> {
    protected __sessionData: T & IStore;
    protected _name: string;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    isReady: boolean;

    constructor(_name?: string) {
        this._name = _name || this.constructor.name;
        this.__sessionData = <T & IStore>{};
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this.isReady = false;
    }

    init(deps?) {
        const sessionData = sessionStorage.getItem(this._name);
        if (sessionData) {
            this.__sessionData = JSON.parse(sessionData);
            this.isReady = true;
        }
    }

    protected getData(dataKey: keyof T) {
        return this.__sessionData[dataKey];
    }

    protected setData(dataKey: keyof T, value: any) {
        this.__sessionData[dataKey] = value;
        this._updatedAt = new Date();
    }

    protected _cleanup() {
        const createdAt = this.__sessionData._createdAt || this._createdAt.toISOString();
        const updatedAt = this._updatedAt.toISOString();
        this.__sessionData._createdAt = createdAt;
        this.__sessionData._updatedAt = updatedAt;
    }

    destroy() {
        this._cleanup();
        sessionStorage.setItem(this._name, JSON.stringify(this.__sessionData));
    }
}

export default SessionStore;

