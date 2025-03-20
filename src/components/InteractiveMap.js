"use client";

import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import locations from "@/data/locations.json";
import Modal from "react-modal";

// Set Mapbox API key (Replace with your own)
const MAPBOX_TOKEN = "YOUR_MAPBOX_ACCESS_TOKEN";

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="relative w-full h-[500px]">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: 10, // Adjust based on your locations
          latitude: 30,
          zoom: 1.5, // Zoom out to see the world map
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        className="rounded-lg"
      >
        {/* Render Markers for Locations */}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            longitude={loc.coordinates[0]}
            latitude={loc.coordinates[1]}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedLocation(loc);
            }}
          >
            {/* Custom Marker */}
            <div className="cursor-pointer">
              <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-sm shadow-md">
                {loc.city}
              </span>
            </div>
          </Marker>
        ))}

        {/* Pop-up with Details on Click */}
        {selectedLocation && (
          <Popup
            longitude={selectedLocation.coordinates[0]}
            latitude={selectedLocation.coordinates[1]}
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
          >
            <div className="p-2">
              <h2 className="text-lg font-bold">{selectedLocation.city}</h2>
              <p className="text-sm">{selectedLocation.reflection}</p>
              <p className="text-xs">
                <strong>Key Takeaway:</strong> {selectedLocation.takeaway}
              </p>
            </div>
          </Popup>
        )}
      </Map>

      {/* Modal for Detailed View */}
      {selectedLocation && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedLocation(null)}
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          className="bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3"
        >
          <h2 className="text-xl font-bold mb-2">{selectedLocation.city}</h2>
          <p className="mb-4">{selectedLocation.reflection}</p>
          {selectedLocation.media && (
            <img
              src={selectedLocation.media}
              alt={selectedLocation.city}
              className="w-full h-48 object-cover rounded"
            />
          )}
          <p className="mb-2">
            <strong>Data Points:</strong> {selectedLocation.dataPoints}
          </p>
          <button
            onClick={() => setSelectedLocation(null)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}
