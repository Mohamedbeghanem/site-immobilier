"use client";

import { Activity, Building2, MapPin } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

interface MarketArea {
  name: string;
  coordinates: [number, number];
  movement: string;
  transactions: number;
  summary: string;
}

type MapStatus = "loading" | "ready" | "error";

const marketAreas: MarketArea[] = [
  {
    name: "Hydra",
    coordinates: [36.7451, 3.0403],
    movement: "+8.4%",
    transactions: 128,
    summary: "Sustained demand for detached homes and premium apartments.",
  },
  {
    name: "El Biar",
    coordinates: [36.7694, 3.0282],
    movement: "+6.9%",
    transactions: 96,
    summary: "Stable resale activity with strong family-led demand.",
  },
  {
    name: "Bab Ezzouar",
    coordinates: [36.7176, 3.1862],
    movement: "+11.2%",
    transactions: 74,
    summary: "The city’s strongest current office and rental momentum.",
  },
];

function createMarkerIcon(leaflet: typeof import("leaflet"), active: boolean) {
  return leaflet.divIcon({
    className: `market-leaflet-marker${active ? " is-active" : ""}`,
    html: "<span></span>",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    tooltipAnchor: [0, -20],
  });
}

export function MarketIntelligenceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [status, setStatus] = useState<MapStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);

  const activateArea = useCallback((index: number) => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;
    const area = marketAreas[index];
    if (!leaflet || !map || !area) return;

    setSelectedIndex(index);
    markersRef.current.forEach((marker, markerIndex) => {
      marker.setIcon(createMarkerIcon(leaflet, markerIndex === index));
    });
    map.flyTo(area.coordinates, 13.5, { duration: 0.85 });
  }, []);

  useEffect(() => {
    let disposed = false;
    let map: LeafletMap | null = null;
    const loadingTimeout = window.setTimeout(() => {
      if (!disposed) setStatus("error");
    }, 6000);

    const initializeMap = async () => {
      try {
        setStatus("loading");
        const leaflet = await import("leaflet");
        if (disposed || !containerRef.current) return;

        leafletRef.current = leaflet;
        map = leaflet.map(containerRef.current, {
          center: [36.7538, 3.0588],
          zoom: 12,
          zoomControl: false,
          scrollWheelZoom: true,
          zoomSnap: 0.25,
        });
        mapRef.current = map;

        window.clearTimeout(loadingTimeout);
        setStatus("ready");

        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          })
          .addTo(map);

        leaflet.control.zoom({ position: "topright" }).addTo(map);

        markersRef.current = marketAreas.map((area, index) => {
          const marker = leaflet
            .marker(area.coordinates, {
              icon: createMarkerIcon(leaflet, index === 0),
              title: `${area.name}: ${area.movement} annual price movement`,
              riseOnHover: true,
            })
            .addTo(map as LeafletMap);

          marker.bindTooltip(area.name, {
            direction: "top",
            className: "market-map-tooltip",
            opacity: 1,
          });
          marker.on("click", () => activateArea(index));
          return marker;
        });

        const bounds = leaflet.latLngBounds(marketAreas.map((area) => area.coordinates));
        map.fitBounds(bounds, { padding: [62, 62], maxZoom: 12.25 });
        window.requestAnimationFrame(() => map?.invalidateSize());
      } catch (error) {
        console.error("Unable to initialize the market map", error);
        window.clearTimeout(loadingTimeout);
        map?.remove();
        map = null;
        mapRef.current = null;
        leafletRef.current = null;
        if (!disposed) setStatus("error");
      }
    };

    void initializeMap();

    return () => {
      disposed = true;
      window.clearTimeout(loadingTimeout);
      markersRef.current = [];
      leafletRef.current = null;
      mapRef.current = null;
      map?.remove();
    };
  }, [activateArea, retryCount]);

  const selectedArea = marketAreas[selectedIndex];

  return (
    <div className="market-map-shell">
      <div
        ref={containerRef}
        className="market-map-canvas"
        role="region"
        aria-label="Interactive property market map of Algiers"
      />

      {status === "loading" && (
        <div className="market-map-loading" role="status">
          <span />
          Loading live map…
        </div>
      )}

      {status === "error" && (
        <div className="market-map-error" role="alert">
          <b>Map connection is taking too long.</b>
          <span>The market data is still available while the map reconnects.</span>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Retry map
          </button>
        </div>
      )}

      <div className="market-map-live">
        <Activity />
        Live neighbourhood data
      </div>

      <article className="market-map-insight" aria-live="polite">
        <div>
          <span><MapPin /> {selectedArea.name} · Q2 2026</span>
          <b>{selectedArea.movement}</b>
          <small>annual price movement</small>
        </div>
        <p>{selectedArea.summary}</p>
        <footer><Building2 /> {selectedArea.transactions} verified transactions</footer>
      </article>

      <div className="market-map-switcher" role="group" aria-label="Choose a market area">
        {marketAreas.map((area, index) => (
          <button
            type="button"
            className={selectedIndex === index ? "active" : ""}
            onClick={() => activateArea(index)}
            aria-pressed={selectedIndex === index}
            key={area.name}
          >
            {area.name}
          </button>
        ))}
      </div>
    </div>
  );
}
