export interface ITodo{
    id: string | number;
    title: string;
    content: string;
}

export interface ITodoContext{
    todoList: ITodo[];
    addTodo: (formData: Omit<ITodo, "id">) => void;
    removeTodo: (removingId: string) => void;
}