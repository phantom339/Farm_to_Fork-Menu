import React from 'react';

/**
 * MenuCard — Individual menu item card displayed in a step/zigzag layout.
 * Alternates image position (left/right) based on index.
 * Uses circular image frames with lifted shadow.
 */
export default function MenuCard({ item, index = 0 }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`card ${isEven ? 'card--even' : 'card--odd'}`}
      id={`menu-item-${item.id}`}
    >
      {/* Best Seller Badge */}
      {item.bestSeller && (
        <div className="card__badge" aria-label="Best Seller">
          Best Seller
        </div>
      )}

      {/* Circular Food Image with lift shadow */}
      <div className="card__image-wrap">
        <img
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          width="400"
          height="400"
        />
      </div>

      {/* Card Content */}
      <div className="card__content">
        <span className="card__category">{item.category}</span>
        <h3 className="card__name">{item.name}</h3>
        <p className="card__description">{item.description}</p>
        <div className="card__price-section">
          <span className="card__price">${item.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
