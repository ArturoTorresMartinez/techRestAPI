const { buildSchema } = require("graphql");

//Also defining schemas, that's why I love GraphQL!
module.exports = buildSchema(`

type User {
    _id: ID!
    name: String!
    curp: String!
    username: String!
    password: String!
    email: String!
    createdAt: String!
    updatedAt: String!
}

type Task {
    _id: ID!
    name: String!
    description: String!
    deadline: String!
    workers: [User]
    grade: Int
    createdAt: String!
    updatedAt: String!
}


type Project {
    _id: ID!
    name: String!
    type: String!
    tasks: [Task]
    createdAt: String!
    updatedAt: String!
}

type UserData {
    users: [User]
    totalUsers: Int!
}

type TaskData {
    tasks: [Task]
    totalTasks: Int!
}

type ProjectData {
    projects: [Project]
    totalProjects: Int!
}

type AverageData {
    user: User!
    average: Float!
}

input UserInputData {
    name: String!
    curp: String!
    username: String!
    password: String!
    email: String!
}

input TaskInputData {
    name: String!
    description: String!
    deadline: String!
    grade: Int!
}

input UserTaskInputData {
    task: ID!
    user: ID!
}

input ProjectInputData {
    name: String!
    type: String!
}

input TaskProjectInputData {
    project: ID!
    task: ID!
}


type RootQuery {
    hello: String!
    users: UserData!
    user(id: ID!): User!
    tasks: TaskData!
    task(id: ID!): Task!
    projects: ProjectData!
    project(id: ID!): Project!
    userGradeAverage(id: ID): AverageData!

}

type RootMutation {
    createUser(userInput: UserInputData): User!
    createTask(taskInput: TaskInputData): Task!
    createProject(projectInput: ProjectInputData): Project!
    addTaskToProject(taskprojectInput: TaskProjectInputData): Project!
    addUserToTask(usertaskInput: UserTaskInputData): Task!

}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
