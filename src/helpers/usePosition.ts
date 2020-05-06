import { useState, useEffect } from "react";

interface UsePostion {
  latitude: number;
  longitude: number;
  error: string;
}

const DEFAULT_POSITION = {
  latitude: 0,
  longitude: 0,
};

export const usePosition = (): UsePostion => {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [error, setError] = useState("");

  const onChange = ({ coords }: Position) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;

    if (!geo) {
      setError("Geolocation is not supported");
      return;
    }

    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, error };
};
