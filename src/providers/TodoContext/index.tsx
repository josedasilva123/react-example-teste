import { createContext, useEffect, useState } from "react";
import { IDefaultProviderProps } from "../@types";
import { ITodo, ITodoContext } from "./@types";
import { todosServices } from "../../services/todos.services";

export const TodoContext = createContext({} as ITodoContext);

export const TodoProvider = ({ children }: IDefaultProviderProps) => {
   const [todoList, setTodoList] = useState<ITodo[]>([]);

   useEffect(() => {
      todosServices.getTodos({
         onSuccess: (todoList) => setTodoList(todoList),
      });
   }, []);

   const addTodo = (formData: Omit<ITodo, "id">) => {
      todosServices.createTodo({
         requestData: formData,
         onSuccess: (newTodo) => setTodoList((todoList) => [...todoList, newTodo]),
      });
   };

   const removeTodo = (removingId: string) => {
      todosServices.removeTodo({
         removingId,
         onSuccess: () =>
            setTodoList((todoList) => todoList.filter((todo) => todo.id !== removingId)),
      });
   };

   return (
      <TodoContext.Provider value={{ todoList, addTodo, removeTodo }}>
         {children}
      </TodoContext.Provider>
   );
};
