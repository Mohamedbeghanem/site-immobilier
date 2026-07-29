"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import {
  type KeyboardEvent,
  type PointerEvent,
  type WheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { locations } from "../data/locations";
import { LocationCard } from "./LocationCard";

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

export function LocationCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 });
  const suppressClickRef = useRef(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanScrollBack(track.scrollLeft > 3);
    setCanScrollForward(track.scrollLeft < maxScroll - 3);
    setScrollProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialLocation = params.get("location");
    const frame = window.requestAnimationFrame(() => {
      if (initialLocation && locations.some((location) => location.slug === initialLocation)) {
        setSelectedSlug(initialLocation);
      }
      updateScrollState();
    });

    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [updateScrollState]);

  const selectLocation = (slug: string) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    setSelectedSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set("location", slug);
    window.history.replaceState({ ...window.history.state, location: slug }, "", url);
  };

  const focusLocation = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), locations.length - 1);
    const target = trackRef.current?.querySelector<HTMLButtonElement>(
      `[data-location-index="${nextIndex}"]`,
    );
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusLocation(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusLocation(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusLocation(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusLocation(locations.length - 1);
    }
  };

  const scrollByPage = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.76, behavior: "smooth" });
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const canMove = (delta > 0 && track.scrollLeft < maxScroll - 2) || (delta < 0 && track.scrollLeft > 2);
    if (!canMove) return;
    event.preventDefault();
    track.scrollLeft += delta;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    dragStartRef.current = { x: event.clientX, scrollLeft: track.scrollLeft };
    suppressClickRef.current = false;
    setDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging || event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    const distance = event.clientX - dragStartRef.current.x;
    if (Math.abs(distance) > 5) suppressClickRef.current = true;
    track.scrollLeft = dragStartRef.current.scrollLeft - distance;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDragging(false);
    const track = trackRef.current;
    if (track?.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    if (suppressClickRef.current) {
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const selectedName = locations.find((location) => location.slug === selectedSlug)?.name;

  return (
    <section className="location-section" aria-labelledby="pickup-location-title">
      <div className="location-shell">
        <motion.div
          className="location-header"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow"><i /> YOUR JOURNEY STARTS HERE</span>
            <h2 id="pickup-location-title">Choose Your <em>Pickup Location</em></h2>
            <p>Select one of our rental agencies across Algeria to find available vehicles near you.</p>
          </div>
          <div className="location-controls">
            <span className={`selected-location-pill ${selectedName ? "has-selection" : ""}`}>
              <MapPin />
              <span>
                <small>{selectedName ? "PICKUP SELECTED" : "PICKUP LOCATION"}</small>
                <b>{selectedName ?? "Choose an agency"}</b>
              </span>
            </span>
            <div>
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!canScrollBack}
                aria-label="View previous locations"
              >
                <ArrowLeft />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!canScrollForward}
                aria-label="View more locations"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={trackRef}
          role="listbox"
          aria-label="Pickup locations in Algeria"
          aria-orientation="horizontal"
          className={`location-track ${dragging ? "is-dragging" : ""}`}
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          onScroll={updateScrollState}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {locations.map((location, index) => (
            <LocationCard
              key={location.id}
              location={location}
              index={index}
              selected={selectedSlug === location.slug}
              priority={index < 4}
              onSelect={() => selectLocation(location.slug)}
              onKeyDown={handleCardKeyDown}
            />
          ))}
        </motion.div>

        <div className="location-footer" aria-hidden="true">
          <span>Drag, swipe or use arrow keys to explore</span>
          <div><i style={{ transform: `scaleX(${Math.max(0.08, scrollProgress)})` }} /></div>
          <span>{String(locations.length).padStart(2, "0")} agencies</span>
        </div>
        <p className="sr-only" aria-live="polite">
          {selectedName ? `${selectedName} selected as pickup location.` : ""}
        </p>
      </div>
    </section>
  );
}
