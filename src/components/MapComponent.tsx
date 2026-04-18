"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Link from "next/link";
import { User, Star } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const defaultCenter = {
  lat: 40.3794,
  lng: 49.8671 // Baku coordinates
};

// Antigravity Dark Map Theme
const darkMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

export interface MapTutor {
  id: string;
  name: string;
  subject: string;
  pricePerHour: number;
  rating: number;
  lat: number | null;
  lng: number | null;
}

export default function MapComponent({ tutors }: { tutors: MapTutor[] }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
  });

  const [map, setMap] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState<MapTutor | null>(null);

  const onLoad = useCallback(function callback(mapInstance: any) {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Antigravity Auto-Fit Bounds
  useEffect(() => {
    if (map && tutors && tutors.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      let hasValidPoints = false;
      tutors.forEach(t => {
        if (t.lat && t.lng) {
          bounds.extend({ lat: t.lat, lng: t.lng });
          hasValidPoints = true;
        }
      });
      if (hasValidPoints) {
        map.fitBounds(bounds);
        // Prevent too much zoom if there's only one point
        if (tutors.length === 1) {
          const listener = window.google.maps.event.addListener(map, "idle", () => {
            map.setZoom(12);
            window.google.maps.event.removeListener(listener);
          });
        }
      }
    }
  }, [map, tutors]);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0f16] flex-col gap-4">
        <div className="text-red-400 font-bold text-xl">Xəritə yüklənə bilmədi</div>
        <p className="text-gray-400 max-w-sm text-center">Google Maps API açarı əksikdir və ya şəbəkə xətası baş verdi.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-[#0a0f16] animate-shimmer flex items-center justify-center">
        <div className="px-6 py-3 rounded-full bg-black/40 text-brand-green-500 font-medium border border-white/10 backdrop-blur-xl">
          Kosmos taranır... (Antigravity Space)
        </div>
      </div>
    );
  }

  return (
    // @ts-ignore
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: darkMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      }}
    >
      {tutors.map((tutor) => {
        if (!tutor.lat || !tutor.lng) return null;
        return (
          // @ts-ignore
          <Marker
            key={tutor.id}
            position={{ lat: tutor.lat, lng: tutor.lng }}
            onClick={() => setSelectedTutor(tutor)}
            icon={{
              path: typeof window !== 'undefined' ? window.google.maps.SymbolPath.CIRCLE : 0,
              fillColor: '#00df89',
              fillOpacity: 1,
              strokeColor: '#00b36c',
              strokeWeight: 2,
              scale: 10,
            }}
          />
        );
      })}

      {selectedTutor && selectedTutor.lat && selectedTutor.lng && (
        // @ts-ignore
        <InfoWindow
          position={{ lat: selectedTutor.lat, lng: selectedTutor.lng }}
          onCloseClick={() => setSelectedTutor(null)}
          options={{
            pixelOffset: new window.google.maps.Size(0, -15),
          }}
        >
          <div className="p-3 bg-[#0a0f16] text-white rounded-xl min-w-[200px] border border-white/10 shadow-[0_5px_20px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-[#11151c] rounded-full p-2 border border-white/10">
                <User size={24} className="text-brand-green-500" />
              </div>
              <div>
                <h3 className="font-bold text-base">{selectedTutor.name}</h3>
                <p className="text-brand-blue-500 text-xs font-medium">{selectedTutor.subject}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-1 items-center bg-black/50 px-2 py-1 rounded text-xs">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span>{selectedTutor.rating.toFixed(1)}</span>
              </div>
              <div className="font-bold text-sm text-brand-green-500">
                {selectedTutor.pricePerHour}₼ / aylıq
              </div>
            </div>

            <Link href={`/profile/${selectedTutor.id}`} className="block w-full text-center mt-4 bg-brand-blue-600 hover:bg-brand-blue-500 text-white font-medium py-1.5 rounded transition">
              Profilə bax
            </Link>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
