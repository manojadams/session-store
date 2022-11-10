import { IStore } from "./../../constants";

/**
 * @author - manojgetwealthy
 * Simple state management with session storage
 */
abstract class BaseSessionStore<T> {
    protected _storeType: Storage | undefined;
    protected _sessionData: T & IStore;
    protected _name: string;
    protected _createdAt: Date;
    protected _updatedAt: Date;
    isReady: boolean;

    constructor(_name?: string, _storeType?: Storage) {
        this._name = _name || this.constructor.name;
        this._storeType = _storeType;
        this._sessionData = <T & IStore>{};
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this.isReady = false;
    }

    init(deps?) {
        const storeType = this._storeType || sessionStorage;
        const sessionData = storeType.getItem(this._name);
        if (sessionData) {
            this._sessionData = JSON.parse(sessionData);
            this.isReady = true;
        }
    }

    protected getData(dataKey: keyof T) {
        return this._sessionData[dataKey];
    }

    protected setData(dataKey: keyof T, value: any) {
        this._sessionData[dataKey] = value;
        this._updatedAt = new Date();
    }

    protected _cleanup() {
        const createdAt = this._sessionData._createdAt || this._createdAt.toISOString();
        const updatedAt = this._updatedAt.toISOString();
        this._sessionData._createdAt = createdAt;
        this._sessionData._updatedAt = updatedAt;
    }

    destroy() {
        this._cleanup();
        const storeType = this._storeType || sessionStorage;
        storeType.setItem(this._name, JSON.stringify(this._sessionData));
    }

    remove() {
        const storeType = this._storeType || sessionStorage;
        storeType.removeItem(this._name);
    }
}

export default BaseSessionStore;

