import React, { useState, useEffect, useRef } from 'react';

/**
 * BackgroundSlideshow — Renders a subtle, cross-fading background
 * of food images from the currently active category.
 * Images cycle every 5 seconds with a smooth opacity transition.
 */
export default function BackgroundSlideshow({ images = [], isPanning = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef(null);

  // Preload all background images so transitions never stall or wait on network
  useEffect(() => {
    images.forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, [images]);

  // Reset index when images list changes
  useEffect(() => {
    setActiveIndex(0);
    setPrevIndex(null);
    setIsFading(false);
  }, [images]);

  // Auto-cycle through images
  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setPrevIndex((prev) => activeIndex);
      setIsFading(true);

      // Small delay to let the fade start, then swap
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        // Let the new image settle, then clear the prev
        setTimeout(() => {
          setIsFading(false);
          setPrevIndex(null);
        }, 1800);
      }, 50);
    }, 8500);

    return () => clearInterval(timerRef.current);
  }, [images, activeIndex]);

  if (images.length === 0) return null;

  const getSlideClasses = (isActive) => {
    const classes = ['bg-slideshow__slide'];
    if (isActive) {
      classes.push('bg-slideshow__slide--active');
      if (isPanning) classes.push('bg-slideshow__slide--panning');
    } else if (isFading) {
      classes.push('bg-slideshow__slide--fading-out');
    }
    return classes.join(' ');
  };

  return (
    <div className="bg-slideshow" aria-hidden="true">
      {/* Previous image (fading out) */}
      {prevIndex !== null && (
        <div
          className={getSlideClasses(false)}
          style={{ backgroundImage: `url("${encodeURI(images[prevIndex])}")` }}
        />
      )}

      {/* Current active image (fading in) */}
      <div
        className={getSlideClasses(true)}
        key={activeIndex}
        style={{ backgroundImage: `url("${encodeURI(images[activeIndex])}")` }}
      />
    </div>
  );
}
