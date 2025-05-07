export type ProjectType = 'all' | 'solar' | 'wind' | 'hydroelectric';

export interface Project {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  project_type: string;
}

export interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: null | string;
  activeFilters: ProjectType[];
  viewMode: 'map' | 'list';
}