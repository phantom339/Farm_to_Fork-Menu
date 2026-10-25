import React, { useState, useEffect, useCallback, useMemo } from 'react';
import BackgroundSlideshow from './BackgroundSlideshow';

/**
 * Default seed events so the page is never empty on first load.
 */
const DEFAULT_EVENTS = [
  {
    id: Date.now() - 200000,
    name: 'Farm-to-Table Harvest Dinner',
    description:
      'Join us for a magical evening celebrating the autumn harvest. A five-course meal crafted entirely from locally sourced ingredients, paired with handpicked wines from boutique vineyards. Live acoustic music under the stars.',
    imageUrl:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    createdAt: Date.now() - 200000,
  },
  {
    id: Date.now() - 100000,
    name: 'Sunday Brunch & Jazz',
    description:
      'Kick off your weekend right with our signature brunch buffet featuring artisan pastries, farm-fresh eggs, smoked salmon, and bottomless mimosas — all accompanied by a live jazz quartet on the terrace.',
    imageUrl:
      'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    createdAt: Date.now() - 100000,
  },
  {
    id: Date.now(),
    name: 'Wine & Cheese Pairing Night',
    description:
      'Explore the world of fine wines paired with artisanal cheeses curated by our sommelier. An intimate evening of discovery, tasting notes, and stories behind each pairing. Limited to 30 guests.',
    imageUrl:
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop',
    createdAt: Date.now(),
  },
];

const STORAGE_KEY = 'ftf_events';

function loadEvents() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fall through
  }
  return DEFAULT_EVENTS;
}

function saveEvents(events) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/**
 * EventsPage — Displays upcoming events in an arch-card layout
 * inspired by the reference design.
 */
export default function EventsPage() {
  const [events, setEvents] = useState(loadEvents);
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminTapCount, setAdminTapCount] = useState(0);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Persist events to localStorage
  useEffect(() => {
    saveEvents(events);
  }, [events]);

  // Secret admin tap: triple-tap the heading
  useEffect(() => {
    if (adminTapCount >= 3) {
      setShowAdmin((prev) => !prev);
      setAdminTapCount(0);
    } else if (adminTapCount > 0) {
      const timer = setTimeout(() => setAdminTapCount(0), 1200);
      return () => clearTimeout(timer);
    }
  }, [adminTapCount]);

  // Secret keyboard shortcut: type "admin"
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) keyBuffer = keyBuffer.slice(-10);
      if (keyBuffer.includes('admin')) {
        setShowAdmin((prev) => !prev);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Split events: newest 3 are "upcoming", rest are "past"
  const sorted = [...events].sort((a, b) => b.createdAt - a.createdAt);
  const upcomingEvents = sorted.slice(0, 3);
  const pastEvents = sorted.slice(3);

  const handleAddEvent = useCallback(
    (e) => {
      e.preventDefault();
      if (!formName.trim() || !formDesc.trim()) return;

      const newEvent = {
        id: Date.now(),
        name: formName.trim(),
        description: formDesc.trim(),
        imageUrl:
          formImageUrl.trim() ||
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
        createdAt: Date.now(),
      };

      setEvents((prev) => [...prev, newEvent]);
      setFormName('');
      setFormDesc('');
      setFormImageUrl('');
    },
    [formName, formDesc, formImageUrl]
  );

  const handleDeleteEvent = useCallback((id) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  }, []);

  const bgImages = useMemo(() => {
    return upcomingEvents.map((event) => event.imageUrl);
  }, [upcomingEvents]);

  return (
    <section className="events-page" id="events-page">
      <BackgroundSlideshow images={bgImages} isPanning={true} />
      
      <div className="events-page__content">
        <h2
          className="events-page__heading"
          onClick={() => setAdminTapCount((c) => c + 1)}
          style={{ cursor: 'default' }}
        >
          Upcoming <span className="events-page__heading-accent">Events</span>
        </h2>
        <p className="events-page__subheading">
          Exclusive dining experiences & celebrations
        </p>

      {/* ──── Admin Panel (hidden by default) ──── */}
      {showAdmin && (
        <div className="events-admin" id="events-admin">
          <div className="events-admin__header">
            <h3 className="events-admin__title">🔒 Event Manager</h3>
            <button
              className="events-admin__close"
              onClick={() => setShowAdmin(false)}
              aria-label="Close admin panel"
            >
              ✕
            </button>
          </div>
          <form className="events-admin__form" onSubmit={handleAddEvent}>
            <input
              className="events-admin__input"
              type="text"
              placeholder="Event Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              id="admin-event-name"
            />
            <textarea
              className="events-admin__textarea"
              placeholder="Event Description"
              value={formDesc}
              onChange={(e) => setFormDesc(e.target.value)}
              rows={3}
              required
              id="admin-event-desc"
            />
            <input
              className="events-admin__input"
              type="url"
              placeholder="Image URL (optional — paste any image link)"
              value={formImageUrl}
              onChange={(e) => setFormImageUrl(e.target.value)}
              id="admin-event-image"
            />
            <button className="events-admin__submit" type="submit" id="admin-event-submit">
              Add Event
            </button>
          </form>
        </div>
      )}

      {/* ──── Upcoming Events (max 3) ──── */}
      <div className="events-list">
        {upcomingEvents.map((event, index) => (
          <article
            className={`event-card ${index % 2 !== 0 ? 'event-card--reversed' : ''}`}
            key={event.id}
            id={`event-${event.id}`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Arch-framed Image */}
            <div className="event-card__image-frame">
              <div className="event-card__arch">
                <img
                  className="event-card__image"
                  src={event.imageUrl}
                  alt={event.name}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Description Card */}
            <div className="event-card__content">
              <h3 className="event-card__name">{event.name}</h3>
              <div className="event-card__divider" aria-hidden="true" />
              <p className="event-card__description">{event.description}</p>
              {showAdmin && (
                <button
                  className="event-card__delete"
                  onClick={() => handleDeleteEvent(event.id)}
                  aria-label={`Delete ${event.name}`}
                >
                  Remove Event
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* ──── Past Events ──── */}
      {pastEvents.length > 0 && (
        <div className="events-past">
          <h3 className="events-past__heading">Past Events</h3>
          <div className="events-past__list">
            {pastEvents.map((event) => (
              <div className="events-past__item" key={event.id} id={`past-event-${event.id}`}>
                <img
                  className="events-past__image"
                  src={event.imageUrl}
                  alt={event.name}
                  loading="lazy"
                />
                <div className="events-past__info">
                  <h4 className="events-past__name">{event.name}</h4>
                  <p className="events-past__desc">{event.description}</p>
                  {showAdmin && (
                    <button
                      className="events-past__delete"
                      onClick={() => handleDeleteEvent(event.id)}
                      aria-label={`Delete ${event.name}`}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
