"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { Location } from "../data/locations";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 20, mass: 0.75 },
  },
};

interface LocationCardProps {
  location: Location;
  index: number;
  selected: boolean;
  priority: boolean;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void;
}

export function LocationCard({
  location,
  index,
  selected,
  priority,
  onSelect,
  onKeyDown,
}: LocationCardProps) {
  return (
    <motion.button
      type="button"
      role="option"
      aria-selected={selected}
      aria-label={`Select ${location.name} as your pickup location`}
      data-location-index={index}
      className={`location-card ${selected ? "is-selected" : ""}`}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 360, damping: 26 }}
      onClick={onSelect}
      onKeyDown={(event) => onKeyDown(event, index)}
    >
      <span className="location-card-image">
        <Image
          src={location.image}
          alt={`${location.name} pickup agency in Algiers`}
          fill
          unoptimized
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 42vw, (max-width: 1100px) 21vw, 150px"
        />
        <span className="location-image-scrim" aria-hidden="true" />
        <AnimatePresence>
          {selected && (
            <motion.span
              className="location-check"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.45, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <Check strokeWidth={2.7} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <span className="location-card-name">{location.name}</span>
      <span className="location-card-meta">Algiers agency</span>
    </motion.button>
  );
}
