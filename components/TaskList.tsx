import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { toNamespacedPath } from "path";
import { useRouter } from "next/router";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [taskBasedOnProject, setTaskBasedProject] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "Active",
  });

  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectDropDown, setSelectedProjectDropDown] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (selectedProjectDropDown) {
      fetchTaskbasedOnProduct();
    }
  }, [selectedProjectDropDown]);

  console.log(selectedProject, "selectedProject");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchTaskbasedOnProduct = async () => {
    try {
      const response = await axios.get(
        `https://kafka-x70f.onrender.com/api/projects/${selectedProjectDropDown}/tasks`
      );
      setTaskBasedProject(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://kafka-x70f.onrender.com/api/projects"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/api/projects/${selectedProject}/tasks`
  //     );
  //     setTasks(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };
  console.log(newTask.status);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://kafka-x70f.onrender.com/api/tasks",
        {
          ...newTask,
          projectId: selectedProject,
        }
      );
      setTasks(response.data);
      setNewTask({ title: "", description: "", status: "Active" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="w-full mx-auto py-10 ">
      <span className="flex items-center gap-3 float-right w-fit">
        <button
          type="button"
          className="border px-3 py-1 rounded"
          onClick={() => router.push("/project")}
        >
          Add Projects
        </button>
        <button
          type="button"
          className="border px-3 py-1 rounded"
          onClick={() => router.push("/taskassignment")}
        >
          Assign Task
        </button>
      </span>
      <div className="w-1/2">
        <ul className="space-y-4 mb-8">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow-md p-4 rounded-lg border"
            >
              <p className="font-bold text-lg">{task.title}</p>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-400">Status: {task.status}</p>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Create New Task</h3>
        <form onSubmit={handleCreateTask} className="space-y-2">
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="project"
            >
              Select a Project
            </label>
            <select
              id="project"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              {projects.map((items, i) => (
                <option key={i} value={items.id}>
                  {items.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span>
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Task Title
              </label>
            </span>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full p-2 border bg-white rounded-lg"
              required
            />
          </div>
          <div>
            <span>
              <label className="block text-gray-700 text-sm font-bold mt-2">
                Task Description
              </label>
            </span>
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full bg-white p-2 border rounded-lg"
              required
            />
          </div>
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="task-status"
            >
              Task Status
            </label>
            <div id="task-status" className="flex items-center">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  // checked={newTask.status === "Active"}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="form-radio"
                />
                <span className="ml-2">Active</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  // checked={newTask.status === "Inactive"}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="form-radio"
                />
                <span className="ml-2">Inactive</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Task
          </button>
        </form>
      </div>
      <div className="w-1/2  left-0 flex flex-col justify-start ">
        <h2 className="text-2xl mt-10 font-semibold mb-4">
          Tasks for Project {selectedProject}
        </h2>
        <div className="w-1/2 bg-red-400 ">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="project"
          >
            Select a Project
          </label>
          <select
            id="project"
            value={selectedProjectDropDown}
            onChange={(e) => setSelectedProjectDropDown(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {projects.map((items, i) => (
              <option key={i} value={items.id}>
                {items.name}
              </option>
            ))}
          </select>
        </div>
        <table className="mt-10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Id</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="">
            {taskBasedOnProject.map((item) => (
              <Task
                key={item.id}
                id={item.id}
                name={item.title.length > 0 ? item.title : "-"}
                productId={item.project_id}
                description={item.description}
                status={item.status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Task = ({ id, productId, name, description, status }) => {
  return (
    <tr className="border">
      <td className="text-center">{id}</td>
      <td className="text-center">{productId}</td>
      <td className="text-center">{name}</td>
      <td className="text-center">{description}</td>
      <td className="text-center">{status}</td>
    </tr>
  );
};

export default TaskList;
