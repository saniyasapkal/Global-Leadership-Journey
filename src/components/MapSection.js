"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

export default function MapSection({ countryInsights }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 mb-16 flex flex-col md:flex-row gap-6">
      <MapContainer
        center={[20, 0]}
        zoom={1.5}
        className="flex-1 h-[400px] md:h-[500px] rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {countryInsights.map((c) => (
          <Marker
            key={c.id}
            position={c.coordinates}
            eventHandlers={{ click: () => setSelected(c) }}
          />
        ))}
      </MapContainer>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="md:w-1/3 bg-white rounded-xl shadow-lg p-6 relative"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selected.name} Leadership
            </h3>
            <div className="space-y-3 text-gray-700">
              {[
                ["Overview", selected.overview],
                ["Position", selected.position],
                ["Style", selected.leadershipStyle],
                ["Decision-Making", selected.decisionMaking],
                ["Communication", selected.communication],
                ["Risk", selected.risk],
                ["Takeaway", selected.takeaway],
              ].map(([label, value]) => (
                <p key={label}>
                  <strong className="text-gray-900">{label}:</strong> {value}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
