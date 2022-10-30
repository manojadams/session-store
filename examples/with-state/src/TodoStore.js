import BaseStore from '@manojadams/session-store';

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

export default new TodoStore();