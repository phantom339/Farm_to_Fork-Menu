import React, { useState, useEffect, useRef } from 'react';

/**
 * BackgroundSlideshow — Renders a subtle, cross-fading background
 * of food images from the currently active category.
 * Images cycle every 5 seconds with a smooth opacity transition.
 */
export default function BackgroundSlideshow({ images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef(null);

  // Reset index when images change (category switch)
  useEffect(() => {
    setActiveIndex(0);
    setPrevIndex(null);
    setIsFading(false);
  }, [images]);

  // Auto-cycle through images
  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setPrevIndex((prev) => {
        // prev is the current activeIndex before we advance
        return activeIndex;
      });
      setIsFading(true);

      // Small delay to let the fade start, then swap
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        // Let the new image settle, then clear the prev
        setTimeout(() => {
          setIsFading(false);
          setPrevIndex(null);
        }, 1200);
      }, 50);
    }, 5000);

    return () => clearInterval(timerRef.current);
  }, [images, activeIndex]);

  if (images.length === 0) return null;

  return (
    <div className="bg-slideshow" aria-hidden="true">
      {/* Previous image (fading out) */}
      {prevIndex !== null && (
        <div
          className={`bg-slideshow__slide ${isFading ? 'bg-slideshow__slide--fading-out' : ''}`}
          style={{ backgroundImage: `url(${images[prevIndex]})` }}
        />
      )}

      {/* Current active image (fading in) */}
      <div
        className="bg-slideshow__slide bg-slideshow__slide--active"
        key={activeIndex}
        style={{ backgroundImage: `url(${images[activeIndex]})` }}
      />
    </div>
  );
}
