const fs = require("fs"); // fs(file system) build in nodejs

const readAllTasks = () => {
  const buffer = fs.readFileSync("./app/task.json", "utf-8"); // nó sẻ trả về mả hex => chúng ta nên tham số utf8 (có kiểu string)
  // chuyển sang kiểu json
  const taskJson = JSON.parse(buffer);
  return taskJson;
};

const createTask = (title, description) => {
  const newTask = {
    id: Math.random().toString(),
    title: title,
    description: description,
  };
  let taskList = readAllTasks();
  taskList = [...taskList, newTask]; // tương đương với lệnh push vào mảng nhưng nó không có tham chiểu địa chỉ
  fs.writeFileSync("./app/task.json", JSON.stringify(taskList)); // chuyển sang dạng chuổi
  return newTask;
};

const readDetailTask = (id) => {
  const getAllTask = readAllTasks();
  const task = getAllTask.find((task) => task.id === id);
  return task;
};

const updateTask = (id, title, description) => {
  let getAllTask = readAllTasks();
  const index = getAllTask.findIndex((task) => task.id === id);
  if (index !== -1) {
    const oldTask = getAllTask[index];
    const newTask = { ...oldTask, title, description };
    getAllTask[index] = newTask;
    fs.writeFileSync("./app/task.json", JSON.stringify(getAllTask));
    return newTask;
  } else {
    return false;
  }
};

module.exports = {
  readAllTasks: readAllTasks,
  createTask: createTask,
  readDetailTask: readDetailTask,
  updateTask: updateTask,
};
