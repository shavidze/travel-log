import { Dispatch } from 'react';

export interface MarkerState {
  currentMarkerLocation: L.LatLng | null;
  sidebarOpen: boolean;
  map: L.Map | null;
}

export enum MarkerActionType {
  SET_CURRENT_MARKER_LOCATION = 'SET_CURRENT_MARKER_LOCATION',
  SET_SIDEBAR_VISIBLE = 'SET_SIDEBAR_VISIBLE',
  SET_MAP = 'SET_MAP',
}

export interface MarkerAction {
  type: MarkerActionType;
  data: any;
}

export interface SetCurrentMarkerLocationAction extends MarkerAction {
  type: MarkerActionType.SET_CURRENT_MARKER_LOCATION;
  data: L.LatLng | null;
}

export interface SetSidebarVisible extends MarkerAction {
  type: MarkerActionType.SET_SIDEBAR_VISIBLE;
  data: boolean;
}

export interface SetMap extends MarkerAction {
  type: MarkerActionType.SET_MAP;
  data: L.Map | null;
}

export type MarkerActionTypes =
  | SetMap
  | SetCurrentMarkerLocationAction
  | SetSidebarVisible;

export type MarkerDispatch = Dispatch<MarkerActionTypes>;
