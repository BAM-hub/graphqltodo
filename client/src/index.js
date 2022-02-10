import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TaskListProvider } from './context';
import { Provider, createClient } from 'urql';

const client = new createClient({
  url: 'http://localhost:4000/graphql',
});

ReactDOM.render(
  <Provider value={client} >
    <TaskListProvider>
      <App />
    </TaskListProvider>
  </Provider>,
  document.getElementById('root')
);

