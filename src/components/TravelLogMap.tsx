'use client';

import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { FC, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
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

const InitMap: FC<Props> = ({ logs }) => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const bounds = new L.LatLngBounds(
      logs.map((log) => [log.latitude, log.longitude])
    );
    map.fitBounds(bounds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
};
const TravelLogMap: FC<Props> = ({ logs }) => {
  const position = [51.505, -0.09];

  return (
    <MapContainer className="w-full h-full" center={position} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <InitMap logs={logs} />
      <>
        {logs.map((log) => (
          <div key={log._id.toString()}>
            <Marker position={[log.latitude, log.longitude]}>
              <Popup offset={[0, -41]}>
                <p className="text-lg font-bold">{log.title}</p>
                <div className="flex justify-center items-center">
                  <img alt={log.title} src={log.image} className="w-97" />
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
