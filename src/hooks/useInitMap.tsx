import { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import { FC, useLayoutEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { MarkerActionType, MarkerDispatch } from '@/context/Marker/interfaces';

type Props = {
  logs: TravelLogWithId[];
  onMapClick: (event: L.LeafletMouseEvent) => void;
  dispatch: MarkerDispatch;
};
const useInitMap: FC<Props> = ({ logs, onMapClick, dispatch }) => {
  const map = useMap();
  useLayoutEffect(() => {
    setTimeout(() => {
      dispatch({
        type: MarkerActionType.SET_MAP,
        data: map,
      });
      map.invalidateSize(true); // Checks if the map container size changed and updates the map if so — call it after you've changed the map size dynamically, also animating pan by default
      if (logs.length) {
        const bounds = new L.LatLngBounds(
          logs.map((log) => [log.latitude, log.longitude])
        );
        map.fitBounds(bounds);
      } else {
        map.setZoom(3);
        map.setView([34.85480922648911, -41.89881501280613]);
      }
      map.on('click', onMapClick);
    }, 200);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, logs, dispatch]);

  return null;
};

export default useInitMap;
