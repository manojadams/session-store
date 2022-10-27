import SessionStore from "./SessionStore";

class BaseSessionStore<T> extends SessionStore<T> {
    isStoreReady: boolean;
    private _deps: Array<BaseSessionStore<any>>;
    constructor(...deps: Array<BaseSessionStore<any>>) {
        super();
        this.isStoreReady = false;
        this._deps = deps;
    }
    async init() {
        super.init();
        if (this.isStoreReady) return;
        if (this._deps) {
            for (let i =0; i < this._deps.length; i++) {
                await this._deps[i].init();
            }
        }
    }
}

export default BaseSessionStore;