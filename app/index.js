// import yargs from "yargs"; es6

const yargs = require("yargs"); // es5
const fs = require("fs"); // fs(file system) build in nodejs

const {
  readAllTasks,
  createTask,
  readDetailTask,
  updateTask,
  deleteTask,
} = require("./model/taskModel");

// node app/index.js test

//CRUD

// node app/index.js create --title="hoc nodejs" --description="Hoc nodejs tai cyberLearn"
yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: function (args) {
    const { title, description } = args;
    const newTask = createTask(title, description);
    console.log("Bạn vừa thêm thành công công việc mới", newTask);
  },
});

//node app/index.js read-all
yargs.command({
  command: "read-all",
  handler: function () {
    const rs = readAllTasks();
    console.log("All Task", rs);
  },
});

//node app/index.js read-detail --id="123"
yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: function (args) {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log("Task cần tìm là: ", task);
    } else {
      console.log("Task is not found");
    }
  },
});

//node app/index.js update --id="123" --title="Hoc nodejs" --description="Kho qua"
yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },

  handler: function (args) {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log("task updated", task);
    } else {
      console.log("Task is not found");
    }
  },
});

//node app/index.js delete --id="123"
yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: function (arguments) {
    const { id } = arguments;
    const task = deleteTask(id);
    if (task) {
      console.log("Delete Task succeed", task);
    } else {
      console.log("Not found !");
    }
  },
});

// lưu lại các lệnh vừa tạo
yargs.parse();
