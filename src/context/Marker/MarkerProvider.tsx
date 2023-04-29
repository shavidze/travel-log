'use client';

import { FC, ReactNode, useReducer } from 'react';
import MarkerContext, { MarkerInitialState } from './MarkerContext';
import { MarkerAction, MarkerActionType, MarkerState } from './interfaces';

type Props = {
  children: ReactNode;
};

const MarkerReducer = (
  state: MarkerState,
  action: MarkerAction
): MarkerState => {
  switch (action.type) {
    case MarkerActionType.SET_CURRENT_MARKER_LOCATION:
      return {
        ...state,
        currentMarkerLocation: action.data,
      };
    case MarkerActionType.SET_MAP:
      return {
        ...state,
        map: action.data,
      };
    case MarkerActionType.SET_SIDEBAR_VISIBLE:
      if (action.data === state.sidebarOpen) return state;
      return {
        ...state,
        sidebarOpen: action.data,
      };

    default:
      return state;
  }
};

const MarkerProvider: FC<Props> = ({ children }) => {
  const [markerState, updateMarkerState] = useReducer(
    MarkerReducer,
    MarkerInitialState
  );
  return (
    <MarkerContext.Provider value={{ markerState, updateMarkerState }}>
      {children}
    </MarkerContext.Provider>
  );
};

export { MarkerProvider, MarkerContext };
