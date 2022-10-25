import { IStore } from "./constants";

/**
 * @author - manojgetwealthy
 * Simple state management with session storage
 */
abstract class SessionStore<T extends IStore> {
    protected __sessionData: T;
    protected _name: string;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    isReady: boolean;

    constructor(_name?: string) {
        this._name = _name || this.constructor.name;
        this.__sessionData = <T>{};
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this.isReady = false;
    }

    init() {
        const storeName = this.constructor.name;
        const sessionData = sessionStorage.getItem(storeName);
        if (sessionData) {
            this.__sessionData = JSON.parse(sessionData);
        }
    }

    protected getData(dataKey: keyof T) {
        return this.__sessionData[dataKey];
    }

    protected setData(dataKey: keyof T, value: any) {
        this.__sessionData[dataKey] = value;
        this._updatedAt = new Date();
    }

    destroy() {
        const createdAt = this.getData("_createdAt") || this._createdAt.toISOString();
        const updatedAt = this._updatedAt.toISOString();
        this.setData("_createdAt", createdAt);
        this.setData("_updatedAt", updatedAt);
        sessionStorage.setItem(this._name, JSON.stringify(this.__sessionData));
    }
}

export default SessionStore;

