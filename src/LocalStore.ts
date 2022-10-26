import SessionStore from "./SessionStore";

class LocalStore<T> extends SessionStore<T> {
    init(deps?) {
        const sessionData = localStorage.getItem(this._name);
        if (sessionData) {
            this.__sessionData = JSON.parse(sessionData);
            this.isReady = true;
        }
    }
    destroy(): void {
        this._cleanup();
        localStorage.setItem(this._name, JSON.stringify(this.__sessionData));
    }
}

export default LocalStore;