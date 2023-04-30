'use client';

import { useContext } from 'react';
import MarkerContext from '@/context/Marker/MarkerContext';
import { MarkerActionType } from '@/context/Marker/interfaces';
import TravelLogsForm from './TravelLogsForm';

const TravelLogSideBar = () => {
  const { markerState, updateMarkerState } = useContext(MarkerContext);
  const setSideBar = (data: boolean) => {
    updateMarkerState({
      type: MarkerActionType.SET_SIDEBAR_VISIBLE,
      data,
    });
  };
  const handleSidebarClick = () => {
    if (markerState.map) {
      const data = markerState.map.getCenter();
      updateMarkerState({
        type: MarkerActionType.SET_CURRENT_MARKER_LOCATION,
        data,
      });
      markerState.map.flyTo(data, 5);
    }
    setSideBar(true);
  };
  const closeSideBar = () => setSideBar(false);
  return (
    <>
      <div className="fixed top-2 right-2 z-[999]">
        <button className="btn btn-info" onClick={handleSidebarClick}>
          Create Travel Info
        </button>
      </div>
      {markerState.sidebarOpen && (
        <div className="fixed h-full menu p-4 w-[520px] bg-base-200 text-base-content overflow-y-auto top-0 right-0 z-[999]">
          <TravelLogsForm onCancel={closeSideBar} onComplete={closeSideBar} />
        </div>
      )}
    </>
  );
};
export default TravelLogSideBar;
