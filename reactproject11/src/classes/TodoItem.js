class TodoItem{
    constructor(title){
        this.title = title;
        this.id = new Date().valueOf();
        this.isCompleted = false;
        this.createdAt = new Date();
    }
}

export default TodoItem