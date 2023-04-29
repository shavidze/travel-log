import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const InitMap = (
  logs: TravelLogWithId[],
  onMapClick: (event: L.LeafletMouseEvent) => void
) => {
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

export default InitMap;
