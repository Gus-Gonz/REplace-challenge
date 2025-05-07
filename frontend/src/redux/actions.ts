import { ProjectType } from '../types/project';

export const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST';
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS';
export const FETCH_PROJECTS_FAILURE = 'FETCH_PROJECTS_FAILURE';
export const SET_PROJECT_FILTER = 'SET_PROJECT_FILTER';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';

export const fetchProjectsRequest = (projectTypes: ProjectType[] = ['all']) => ({
  type: FETCH_PROJECTS_REQUEST,
  payload: { projectTypes }
});

export const fetchProjectsSuccess = (projects: any[]) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: { projects }
});

export const fetchProjectsFailure = (error: string) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: { error }
});

export const setProjectFilter = (projectTypes: ProjectType[]) => ({
  type: SET_PROJECT_FILTER,
  payload: { projectTypes }
});

export const setViewMode = (viewMode: 'map' | 'list') => ({
  type: SET_VIEW_MODE,
  payload: { viewMode }
});