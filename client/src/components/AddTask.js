import React, { useContext, useState } from 'react';
import { useMutation } from 'urql';
import { AddTaskMutation } from '../Q&M';
import { TaskListContext } from '../context';

const AddTask = () => {
  const setTasks = useContext(TaskListContext)[1];
  const [taskName, setTaskName] = useState('');
  const [AddTaskResult, addTask] = useMutation(AddTaskMutation);
  const addTaskHandler = async () => {
    const res = await addTask({ name: taskName, state: false });
    
    setTasks(prevState => (
      [...prevState, res.data.addTask]
    ));
    setTaskName('');
  }
  return(
    <div className="add-task">
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder='task title'
      />
      <button
        onClick={() => addTaskHandler()}
      >Submit</button>
  </div>
  );
}

export default AddTask;
