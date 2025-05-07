import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  fetchProjectsRequest,
  setViewMode,
  setProjectFilter,
} from "../../redux/actions";
import { Button } from "../../components/Button";
import ProjectListView from "./ProjectListView";
import ProjectMapView from "./ProjectMapView";
import { ProjectType } from "../../types/project";

import { FilterButton } from "../../components/FilterButton";

const ProjectTablePage = () => {
  const dispatch = useDispatch();
  const { viewMode, activeFilters } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  const handleViewModeChange = (mode: "map" | "list") => {
    dispatch(setViewMode(mode));
  };

  const handleFilterChange = (type: ProjectType) => {
    const currentFilters = [...activeFilters];

    if (type === "all") {
      dispatch(setProjectFilter(["all"]));
      return;
    }

    if (currentFilters.includes("all") && type !== "all") {
      const index = currentFilters.indexOf("all");
      currentFilters.splice(index, 1);
    }

    const typeIndex = currentFilters.indexOf(type);

    if (typeIndex === -1) {
      currentFilters.push(type);
    } else {
      currentFilters.splice(typeIndex, 1);
    }

    if (currentFilters.length === 0) {
      dispatch(setProjectFilter(["all"]));
    } else {
      dispatch(setProjectFilter(currentFilters));
    }
  };

  const isFilterActive = (type: ProjectType): boolean => {
    return activeFilters.includes(type);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={viewMode === "map" ? "black" : "white"}
            onClick={() => handleViewModeChange("map")}
          >
            Map View
          </Button>
          <Button
            variant={viewMode === "list" ? "black" : "white"}
            onClick={() => handleViewModeChange("list")}
          >
            List View
          </Button>
        </div>

        <div className="flex items-center flex-wrap sm:flex-row sm:items-center sm:justify-between">
          <span className="text-white font-medium mr-2 hidden md:block">
            Filter by type
          </span>
          <div className="h-6 w-px bg-gray-300 mx-2 hidden md:block"></div>
          <div className="flex flex-wrap gap-2">
            <FilterButton
              type="all"
              isActive={isFilterActive("all")}
              onClick={handleFilterChange}
            />
            <FilterButton
              type="solar"
              isActive={isFilterActive("solar")}
              onClick={handleFilterChange}
            />
            <FilterButton
              type="wind"
              isActive={isFilterActive("wind")}
              onClick={handleFilterChange}
            />
            <FilterButton
              type="hydroelectric"
              isActive={isFilterActive("hydroelectric")}
              onClick={handleFilterChange}
            />
          </div>
        </div>
      </div>

      {viewMode === "map" ? <ProjectMapView /> : <ProjectListView />}
    </div>
  );
};
export default ProjectTablePage;
