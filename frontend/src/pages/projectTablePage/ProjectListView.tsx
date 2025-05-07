import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Project } from "../../types/project";

const ProjectListView = () => {
  const { projects, loading, error } = useSelector(
    (state: RootState) => state.projects
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid border-r-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white shadow-blue-200">
      <table className="min-w-full text-sm text-left text-gray-800">
        <thead className="text-xs uppercase bg-blue-50">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project: Project) => (
            <tr
              key={project.id}
              className="hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-6 py-4">{project.id}</td>
              <td className="px-6 py-4 font-medium">{project.name}</td>
              <td className="px-6 py-4 capitalize">{project.project_type}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {project.latitude.toFixed(4)}, {project.longitude.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectListView;
