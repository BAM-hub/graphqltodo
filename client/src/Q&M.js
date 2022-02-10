import { gql } from "urql";

export const GetTodosQuery = `
query {
  getTaskList{
    name
    state
    id
  }  
}
`;

export const AddTaskMutation = gql`
mutation($name: String!, $state: Boolean) {
  addTask(name: $name, state: $state ){
    id
    state
    name
  }
}
`;

export const DeleteTask = gql`
  mutation($id: ID!) {
    deleteTask(id: $id){
      id
      state
      name
    }
  }
`;

export const UpdateTask = gql`
  mutation($id: ID!, $name: String!, $state: Boolean!) {
    updateTask(id: $id, name: $name, state: $state) {
      id
      name
      state
    }
  }
`;