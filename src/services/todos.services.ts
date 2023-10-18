import { ITodo } from "../providers/TodoContext/@types";
import { api } from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IRequestDefaultParams<T = () => void>{
    onSuccess?: T;
    onError?: (error: unknown) => Promise<void> | void;
}

const getTodos = async ({ onSuccess, onError}: IRequestDefaultParams<(data: ITodo[]) => void>) => {
    try {
        const { data } = await api.get<ITodo[]>("/todos");

        if (onSuccess) onSuccess(data);
    } catch (error) {
        console.log(error);
        if (onError) onError(error);
    }
}

interface ICreateTodoParams extends IRequestDefaultParams<(data: ITodo) => void>{
    requestData: Omit<ITodo, "id">;
}

const createTodo = async ({ requestData, onSuccess, onError}: ICreateTodoParams) => {
    try {
        const { data } = await api.post<ITodo>("/todos", requestData);

        if (onSuccess) onSuccess(data);
    } catch (error) {
        console.log(error);
        if (onError) onError(error);
    }
}

interface IRemoveTodoParams extends IRequestDefaultParams{
    removingId: string
}

const removeTodo = async ({ removingId, onSuccess, onError}: IRemoveTodoParams) => {
    try {
        await api.delete(`/todos/${removingId}`);
        
        if (onSuccess) onSuccess();
    } catch (error) {
        console.log(error);
        if (onError) onError(error);
    }
}

export const todosServices = { getTodos, createTodo, removeTodo };