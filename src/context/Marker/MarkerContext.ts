'use client';

import { createContext } from 'react';
import { MarkerDispatch, MarkerState } from './interfaces';

interface MarkerContext {
  markerState: MarkerState;
  updateMarkerState: MarkerDispatch;
}

export const MarkerInitialState: MarkerState = {
  currentMarkerLocation: null,
  map: null,
  sidebarOpen: false,
};

export default createContext<MarkerContext>({
  markerState: MarkerInitialState,
  updateMarkerState: () => {},
});
