# session-store
A data persistence layer for a react/next-app.
It can be also used for state-management (see examples/todo-app)

## Example usage
### 1) Using javascript
#### a) Define and initialize your store
```javascript
/**
 * Extend SessionStore for session storage
 * Extend LocalStore for local storage
 */ 
class UserStore extends SessionStore {
  /**
   * Initialize your data
   * */
  constructor() {
    super();
    this.users = [];
  }
  // getters for your data
  get users() {
    return this.getData("_users");
  }
  // setter for your data
  set users(users: Array<IUser>) {
    this.setData("_users", users);
  }
  /**
   * @optional
   * Lifecycle hooks
   * Put all your startup code here. e.g.=> api calls set data
   */
  async init() {  // note that init is async
    await super.init();
    // optional startup logic
    // for example: make api calls to set initial data
    // this block is also used for depedency management
  }
  /**
   * @optional
   * Put all your cleanup code here
   */ 
  destroy() {
    // optional cleanup 
  }
}

export new UserStore();
```
#### b) In your root page component, handle store lifecycle
### 4) Handle store lifecycle
```javascript
  useEffect(() => {
    // initialize store
    UserStore.init();
    return () => {
      // destroy store
      UserStore.destroy();
    }
  }, []);
  
```

### Summary of what is happenning?
* Define your store
  ** BaseSessionStore - data persistence with session storage
  ** BaseLocalStore - data persistence with local storage
* Add data getters and setters for your store.
* Initialize all data in the constructor
* Lifecycle
    ** (optional) Put all your startup logic in the init block.
    ** (optional) Put all your cleanup logic in the destroy block.

## 2) Example usage using typescript
### a) Define your data

```typescript
interface IUser {
  name: string;
  email: string;
  age: number;
  gender: string;
}
```

### b) Create your store class and inherit SessionStore like below 
```typescript
class UserStore extends SessionStore<IUser> {
  
}
```

### Rest of the steps are same with javascript usage.

## Advanced usage

* 1) name of your store
* 2) handle store dependencies
* 3) isReady - flag to indicate your store has been initialized from data persistence layer (e.g.-> data is loaded from session storage / local storage)
* 4) isStoreReady - flag to indicate that the store has been initialized (from init block) and it is ready for serving data to its consumers (other stores/componenets etc.)
```javascript
class UserStore extends SessionStore {
  /**
   * Initialize your data
   * */
  constructor() {
    super("name_of_your_store", );
    this.users = [];
  }
}
/**
* Store1, Store2 - name of dependent stores,
* Store1, store 2 will be initialized first before initializing current store
*/
export new UserStore(Store1, Store2);
```
