const User = require("../model/user");
const Project = require("../model/project");
const Task = require("../model/task");
const moment = require("moment");

module.exports = {
  hello() {
    //Hello for you guys!
    return "Hello you guys over at Innohub!";
  },
  users: async function (req) {
    //Get all users!
    const totalUsers = await User.find().countDocuments();
    const users = await User.find().sort({ createdAt: -1 });
    return {
      users: users.map(u => {
        return {
          ...u._doc,
          _id: u._id.toString(),
          createdAt: u.createdAt.toISOString(),
          updatedAt: u.updatedAt.toISOString()
        };
      }),
      totalUsers: totalUsers
    };
  },
  user: async function ({ id }, req) {
    //Get one user!
    const user = await User.findById(id);
    return {
      ...user._doc,
      _id: user._id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  },
  createUser: async function ({ userInput }, req) {
    //Create a worker!
    const user = new User({
      name: userInput.name,
      curp: userInput.curp,
      username: userInput.username,
      password: userInput.password,
      email: userInput.email
    });
    const createdUser = await user.save();
    return {
      ...createdUser._doc,
      id: createdUser._id.toString(),
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString()
    };
  },
  tasks: async function (req) {
    //Get all tasks!
    const totalTasks = await Task.find().countDocuments();
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate("workers");
    return {
      tasks: tasks.map(t => {
        return {
          ...t._doc,
          _id: t._id.toString(),
          deadline: t.deadline.toISOString(),
          createdAt: t.createdAt.toISOString(),
          updatedAt: t.updatedAt.toISOString()
        };
      }),
      totalTasks: totalTasks
    };
  },
  task: async function ({ id }, req) {
    //Get one task!
    const task = await Task.findById(id).populate("workers");
    return {
      ...task._doc,
      _id: task._id.toString(),
      deadline: task.deadline.toISOString(),
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString()
    };
  },
  createTask: async function ({ taskInput }, req) {
    //Create a task!
    if (!moment(taskInput.deadline, "DD/MM/YYYY", true).isValid()) {
      const error = new Error("Invalid date format, please use DD/MM/YYYY");
      error.code = 409;
      throw error;
    }
    const task = new Task({
      name: taskInput.name,
      description: taskInput.description,
      deadline: moment(taskInput.deadline, "DD/MM/YYYY", true).format(),
      workers: [],
      grade: taskInput.grade
    });
    const createdTask = await task.save();
    return {
      ...createdTask._doc,
      id: createdTask._id.toString(),
      deadline: createdTask.deadline.toISOString(),
      createdAt: createdTask.createdAt.toISOString(),
      updatedAt: createdTask.updatedAt.toISOString()
    };
  },
  addUserToTask: async function ({ usertaskInput }, req) {
    //Adding user to task!
    const task = await Task.findById(usertaskInput.task).populate("workers");
    task.workers.forEach(user => {
      if (user._id.toString() === usertaskInput.user) {
        const error = new Error("User is already part of the Task!");
        error.code = 409;
        error.data = task.workers;
        throw error;
      }
    });
    const user = await User.findById(usertaskInput.user);
    task.workers.push(user);
    const savedTask = await task.save();
    return {
      ...savedTask._doc,
      id: savedTask._id.toString(),
      deadline: savedTask.deadline.toISOString(),
      createdAt: savedTask.createdAt.toISOString(),
      updatedAt: savedTask.updatedAt.toISOString()
    };
  },
  projects: async function (req) {
    //Get all projects!
    const totalProjects = await Project.find().countDocuments();
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .populate({ path: "tasks", populate: { path: "workers" } });
    return {
      projects: projects.map(p => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        };
      }),
      totalProjects: totalProjects
    };
  },
  project: async function ({ id }, req) {
    //Get one project!
    const project = await Project.findById(id).populate({
      path: "tasks",
      populate: { path: "workers" }
    });
    return {
      ...project._doc,
      _id: project._id.toString(),
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString()
    };
  },
  createProject: async function ({ projectInput }, req) {
    //Create a project!
    const project = new Project({
      name: projectInput.name,
      type: projectInput.type,
      tasks: []
    });
    const createdProject = await project.save();
    return {
      ...createdProject._doc,
      id: createdProject._id.toString(),
      createdAt: createdProject.createdAt.toISOString(),
      updatedAt: createdProject.updatedAt.toISOString()
    };
  },
  addTaskToProject: async function ({ taskprojectInput }, req) {
    //Adding task to project!
    const project = await Project.findById(taskprojectInput.project).populate({
      path: "tasks",
      populate: { path: "workers" }
    });
    project.tasks.forEach(task => {
      if (task._id.toString() === taskprojectInput.task) {
        const error = new Error("Task is already part of the Project!");
        error.code = 409;
        error.data = project.tasks;
        throw error;
      }
    });
    const task = await Task.findById(taskprojectInput.task).populate("workers");
    project.tasks.push(task);
    const savedProject = await project.save();
    return {
      ...savedProject._doc,
      id: savedProject._id.toString(),
      createdAt: savedProject.createdAt.toISOString(),
      updatedAt: savedProject.updatedAt.toISOString()
    };
  },

  userGradeAverage: async function ({ id }, req) {
    //Average score per User!
    const tasks = await Task.find({ workers: id }).populate("workers");
    const user = await User.findById(id);
    let total = 0;
    tasks.forEach(task => {
      total += task.grade;
    });
    const average = total / tasks.length;

    return {
      user: {
        ...user._doc,
        id: user._id.toString(),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      },
      average: average
    };
  },
  projectsByType: async function () {
    const projects = await Project.aggregate([{ $group: { _id: "$type", tasks: { $push: "$name" } } }]);
    console.log(projects);
    return {
      _id: projects.map(p => {
        return p._id.toString();
      }),
      tasks: projects.map(p => {
        return p.tasks;
      })
    };
  }
};
