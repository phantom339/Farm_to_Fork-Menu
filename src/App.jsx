import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Leaf, ChevronLeft, ChevronRight } from 'lucide-react';
import { menuData, barData, categories, LEAF_IMG_URL, SECRET_TAP_COUNT, SECRET_TAP_WINDOW_MS, SECRET_KEYBOARD_CODE } from './data/menuData';
import MenuCard from './components/MenuCard';
import BarCard from './components/BarCard';
import BackgroundSlideshow from './components/BackgroundSlideshow';

/**
 * Farm to Fork — Main Menu Application
 */
export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const itemsPerPage = 4;
  const visibleCategories = isBarVisible ? [...categories, 'Bar'] : categories;

  // Reset to first page whenever the category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  // If Bar gets hidden while active, switch back to 'All'
  useEffect(() => {
    if (!isBarVisible && activeCategory === 'Bar') {
      setActiveCategory('All');
    }
  }, [isBarVisible, activeCategory]);

  // Handle body class for dark theme
  useEffect(() => {
    if (activeCategory === 'Bar') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [activeCategory]);

  // Keyboard shortcut listener
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e) => {
      // Ignore if typing in an input (not needed here but good practice)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 10) {
        keyBuffer = keyBuffer.slice(-10);
      }
      if (keyBuffer.includes(SECRET_KEYBOARD_CODE)) {
        setIsBarVisible((prev) => !prev);
        keyBuffer = '';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Footer tap listener
  useEffect(() => {
    if (tapCount > 0) {
      if (tapCount >= SECRET_TAP_COUNT) {
        setIsBarVisible((prev) => !prev);
        setTapCount(0);
      } else {
        const timer = setTimeout(() => {
          setTapCount(0);
        }, SECRET_TAP_WINDOW_MS);
        return () => clearTimeout(timer);
      }
    }
  }, [tapCount]);

  const handleFooterTap = () => {
    setTapCount((prev) => prev + 1);
  };

  const isBarActive = activeCategory === 'Bar';
  
  // Choose data source
  const currentData = isBarActive ? barData : menuData;

  // Filter items by active category
  const filteredData =
    activeCategory === 'All'
      ? currentData
      : isBarActive 
        ? currentData 
        : currentData.filter((item) => item.category === activeCategory);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Collect background images from the active category
  const bgImages = useMemo(() => {
    return filteredData.map((item) => item.imageUrl);
  }, [filteredData]);

  return (
    <div className={`app ${isBarActive ? 'app--dark-theme' : ''}`}>
      {/* Decorative Leaf Illustrations (hidden on Bar menu for a cleaner look) */}
      {!isBarActive && (
        <>
          <img
            src="/canva-element.svg"
            alt=""
            aria-hidden="true"
            className="corner-decor corner-decor--bottom-right"
          />
          <img
            src="/canva-element.svg"
            alt=""
            aria-hidden="true"
            className="corner-decor corner-decor--top-left"
          />
        </>
      )}

      <div className="app__container">
        {/* ──── Header ──── */}
        <header className="header" id="header" style={{ position: 'relative' }}>
          <div className="header__logo-row">
            {isBarActive ? (
              <>
                <h1 className="header__title">Midnight <span className="header__title-accent">Mansion</span></h1>
                <p className="header__tagline">Rooftop Bar</p>
              </>
            ) : (
              <>
                <h1 className="header__title">Farm <span className="header__title-accent">to</span> Fork</h1>
                <p className="header__tagline">Restaurant</p>
              </>
            )}
          </div>
          <div className="header__divider" aria-hidden="true" />
          <p className="header__subtitle">{isBarActive ? 'Speakeasy & Bar' : 'Menu'}</p>
        </header>

        {/* ──── Navigation: Categories + Pagination ──── */}
        <nav className="nav" id="menu-nav" aria-label="Menu navigation">
          {/* Category Tabs */}
          <ul className="nav__categories" role="tablist" aria-label="Menu categories">
            {visibleCategories.map((cat) => (
              <li key={cat} role="presentation">
                <button
                  role="tab"
                  id={`tab-${cat.toLowerCase()}`}
                  aria-selected={activeCategory === cat}
                  className={`nav__tab ${
                    activeCategory === cat
                      ? 'nav__tab--active'
                      : 'nav__tab--inactive'
                  }`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="nav__pagination" aria-label="Page navigation">
            <button
              className="nav__page-btn"
              disabled={currentPage === 1}
              onClick={handlePrev}
              aria-label="Previous page"
              id="btn-prev-page"
            >
              <ChevronLeft />
            </button>
            <span className="nav__page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="nav__page-btn"
              disabled={currentPage === totalPages}
              onClick={handleNext}
              aria-label="Next page"
              id="btn-next-page"
            >
              <ChevronRight />
            </button>
          </div>
        </nav>

        {/* ──── Menu Grid ──── */}
        <main id="menu-grid" className="menu-main">
          {/* Background Slideshow */}
          <BackgroundSlideshow images={bgImages} />
          {currentItems.length > 0 ? (
            <div className="menu-grid menu-grid--step" role="tabpanel" aria-labelledby={`tab-${activeCategory.toLowerCase()}`}>
              {currentItems.map((item, index) => (
                isBarActive ? (
                  <BarCard key={item.id} item={item} index={index} />
                ) : (
                  <MenuCard key={item.id} item={item} index={index} />
                )
              ))}
            </div>
          ) : (
            <div className="menu-grid menu-grid--empty">
              <p className="menu-grid__empty-text">
                No items found for this category.
              </p>
            </div>
          )}
        </main>

        {/* ──── Footer ──── */}
        <footer className="footer" id="footer">
          <Leaf className="footer__leaf" />
          <h2 className="footer__message">{isBarActive ? 'Enjoy your evening' : 'Thank you for dining with us'}</h2>
          <p className="footer__copyright" onClick={handleFooterTap} style={{ cursor: 'pointer' }}>
            © 2026 Farm to Fork • From Our Farm to Your Table
          </p>
        </footer>
      </div>
    </div>
  );
}
