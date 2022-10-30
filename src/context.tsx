import React from "react";

export interface AppContextInterface {
    removeTodo(id: number): void,
    toggleTodo(id: number): void
  }
  

const Context = React.createContext <AppContextInterface>(undefined!)

export default Context