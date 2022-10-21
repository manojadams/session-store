
/**
 * @author - manojgetwealthy
 * Simple state management with session storage
 */
abstract class SessionStore<T> {
    protected __sessionData: T;

    constructor() {
        this.__sessionData = <T>{};
    }

    init() {
        const storeName = this.constructor.name;
        try {
            const sessionData = sessionStorage.getItem(storeName);
            if (sessionData) {
                this.__sessionData = JSON.parse(sessionData);
            }
        } catch {
            console.error("store_init_error\t:", storeName);
        }
    }

    protected getData(dataKey: keyof T) {
        return this.__sessionData[dataKey];
    }

    protected setData(dataKey: keyof T, value: any) {
        this.__sessionData[dataKey] = value;
    }

    destroy() {
        const storeName = this.constructor.name;
        sessionStorage.setItem(storeName, JSON.stringify(this.__sessionData));
    }
}

export default SessionStore;