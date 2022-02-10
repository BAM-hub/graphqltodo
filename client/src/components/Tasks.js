import React, { useContext } from 'react';
import { EditTaskContext, TaskListContext } from '../context';
import { DeleteTask } from '../Q&M';
import { useMutation } from 'urql';

const Tasks= () => {
  const [tasks, setTasks] = useContext(TaskListContext);
  const [editTasks, setEditTasks] = useContext(EditTaskContext);
  const [DeleteTaskResult, deletTask] = useMutation(DeleteTask);

  const deleteTaskHandler = async (id) => {
    const res = await deletTask({ id: id });
    let newTasks = tasks.filter(
      // eslint-disable-next-line eqeqeq
      task => task.id == res.data.deleteTask.id 
    );
    setTasks(newTasks);
  }

  const EditTaskHandle = (newTask) => {
    
    if(editTasks.length > 0) {
      // eslint-disable-next-line eqeqeq
      let check = editTasks.filter(task => task.id == newTask.id && task);
      if(check.length > 0) return;
    }
    
    setEditTasks(prevState => (
      [...prevState, newTask]
    ));
  }

  return (
    <div className='tasks-container'>
    {
    tasks.map(task => (
      <div className='task' key={task.id}>
        <div className="name">
          <p>{task.name}</p>
        </div>
        <div className="state">
          <p>State: {task.state ? ('Done'): ('In Progress') }</p>
        </div>
        <div className="edit-task">
          <button
            onClick={() => EditTaskHandle(task)}
          >Edit</button>
        </div>
        <div 
          className="delete-task" 
          onClick={() => deleteTaskHandler(task.id)}>
          <p>X</p>
        </div>
      </div>
    ))
    }
  </div>
  );
}

export default Tasks;
