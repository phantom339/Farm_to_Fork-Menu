import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Leaf, ChevronLeft, ChevronRight, CalendarDays, Search } from 'lucide-react';
import { menuData, barData, categories, backgroundImages, LEAF_IMG_URL, SECRET_TAP_COUNT, SECRET_TAP_WINDOW_MS, SECRET_KEYBOARD_CODE } from './data/menuData';
import MenuCard from './components/MenuCard';
import BarCard from './components/BarCard';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import EventsPage from './components/EventsPage';

/**
 * Farm to Fork — Main Menu Application
 */
export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showEvents, setShowEvents] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const categoryDropdownRef = useRef(null);

  // Track scroll position to morph header into top button box and shrink buttons
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Handle clicking outside category dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(e.target) &&
        !e.target.closest('#btn-categories')
      ) {
        setShowCategoryMenu(false);
      }
    };
    if (showCategoryMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showCategoryMenu]);

  const itemsPerPage = 5;
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

  // Background images: uses dedicated 10 optimized images for silky-smooth animation without network reloads
  const bgImages = useMemo(() => {
    if (isBarActive) {
      return barData.map((item) => item.imageUrl);
    }
    return backgroundImages;
  }, [isBarActive]);

  // Calculate item counts per category for the sidebar
  const categoryCounts = useMemo(() => {
    const counts = { All: currentData.length };
    currentData.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [currentData]);

  // Filtered categories for sidebar search
  const displayedCategories = useMemo(() => {
    if (!categorySearch.trim()) return visibleCategories;
    const query = categorySearch.toLowerCase();
    return visibleCategories.filter((c) => c.toLowerCase().includes(query));
  }, [visibleCategories, categorySearch]);

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
        <div className={`header-container ${isScrolled ? 'header-container--scrolled' : ''}`}>
          <header className={`header ${isScrolled ? 'header--scrolled' : ''}`} id="header">
            <div className="header__nav-row">
              {/* Category Button — only shown when NOT on events page */}
              {!showEvents && (
                <button
                  className={`header__category-btn ${showCategoryMenu ? 'header__category-btn--active' : ''}`}
                  id="btn-categories"
                  onClick={() => setShowCategoryMenu((prev) => !prev)}
                  aria-label="Filter Categories"
                  title={`Categories (Current: ${activeCategory})`}
                >
                  <Leaf size={16} className="header__category-icon" />
                  <span className="header__category-btn-text">
                    {activeCategory === 'All' ? 'Categories' : activeCategory}
                  </span>
                  {activeCategory !== 'All' && <span className="header__category-dot" />}
                </button>
              )}

              <div
                className="header__brand-box"
                onClick={() => {
                  if (isScrolled) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                role={isScrolled ? 'button' : undefined}
                tabIndex={isScrolled ? 0 : undefined}
                title={isScrolled ? 'Scroll to top' : undefined}
                aria-label={isScrolled ? 'Scroll to top' : undefined}
              >
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
              </div>

              {/* Events Button — top right, morphs to round beside brand box on scroll */}
              <button
                className="header__events-btn"
                id="btn-events"
                onClick={() => {
                  setShowEvents((prev) => !prev);
                  setShowCategoryMenu(false);
                }}
                aria-label={showEvents ? 'Back to Menu' : 'View Events'}
                title={showEvents ? 'Back to Menu' : 'View Events'}
              >
                <CalendarDays size={16} className="header__events-icon" />
                <span className="header__events-btn-text">{showEvents ? 'Menu' : 'Events'}</span>
              </button>

              {/* Quick Category Dropdown Popover */}
              {!showEvents && showCategoryMenu && (
                <div
                  className={`header__category-dropdown ${
                    isScrolled
                      ? 'header__category-dropdown--scrolled'
                      : 'header__category-dropdown--unscrolled'
                  }`}
                  ref={categoryDropdownRef}
                >
                  <div className="header__category-dropdown-header">
                    <div className="header__category-dropdown-title">
                      <Leaf size={14} className="header__category-dropdown-icon" />
                      <span>Categories</span>
                    </div>
                    <span className="header__category-dropdown-badge">{visibleCategories.length}</span>
                  </div>

                  {/* Fast Search Filter inside Popover */}
                  <div className="header__category-dropdown-search-wrap">
                    <Search size={13} className="header__category-dropdown-search-icon" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={categorySearch}
                      onChange={(e) => setCategorySearch(e.target.value)}
                      className="header__category-dropdown-search"
                      aria-label="Filter categories"
                    />
                    {categorySearch && (
                      <button
                        type="button"
                        className="header__category-dropdown-clear"
                        onClick={() => setCategorySearch('')}
                        aria-label="Clear search"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="header__category-dropdown-list">
                    {displayedCategories.map((cat) => {
                      const isActive = activeCategory === cat;
                      const count = categoryCounts[cat] ?? 0;
                      return (
                        <button
                          key={cat}
                          className={`header__category-dropdown-item ${
                            isActive ? 'header__category-dropdown-item--active' : ''
                          }`}
                          onClick={() => {
                            setActiveCategory(cat);
                            setShowCategoryMenu(false);
                            if (showEvents) setShowEvents(false);
                          }}
                        >
                          <span className="header__category-dropdown-name">{cat}</span>
                          <span className="header__category-dropdown-count">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="header__divider" aria-hidden="true" />
            <p className="header__subtitle">{showEvents ? 'Events & Celebrations' : isBarActive ? 'Speakeasy & Bar' : 'Menu'}</p>
          </header>
        </div>

        {/* ──── Conditional: Events Page or Menu ──── */}
        {showEvents ? (
          <EventsPage />
        ) : (
          <div className="menu-layout">
            {/* ──── Main Content: Pagination in same position as before + Menu Grid ──── */}
            <div className="menu-content">
              {/* Pagination Controls in the same position as before */}
              <nav className="nav nav--pagination-only" id="menu-nav" aria-label="Menu pagination">
                <div className="nav__active-cat-label">
                  <span className="nav__active-cat-title">{activeCategory}</span>
                  <span className="nav__active-cat-count">
                    ({filteredData.length} {filteredData.length === 1 ? 'item' : 'items'})
                  </span>
                </div>

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
                  <div
                    className="menu-grid menu-grid--step"
                    role="tabpanel"
                    aria-labelledby={`tab-${activeCategory.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    {currentItems.map((item, index) =>
                      isBarActive ? (
                        <BarCard key={item.id} item={item} index={index} />
                      ) : (
                        <MenuCard key={item.id} item={item} index={index} />
                      )
                    )}
                  </div>
                ) : (
                  <div className="menu-grid menu-grid--empty">
                    <p className="menu-grid__empty-text">
                      No items found for this category.
                    </p>
                  </div>
                )}
              </main>
            </div>
          </div>
        )}

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
