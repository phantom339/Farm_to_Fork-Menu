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
      {/* Image and Badge Container */}
      <div className="card__image-container">
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

        {/* Best Seller Badge positioned on frame */}
        {item.bestSeller && (
          <div className="card__badge" aria-label="Best Seller">
            Best Seller
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="card__content">
        <div className="card__header-row">
          <span className="card__category">{item.category}</span>
          {item.vegNonVeg && (
            <span
              className={`card__diet-tag ${
                item.isVeg ? 'card__diet-tag--veg' : 'card__diet-tag--non-veg'
              }`}
              title={item.vegNonVeg}
            >
              <span className="diet-icon">
                <span className="diet-dot" />
              </span>
              <span className="diet-text">{item.vegNonVeg}</span>
            </span>
          )}
        </div>
        <h3 className="card__name">{item.name}</h3>
        <p className="card__description">{item.description}</p>
        {item.price !== undefined && item.price !== null && (
          <div className="card__price-section">
            <span className="card__price">
              {typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : item.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
