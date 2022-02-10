import { UpdateTask } from "../Q&M";
import { useMutation } from "urql";
import { useContext } from "react";
import { EditTaskContext } from "../context";

const EditTask = ({ reexcuteQuery }) => {
  const [editTasks, setEditTasks] = useContext(EditTaskContext);
  const [UpdateTaskResult, updateTask] = useMutation(UpdateTask);
  
  const setTaskNameHandler = (e, id) => {

    const editedTasks = editTasks.map(task => {
      // eslint-disable-next-line eqeqeq
      if(task.id != id) return task;
      
      task.name = e.target.value;
      
      return task;
    
    }); 
    setEditTasks(editedTasks);
    

  }

  const editTaskStateHandler = id => {
    const editedTasks = editTasks.map(task => {
      // eslint-disable-next-line eqeqeq
      if(task.id != id) return task;
      
      task.state = !task.state;
      return task;
    }); 

    setEditTasks(editedTasks);
  }

  const saveEditHandler = (i) => {
 
    const {
      name, 
      state,
      id 
    } = editTasks[i];

    updateTask({ id: id, name: name, state: state });
    setEditTasks([]);
  }

  return(
    <>
      { editTasks.length > 0 && (
        editTasks.map((task, index) => 
          <div className="edit-task-form" key={task.id}>
            <input 
              type="text"
              placeholder='Task Name'
              value={task.name}
              onChange={ e => setTaskNameHandler(e, task.id) }
            />
            <div className="state-box-container">
              <p>State: </p>
              <input type="checkbox"
                defaultChecked={task.state}
                onChange={() => editTaskStateHandler(task.id)}
              />
            </div>
            <div className="action-container">
              <button
                onClick={() => {
                  setEditTasks([]);
                  reexcuteQuery({ requestPolicy: 'network-only'  });
                }}
              >Cancel</button>
              <button
                onClick={() => saveEditHandler(index)}              
              >Save</button>
            </div>
          </div>
        ))
      }  
    </>
  );
}

export default EditTask;
