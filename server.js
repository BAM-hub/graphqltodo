const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} = require('graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());


let taskList = [];

const TaskType = new GraphQLObjectType({
  name: 'Task',
  description: 'This is Gonna be a list of tasks',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    state: { type: GraphQLBoolean }
  })
});

const RootMutationType = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Root Mutations',
  fields: () => ({
    addTask: {
      type: TaskType,
      description: 'Add New Task',
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLBoolean }
      },
      resolve: (parent, { name, state }) => {
        const id = taskList.length === 0 ? 0 
        : taskList[taskList.length -1].id + 1;
        
        taskList.push({ id, name, state });
        return taskList[taskList.length -1];
      }
    },
    updateTask: {
      type:  TaskType,
      description: 'Change tasks',
      args: { 
        id: { type: GraphQLNonNull(GraphQLID) }, 
        name: { type: GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLNonNull(GraphQLBoolean) }
      },
      resolve: (parent, { id, name, state }) => {

        task = taskList.filter(task => {
          if(task.id == id) {

            task.state = state;
            task.name = name;
            return task;
          }
        });
        return task[0];
      }
    },
    deleteTask: {
      type: GraphQLList(TaskType),
      args: { id: { type: GraphQLID } },
      resolve: (__, { id }) => {
        return taskList = taskList.filter(task => task.id != id);
      }
    },
 }),
});


const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    getTaskList: {
      type: new GraphQLList(TaskType),
      description: 'Current Task List',
      resolve: () => {
        return taskList;
      }
    }
  })
});




const TodoSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
}); 

const root = {
  hello: () =>  'hello world!',
  task: () => 'task!!'
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: TodoSchema,
    graphiql: true,
    rootValue: root
  })
);

//server static assets in production
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 4000 ;

app.listen(PORT, () => console.log('server running'));
