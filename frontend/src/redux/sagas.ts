import { put, call, takeLatest, all, select } from "redux-saga/effects";
import {
  FETCH_PROJECTS_REQUEST,
  SET_PROJECT_FILTER,
  fetchProjectsSuccess,
  fetchProjectsFailure,
} from "./actions";
import Api from "../utils/Api";

function* fetchProjects(action?: any) {
  try {
    const { projectTypes } = action.payload;
    const endpoint = "/projects/";

    const params = !projectTypes.includes("all")
      ? { project_type: projectTypes }
      : {};

    const response = yield call(() => Api.fetch(endpoint, params));
    yield put(fetchProjectsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchProjectsFailure(error.message || "Failed to fetch projects")
    );
  }
}

function* watchFetchProjects() {
  yield takeLatest(FETCH_PROJECTS_REQUEST, fetchProjects);
}

function* watchProjectFilterChange() {
  yield takeLatest(SET_PROJECT_FILTER, fetchProjects);
}

export default function* rootSaga() {
  yield all([watchFetchProjects(), watchProjectFilterChange()]);
}
