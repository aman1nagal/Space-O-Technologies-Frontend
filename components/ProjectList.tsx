// ProjectList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ProjectList = () => {
  const [projects, setProjects] = useState<any>([]);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const router = useRouter();

  // Fetch all projects
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.118:3000/api/projects"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.29.118:3000/api/projects",
        newProject
      );
      setProjects([...projects, response.data]);
      setNewProject({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <>
      <span className="flex items-center gap-3 float-right w-fit">
        <button
          type="button"
          className="border px-3 py-1 rounded"
          onClick={() => router.push("/tasklist")}
        >
          Add Tasks
        </button>
        <button
          type="button"
          className="border px-3 py-1 rounded"
          onClick={() => router.push("/taskassignment")}
        >
          Assign Task
        </button>
      </span>
      <div className="max-w-2xl mx-auto py-10">
        <h2 className="text-3xl font-semibold mb-6 text-center ">Projects</h2>
        <ul className="space-y-4 mb-8">
          {projects.map((project, index) => (
            <li
              key={index}
              className="bg-white shadow-md p-4 rounded-lg border"
            >
              <div className="flex">
                Project name :-
                <p className="font-bold text-lg">{project.name}</p>
              </div>
              <div className="flex">
                Project Description :-
                <p className="text-gray-600">{project.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-4">Create New Project</h3>
        <form onSubmit={handleCreateProject} className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="w-full p-2 border bg-white rounded-lg"
            required
          />
          <input
            type="text"
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-2 bg-white border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Project
          </button>
        </form>
      </div>
    </>
  );
};

export default ProjectList;
