import './App.css';
import { useEffect, useContext } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask'; 
import { TaskListContext, EditTaskProvider } from './context';
import { useQuery } from 'urql';
import { GetTodosQuery } from './Q&M';


const App = () => {
  const setTasks = useContext(TaskListContext)[1];
  const [result, reexcuteQuery] = useQuery({
    query: GetTodosQuery
  });
  
  useEffect(() => {
    const { data } = result;
    if(data !== undefined) setTasks(data.getTaskList);
  }, [result, setTasks]);

  return (
    <div className='container'>
      <EditTaskProvider>
        <AddTask />
        <EditTask 
          reexcuteQuery={reexcuteQuery}
        />      
        <Tasks />
      </EditTaskProvider>
    </div>
  );
}

export default App;
