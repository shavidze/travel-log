'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { FC, useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// @ts-ignore
const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [25 / 2, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
  logs: TravelLogWithId[];
};

type InitMapProps = {
  logs: TravelLogWithId[];
  onMapClick: (event: L.LeafletEvent) => void;
};

const InitMap: FC<InitMapProps> = ({ logs, onMapClick }) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize(); // Checks if the map container size changed and updates the map if so — call it after you've changed the map size dynamically, also animating pan by default
    const bounds = new L.LatLngBounds(
      logs.map((log) => [log.latitude, log.longitude])
    );
    map.fitBounds(bounds); // დავინახოთ ეს ჩვენი დაპინულები ცენტრში
    map.on('click', onMapClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return null;
};
const TravelLogMap: FC<Props> = ({ logs }) => {
  const position = [51.505, -0.09];
  if (!process.env.NEXT_PUBLIC_MAP_TILE_URL) {
    throw new Error('Missing MAP ACCESS TOKEN');
  }
  const [travelLogLocation, setTravelLogLocation] = useState<L.LatLng | null>(
    null
  );

  return (
    <MapContainer className="w-full h-full" center={position} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={process.env.NEXT_PUBLIC_MAP_TILE_URL}
      />
      <InitMap logs={logs} onMapClick={(e) => setTravelLogLocation(e.target)} />
      <>
        {logs.map((log) => (
          <div key={log._id.toString()}>
            <Marker position={[log.latitude, log.longitude]}>
              <Popup offset={[0, -41]}>
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
