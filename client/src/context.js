import { createContext, useState } from "react";

export const TaskListContext = createContext();

export const TaskListProvider = (props) => {
  const [tasks, setTasks] = useState([]);

  return (
    <TaskListContext.Provider value={[tasks, setTasks]}>
      {props.children}
    </TaskListContext.Provider>
  );
}

export const EditTaskContext = createContext();

export const EditTaskProvider = (props) => {
  const [editTasks, setEditTasks] = useState([]);
  return (
  <EditTaskContext.Provider value={[editTasks, setEditTasks]} >
    {props.children}
  </EditTaskContext.Provider>
  );
}