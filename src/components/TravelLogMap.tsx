/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { FC, useCallback, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import MarkerContext from '@/context/Marker/MarkerContext';
import { MarkerActionType } from '@/context/Marker/interfaces';
import InitMap from '@/hooks/useInitMap';
// @ts-ignore
const createIcon = (fill = '#56BC58', iconSize = 32) => {
  return L.divIcon({
    className: 'bg-transparent',
    html: `<svg viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="${fill}" stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="shadow-xl"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
  });
};

L.Marker.prototype.options.icon = createIcon();

const currentMarkerIcon = createIcon('#F2BB05', 40);

type Props = {
  logs: TravelLogWithId[];
};

const TravelLogMap: FC<Props> = ({ logs }) => {
  const position = [51.505, -0.09];
  if (!process.env.NEXT_PUBLIC_MAP_TILE_URL) {
    throw new Error('Missing MAP ACCESS TOKEN');
  }

  const { markerState, updateMarkerState } = useContext(MarkerContext);
  console.log('logs - ', logs);
  const MapClick = useCallback(
    (e: L.LeafletMouseEvent) => {
      updateMarkerState({
        type: MarkerActionType.SET_CURRENT_MARKER_LOCATION,
        data: e.latlng.wrap(),
      });
      updateMarkerState({
        type: MarkerActionType.SET_SIDEBAR_VISIBLE,
        data: true,
      });
      // update zoom level
      // if (markerState.map) {
      //   const zoomLevel = markerState.map.getZoom();
      //   markerState.map.flyTo(e.latlng.wrap(), zoomLevel > 5 ? zoomLevel : 5);
      // }
    },
    [markerState, updateMarkerState]
  );

  return (
    <MapContainer
      worldCopyJump={true}
      className="w-full h-full"
      style={{ background: '#242525' }}
      // zoom={3}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.NEXT_PUBLIC_MAP_TILE_URL}
      />
      <InitMap logs={logs} onMapClick={MapClick} dispatch={updateMarkerState} />
      <>
        {markerState.currentMarkerLocation && (
          <Marker
            icon={currentMarkerIcon}
            eventHandlers={{
              dragend(e) {
                updateMarkerState({
                  type: MarkerActionType.SET_CURRENT_MARKER_LOCATION,
                  data: e.target.getLatLng().wrap(),
                });
              },
            }}
            draggable
            position={markerState.currentMarkerLocation}
          ></Marker>
        )}
        {logs.map((log) => (
          <div key={log._id.toString()}>
            <Marker position={[log.latitude, log.longitude]}>
              <Popup offset={[0, -10]}>
                <p className="text-lg font-bold">{log.title}</p>
                <div className="flex justify-center items-center">
                  <img alt={log.title} src={log.image} className="w-[97]" />
                </div>
                <p>{log.description}</p>
                <p className="text-sm italic">
                  {new Date(log.visitDate.toString()).toLocaleDateString()}
                </p>
              </Popup>
            </Marker>
          </div>
        ))}
      </>
    </MapContainer>
  );
};

export default TravelLogMap;
