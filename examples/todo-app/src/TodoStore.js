import BaseStore from '@manojadams/session-store';
import { proxy } from 'valtio';

class TodoStore extends BaseStore {

    constructor() {
        super();
        this.tasks = [];
    }

    init() {
        super.init();
    }

    get tasks() {
        return this.getData("_tasks");
    }

    set tasks(tasks) {
        this.setData("_tasks", tasks);
    }
}

export default proxy(new TodoStore());