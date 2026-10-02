import React from 'react';

/**
 * BarCard — Dark-themed cocktail card for the Bar section.
 * Features a circular image, signature badge, spirit tag, and gold accent pricing.
 * Displayed in a step/zigzag layout.
 */
export default function BarCard({ item, index = 0 }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`card bar-card ${isEven ? 'card--even' : 'card--odd'}`}
      id={`bar-item-${item.id}`}
    >
      {/* Signature Badge */}
      {item.signature && (
        <div className="card__badge bar-card__badge" aria-label="Signature Cocktail">
          ★ Signature
        </div>
      )}

      {/* Circular Cocktail Image with lift shadow */}
      <div className="card__image-wrap bar-card__image-wrap">
        <img
          className="card__image bar-card__image"
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          width="400"
          height="400"
        />
      </div>

      {/* Card Content */}
      <div className="card__content bar-card__content">
        <span className="card__category bar-card__spirit">{item.spirit}</span>
        <h3 className="card__name bar-card__name">{item.name}</h3>
        <p className="card__description bar-card__description">{item.description}</p>
        <div className="card__price-section bar-card__price-section">
          <span className="card__price bar-card__price">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
