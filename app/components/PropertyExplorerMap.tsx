"use client";

import { Building2, Compass, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";

interface ExplorerMapProperty {
  id: number;
  title: string;
  area: string;
  price: string;
  coordinates: [number, number];
}

type MapStatus = "loading" | "ready" | "error";

function shortPrice(price: string) {
  if (price === "Price on request") return "Enquire";
  return price.replace("DZD ", "");
}

function createPriceIcon(
  leaflet: typeof import("leaflet"),
  property: ExplorerMapProperty,
  active: boolean,
) {
  return leaflet.divIcon({
    className: `explorer-price-marker${active ? " is-active" : ""}`,
    html: `<span>${shortPrice(property.price)}</span>`,
    iconSize: [104, 38],
    iconAnchor: [52, 19],
    tooltipAnchor: [0, -22],
  });
}

export function PropertyExplorerMap({ properties }: { properties: ExplorerMapProperty[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LeafletMarker[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(properties[0]?.id ?? null);
  const [status, setStatus] = useState<MapStatus>("loading");
  const [retryCount, setRetryCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(properties.length);

  const selectedProperty =
    properties.find((property) => property.id === selectedId) ?? properties[0] ?? null;

  useEffect(() => {
    let disposed = false;
    let map: LeafletMap | null = null;
    let markers: LeafletMarker[] = [];
    const loadingTimeout = window.setTimeout(() => {
      if (!disposed) setStatus("error");
    }, 6000);

    const initializeMap = async () => {
      try {
        setStatus("loading");
        const leaflet = await import("leaflet");
        if (disposed || !containerRef.current) return;

        map = leaflet.map(containerRef.current, {
          center: [36.7538, 3.0588],
          zoom: 11,
          zoomControl: false,
          scrollWheelZoom: true,
          zoomSnap: 0.25,
        });
        mapRef.current = map;

        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          })
          .addTo(map);
        leaflet.control.zoom({ position: "topright" }).addTo(map);

        const initialId = selectedProperty?.id ?? null;
        markers = properties.map((property) => {
          const marker = leaflet
            .marker(property.coordinates, {
              icon: createPriceIcon(leaflet, property, property.id === initialId),
              title: `${property.title}, ${property.price}`,
              riseOnHover: true,
            })
            .addTo(map as LeafletMap);

          marker.bindTooltip(`<b>${property.title}</b><small>${property.area}</small>`, {
            direction: "top",
            className: "explorer-map-tooltip",
            opacity: 1,
          });

          marker.on("click", () => {
            setSelectedId(property.id);
            markers.forEach((item, index) => {
              item.setIcon(createPriceIcon(leaflet, properties[index], properties[index].id === property.id));
            });
            map?.flyTo(property.coordinates, Math.max(map.getZoom(), 13), { duration: 0.75 });
          });
          return marker;
        });
        markersRef.current = markers;

        if (properties.length) {
          const bounds = leaflet.latLngBounds(properties.map((property) => property.coordinates));
          map.fitBounds(bounds, { padding: [65, 65], maxZoom: 12.25 });
        }

        const updateVisibleCount = () => {
          if (!map) return;
          const bounds = map.getBounds();
          setVisibleCount(
            properties.filter((property) => bounds.contains(property.coordinates)).length,
          );
        };
        map.on("moveend", updateVisibleCount);
        window.requestAnimationFrame(() => {
          map?.invalidateSize();
          updateVisibleCount();
        });

        window.clearTimeout(loadingTimeout);
        setStatus("ready");
      } catch (error) {
        console.error("Unable to initialize the property explorer map", error);
        window.clearTimeout(loadingTimeout);
        map?.remove();
        map = null;
        mapRef.current = null;
        markersRef.current = [];
        if (!disposed) setStatus("error");
      }
    };

    void initializeMap();

    return () => {
      disposed = true;
      window.clearTimeout(loadingTimeout);
      markersRef.current = [];
      mapRef.current = null;
      markers = [];
      map?.remove();
    };
  }, [properties, retryCount]);

  const resetView = async () => {
    const map = mapRef.current;
    if (!map || !properties.length) return;
    const leaflet = await import("leaflet");
    const bounds = leaflet.latLngBounds(properties.map((property) => property.coordinates));
    map.fitBounds(bounds, { padding: [65, 65], maxZoom: 12.25 });
  };

  return (
    <div className="property-map">
      <div
        ref={containerRef}
        className="property-map-canvas"
        role="region"
        aria-label="Interactive map of available properties"
      />

      {status === "loading" && (
        <div className="property-map-loading" role="status">
          <span />
          Loading property map…
        </div>
      )}

      {status === "error" && (
        <div className="property-map-error" role="alert">
          <b>Map connection is taking too long.</b>
          <span>The property results remain available while the map reconnects.</span>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Retry map
          </button>
        </div>
      )}

      {selectedProperty && status === "ready" && (
        <article className="property-map-selection" aria-live="polite">
          <span><MapPin /> {selectedProperty.area}</span>
          <b>{selectedProperty.title}</b>
          <small>{selectedProperty.price}</small>
        </article>
      )}

      {status === "ready" && (
        <button className="map-location" type="button" onClick={resetView}>
          <Compass />
          <span>
            <b>Show all properties</b>
            <small>{visibleCount} visible in this area</small>
          </span>
          <Building2 />
        </button>
      )}
    </div>
  );
}
