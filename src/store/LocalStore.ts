import SessionStore from "./SessionStore";

class LocalStore<T> extends SessionStore<T> {
   constructor(name: string, ...deps: Array<LocalStore<any>>) {
    super(name, ...deps);
    this.setStoreType(localStorage);
   }
}

export default LocalStore;