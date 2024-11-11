// Images
import servIcon1 from '../../../../assets/images/services/service1.png';
import servIcon2 from '../../../../assets/images/services/service2.png';

// Styles
import './portfolio-item.css';

// -------------------

function PortfolioItem3() {
  return (
    <div className="portfolio-item-wrapper center-relative">
      <div className="portfolio-content">
        <div className="row">
          <div className="one-half width-40">
            <h2 className="entry-title section-title">
              Creatures of the cosmos
            </h2>

            <p className="section-info">
              Two ghostly white figures in coveralls and helmets are softly
              dancing.
            </p>

            <p>
              Cras pretium metus pulvinar ultricies auctor. In varius purus
              blandit sem mollis tristique. Curabitur sed lorem vel ligula
              pulvinar porttitor. Proin sit amet mauris eleifend amet,
              ullamcorper lacus. Vangelis rich in heavy atoms descended from
              astronomers dream of the mind’s cras pretium metus pulvinar
              ultricies auctor in varius purus blandit.
            </p>

            <p>
              <a className="button">Check Project</a>
            </p>
          </div>

          <div className="one-half width-55 last">
            <div className="services-wrapper">
              <div className="service-holder">
                <img src={servIcon1} alt="" />
                <h4 className="service-title">Design</h4>
                <div className="service-text">
                  A full stack allaround designer that may or may not include a
                  guide for specific creative people
                </div>
              </div>

              <div className="service-holder m-right-0">
                <img src={servIcon2} alt="" />
                <h4 className="service-title">Develop</h4>
                <div className="service-text">
                  Tellus pharetra erat tristique erat donec dignissim etiam sed
                  malesik enim sodales lorem ipsum
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem3;
