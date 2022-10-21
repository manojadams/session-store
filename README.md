# session-store
Simple state management with session storage

## Example usage:

### 1) Define your data
```typescript
interface IUser {
  name: string;
  email: string;
  age: number;
  gender: string;
}
```

### 2) Create your store class and inherit SessionStore like below 
```typescript
class UserStore extends SessionStore<IUser> {
  
}
```

### 3) Define your getters and setters like below
```typescript
class UserStore extends SessionStore<IUser> {
  get users() {
    return this.getData("_users");
  }
  set users(users: Array<IUser>) {
    this.setData("_users", users);
  }
}
```

### 4) Handle store lifecycle
```typescript
  useEffect(() => {
    // initialize store
    UserStore.init();
    return () => {
      // destroy store
      UserStore.destroy();
    }
  }, []);
  
```
