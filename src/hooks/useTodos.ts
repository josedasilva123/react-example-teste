import { useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

export const useTodos = () => useContext(TodoContext);