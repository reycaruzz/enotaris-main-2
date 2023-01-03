import { ISetRequestCount } from './../../models/actions/main';
/**
 * Loading reducer made separate for easy blacklisting
 * Avoid data persist
 */
import createReducer from 'app/lib/createReducer';
import * as types from 'app/store/actions/types';

import { IMainState } from 'app/models/reducers/main';
import * as main from 'app/models/actions/main';

const initialState: IMainState = {
  runningText: '',
  requestCount: 0,
  requestPerbankanCount: 0,
  requestPPATCount: 0,
  requestNotarisCount: 0,
  unopenedRequest: [],
  jobCount: 0,
};

export const mainReducer = createReducer(initialState, {
  [types.SET_RUNNING_TEXT](state: IMainState, action: main.ISetRunningText) {
    return { ...state, runningText: action.text };
  },
  [types.ADD_REQUEST_LIST](state: IMainState, action: main.ISetRequestList) {
    state.unopenedRequest.push(action.list);
    return { ...state };
  },
  [types.MIN_REQUEST_LIST](state: IMainState) {
    state.unopenedRequest = [];
    return { ...state };
  },
  [types.SET_REQUEST_LIST](state: IMainState, action: main.ISetRequestList) {
    return { ...state, unopenedRequest: action.list };
  },
  [types.ADD_REQUEST_COUNT](state: IMainState) {
    state.requestCount++;
    return { ...state };
  },
  [types.MIN_REQUEST_COUNT](state: IMainState) {
    state.requestCount--;
    return { ...state };
  },
  [types.SET_REQUEST_COUNT](state: IMainState, action: main.ISetRequestCount) {
    return { ...state, requestCount: action.count };
  },
  [types.ADD_REQUEST_PERBANKAN_COUNT](state: IMainState) {
    state.requestPerbankanCount++;
    return { ...state };
  },
  [types.MIN_REQUEST_PERBANKAN_COUNT](state: IMainState) {
    state.requestPerbankanCount--;
    return { ...state };
  },
  [types.SET_REQUEST_PERBANKAN_COUNT](
    state: IMainState,
    action: main.ISetRequestPerbankanCount,
  ) {
    return { ...state, requestPerbankanCount: action.count };
  },
  [types.ADD_REQUEST_PPAT_COUNT](state: IMainState) {
    state.requestPPATCount++;
    return { ...state };
  },
  [types.MIN_REQUEST_PPAT_COUNT](state: IMainState) {
    state.requestPPATCount--;
    return { ...state };
  },
  [types.SET_REQUEST_PPAT_COUNT](
    state: IMainState,
    action: main.ISetRequestPPATCount,
  ) {
    return { ...state, requestPPATCount: action.count };
  },
  [types.ADD_REQUEST_NOTARIS_COUNT](state: IMainState) {
    state.requestNotarisCount++;
    return { ...state };
  },
  [types.MIN_REQUEST_NOTARIS_COUNT](state: IMainState) {
    state.requestNotarisCount--;
    return { ...state };
  },
  [types.SET_REQUEST_NOTARIS_COUNT](
    state: IMainState,
    action: main.ISetRequestNotarisCount,
  ) {
    return { ...state, requestNotarisCount: action.count };
  },
  [types.ADD_JOB_COUNT](state: IMainState) {
    state.jobCount++;
    return { ...state };
  },
  [types.SET_JOB_COUNT](state: IMainState, action: main.ISetJobCount) {
    return { ...state, jobCount: action.count };
  },
});
