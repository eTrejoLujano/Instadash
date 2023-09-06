import { useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Marker = ({ map, children, position, onClick }) => {
  const markerRef = useRef();
  const rootRef = useRef();
  useEffect(() => {
    if (!rootRef.current) {
      const container = document.createElement("div");
      rootRef.current = createRoot(container);
      markerRef.current = new window.google.maps.marker.AdvancedMarkerView({
        position,
        content: container,
      });
    }
    return () => (markerRef.current.map = null);
  }, [position]);
  useEffect(() => {
    rootRef.current.render(children);
    markerRef.current.postition = position;
    markerRef.current.map = map;
    const listener = markerRef.current.addListener("gmp-click", onClick);
    return () => listener.remove();
  }, [map, position, children, onClick]);
};
export default Marker;
