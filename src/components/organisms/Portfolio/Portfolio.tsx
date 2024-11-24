import { useState } from 'react';

// Plugins
import { AnimatePresence, motion } from 'framer-motion';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// UI Components
import PortfolioItem1 from '../../molecules/PortfolioItems/PortfolioItem1';
import PortfolioItem2 from '../../molecules/PortfolioItems/PortfolioItem2';
import PortfolioItem3 from '../../molecules/PortfolioItems/PortfolioItem3';

// Images
import portfolio1 from '../../../assets/images/portfolio/portfolio1.jpg';
import portfolio2 from '../../../assets/images/portfolio/portfolio2.jpg';
import portfolio3 from '../../../assets/images/portfolio/portfolio3.jpg';
import portfolio4 from '../../../assets/images/portfolio/portfolio4.jpg';
import portfolio5 from '../../../assets/images/portfolio/portfolio5.jpg';
import portfolio6 from '../../../assets/images/portfolio/portfolio6.jpg';
// --> Portfolio items
import portfolioItem1 from '../../../assets/images/portfolio/items/item_01.jpg';
import portfolioItem2 from '../../../assets/images/portfolio/items/item_02.jpg';
// --> Icon Images
import backArrow from '../../../assets/images/close-left-arrow.png';
import closeIcon from '../../../assets/images/close.png';

// Styles
import './Portfolio.css';

// Data
import portfolioData from '../../../data/portfolio.json';
import { PortfolioItemType } from '../../../types/portfolio.types';

// --------------

function Portfolio() {
  const images: string[] = [
    portfolio1,
    portfolio2,
    portfolio3,
    portfolio4,
    portfolio5,
    portfolio6,
  ];

  // Portfolio item to be shown (change rendered different components in item folder)
  const [portfolioItem, setPortfolioItem] = useState<number>(0);
  // Portfolio item to be shown as a popup
  const [openPortfolio, setOpenPortfolio] = useState<number>(0);

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  /**
   * Toggle filter buttons menu display
   */
  const handleToggleFilterBtns = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  /**
   * Show images that have category matches the given, and
   * remove the images with different category.
   *
   * if the category equals `all`, it will show all images
   *
   * @param category images category to be shown
   */
  const handleFilterImages = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredImages: PortfolioItemType[] =
    selectedCategory === 'all'
      ? portfolioData.portfolioItems
      : portfolioData.portfolioItems.filter(
          (item: PortfolioItemType) => item.category === selectedCategory,
        );

  /**
   * Opening portfolio item that the user clicked
   *
   * @param num portfolio item to be open
   */
  const handleOpenItem = (num: number) => {
    const element: HTMLElement | null =
      document.getElementById('portfolio-wrapper');
    if (element) {
      element.scrollIntoView();
    }

    setPortfolioItem(num);
  };

  /**
   * Close Opened portfolio item and show the portfolio grid images
   */
  const handleCloseItem = () => {
    setPortfolioItem(0);
  };

  /**
   * Open a popup of the item with the given number passed to the function
   *
   * @param num Pop up item number to be open
   */
  const handleOpenPopup = (num: number) => {
    setOpenPortfolio(num);
  };

  /**
   * Closed the opened items by resetting the {openPortfolio} variable to 0
   */
  const handleClosePopup = () => {
    setOpenPortfolio(0);
  };

  return (
    <section id="portfolio" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div id="portfolio-wrapper" className="relative">
            {portfolioItem === 0 ? (
              <>
                <div
                  className="category-filter"
                  onClick={handleToggleFilterBtns}
                >
                  <div className="category-filter-icon" />
                </div>
                <motion.div
                  variants={{
                    expanded: {
                      height: 'auto',
                      paddingTop: '24px',
                      paddingBottom: '24px',
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    },
                    collapsed: {
                      height: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.3,
                      },
                    },
                  }}
                  animate={isFilterOpen ? 'expanded' : 'collapsed'}
                  initial="collapsed"
                  className="category-filter-list button-group filters-button-group visible"
                >
                  {portfolioData.filter.map((flBtn, i: number) => (
                    <div
                      key={`filter-btn-${i}`}
                      className={`button ${selectedCategory === flBtn.category ? 'is-checked' : ''}`}
                      onClick={() => handleFilterImages(flBtn.category)}
                    >
                      {flBtn.text}
                    </div>
                  ))}
                </motion.div>
                <div className="portfolio-load-content-holder" />
                <motion.div className="grid" id="portfolio-grid" layout>
                  {filteredImages.map((item: PortfolioItemType, i: number) => (
                    <AnimatePresence key={`portfolio-item-${i}`}>
                      <motion.div
                        animate={{ scale: 1, opacity: 1 }}
                        initial={{ scale: 0, opacity: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        id={`p-item-${i + 1}`}
                        className="grid-item element-item p-one-third"
                      >
                        <a
                          className="item-link ajax-portfolio"
                          style={{ position: 'relative' }}
                          data-id={i + 1}
                          onClick={() => {
                            // according to action type we will fire the function
                            if (
                              item?.action?.type === 'item' &&
                              typeof item?.action?.number === 'number'
                            ) {
                              handleOpenItem(item.action.number);
                            } else if (
                              item?.action?.type === 'popup' &&
                              typeof item?.action?.number === 'number'
                            ) {
                              handleOpenPopup(item.action.number);
                            }
                          }}
                        >
                          <img src={images[item.order]} alt="" />
                          <div className="portfolio-text-holder">
                            <div className="portfolio-text-wrapper">
                              <p className="portfolio-text">
                                {item.description.text}
                              </p>
                              <p className="portfolio-cat">
                                {item.description.caption}
                              </p>
                            </div>
                          </div>
                        </a>
                      </motion.div>
                    </AnimatePresence>
                  ))}
                </motion.div>
              </>
            ) : (
              // Portfolio items to be opened as a separate component
              <div className="portfolio-load-content-holder">
                <div
                  className="close-icon"
                  role="button"
                  onClick={handleCloseItem}
                >
                  <img src={backArrow} alt="back arrow" />
                </div>
                {portfolioItem === 1 ? (
                  <PortfolioItem1 />
                ) : portfolioItem === 2 ? (
                  <PortfolioItem2 />
                ) : portfolioItem === 3 ? (
                  <PortfolioItem3 />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popups portfolio items */}
      <Popup
        open={openPortfolio !== 0}
        closeOnDocumentClick
        onClose={handleClosePopup}
        modal
      >
        <div className="my-popup">
          <div
            className="close-popup-btn"
            role="button"
            onClick={handleClosePopup}
          >
            <img src={closeIcon} alt="close icon" />
          </div>
          {openPortfolio === 1 ? (
            <p className="block-right poped-up-item" onClick={handleClosePopup}>
              <iframe
                src="https://player.vimeo.com/video/199192931"
                width="100%"
                allow="autoplay; fullscreen"
              />
            </p>
          ) : openPortfolio === 2 ? (
            <div className="popup-image-box">
              <img src={portfolioItem1} alt="portfolio image" />
            </div>
          ) : openPortfolio === 3 ? (
            <div className="popup-image-box">
              <img src={portfolioItem2} alt="portfolio image" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Popup>
    </section>
  );
}

export default Portfolio;
