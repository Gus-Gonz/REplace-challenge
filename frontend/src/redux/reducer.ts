import { ProjectsState, Project } from "../types/project";
import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  SET_PROJECT_FILTER,
  SET_VIEW_MODE,
} from "./actions";

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
  activeFilters: ["all"],
  viewMode: "map",
};

const projectsReducer = (state = initialState, action: any): ProjectsState => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PROJECTS_SUCCESS:
      const normalizedProjects: Project[] = action.payload.projects.map(
        (p: any) => ({
          ...p,
          type: p.project_type,
          latitude: Number(p.latitude),
          longitude: Number(p.longitude),
        })
      );

      return {
        ...state,
        loading: false,
        projects: normalizedProjects,
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    case SET_PROJECT_FILTER:
      return {
        ...state,
        activeFilters: action.payload.projectTypes,
      };

    case SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.payload.viewMode,
      };

    default:
      return state;
  }
};

export default projectsReducer;
