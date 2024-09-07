// TaskAssignment.js
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const TaskAssignment = () => {
  const [assignedTo, setAssignedTo] = useState("");

  const [selectTask, setSelectTask] = useState([]);
  const [tasks, setTasks] = useState([]);

  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "https://kafka-x70f.onrender.com/api/getAllTask"
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://kafka-x70f.onrender.com/api/tasks/assign`,
        {
          taskId: selectTask,
          assignedTo: assignedTo,
        }
      );
      debugger;
      console.log(response, "asdasd");
      setAssignedTo("");
    } catch (error) {
      console.error("Error assigning task:", error);
    }
  };

  console.log(selectTask);
  return (
    <>
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
          onClick={() => router.push("/tasklist")}
        >
          Add Task
        </button>
      </span>
      <div className="max-w-md mx-auto py-10">
        <h3 className="text-2xl font-semibold mb-4">Assign Task</h3>
        <form onSubmit={handleAssignTask} className="space-y-4">
          <div className="w-full mx-auto">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="project"
            >
              Select a Project
            </label>
            <select
              id="project"
              value={selectTask}
              onChange={(e: any) => setSelectTask(e.target.value)}
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              {tasks?.map((items, i) => (
                <option key={i} value={items.id}>{items.title}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Assign to User"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full p-2 border bg-white rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          >
            Assign Task
          </button>
        </form>
      </div>
    </>
  );
};

export default TaskAssignment;
