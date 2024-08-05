import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { parseGPX } from "@we-gold/gpxjs";
import { LatLngExpression } from "leaflet";

export default function GPSMain() {
  const currentFrame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const [tracks, setTracks] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(staticFile("file.gpx"));
      const data = await response.text();

      const [parsedFile, error] = parseGPX(data);

      if (error) throw error;

      setTracks(
        parsedFile.tracks[0].points.map((p) => [p.latitude, p.longitude])
      );
    })();
  }, []);

  const currentPath = tracks.slice(
    0,
    (currentFrame / fps) * ((fps / durationInFrames) * tracks.length)
  );

  if (!tracks.length) {
    return <p>loading..</p>;
  }

  return (
    <AbsoluteFill className="bg-white">
      <MapContainer
        center={currentPath[0]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "1980px", height: "1080px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          pathOptions={{ fillColor: "red", color: "blue" }}
          positions={currentPath}
        />
      </MapContainer>
    </AbsoluteFill>
  );
}
