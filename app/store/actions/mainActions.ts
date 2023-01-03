/*
 * Reducer actions related with login
 */
import * as types from './types';

export function setRunningText(value: string) {
  return {
    type: types.SET_RUNNING_TEXT,
    text: value,
  };
}

export function setRequestCount(value: number) {
  return {
    type: types.SET_REQUEST_COUNT,
    count: value,
  };
}

export function addRequestCount() {
  return {
    type: types.ADD_REQUEST_COUNT,
  };
}

export function minRequestCount() {
  return {
    type: types.MIN_REQUEST_COUNT,
  };
}

export function setRequestPerbankanCount(value: number) {
  return {
    type: types.SET_REQUEST_PERBANKAN_COUNT,
    count: value,
  };
}

export function addRequestPerbankanCount() {
  return {
    type: types.ADD_REQUEST_PERBANKAN_COUNT,
  };
}

export function minRequestPerbankanCount() {
  return {
    type: types.MIN_REQUEST_PERBANKAN_COUNT,
  };
}

export function setRequestNotarisCount(value: number) {
  return {
    type: types.SET_REQUEST_NOTARIS_COUNT,
    count: value,
  };
}

export function addRequestNotarisCount() {
  return {
    type: types.ADD_REQUEST_NOTARIS_COUNT,
  };
}

export function minRequestNotarisCount() {
  return {
    type: types.MIN_REQUEST_NOTARIS_COUNT,
  };
}

export function setRequestPPATCount(value: number) {
  return {
    type: types.SET_REQUEST_PPAT_COUNT,
    count: value,
  };
}

export function addRequestPPATCount() {
  return {
    type: types.ADD_REQUEST_PPAT_COUNT,
  };
}

export function minRequestPPATCount() {
  return {
    type: types.MIN_REQUEST_PPAT_COUNT,
  };
}

export function setRequestList(value: Array<any>) {
  return {
    type: types.SET_REQUEST_LIST,
    list: value,
  };
}

export function addRequestList(value: string) {
  return {
    type: types.ADD_REQUEST_LIST,
    list: value,
  };
}

export function minRequestList() {
  return {
    type: types.MIN_REQUEST_LIST,
  };
}

export function addJobCount() {
  return {
    type: types.ADD_JOB_COUNT,
  };
}

export function setJobCount(value: number) {
  return {
    type: types.SET_JOB_COUNT,
    count: value,
  };
}
