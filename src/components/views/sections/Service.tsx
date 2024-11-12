import React from 'react';
import servImg1 from '../../../assets/images/services/service1.png';
import servImg2 from '../../../assets/images/services/service2.png';
import servImg3 from '../../../assets/images/services/service3.png';
import servImg4 from '../../../assets/images/services/service4.png';
import servImg5 from '../../../assets/images/services/service4.png';
import serviceData from '../../../data/service.json';

// Type definitions for serviceData
type ServiceBox = {
  className: string;
  imageAltText: string;
  servTitle: string;
  servDesc: string;
};

type ServiceData = {
  title: string;
  description: string;
  paragraphes: string[];
  servicesBoxes: ServiceBox[];
};

// ---------------

function Service() {
  const images: string[] = [servImg1, servImg2, servImg3, servImg4, servImg5];

  return (
    <section id="service" className="section">
      <div className="section-wrapper block">
        <div className="content-1300">
          <div className="row">
            <div className="one-half width-55">
              <div className="services-wrapper">
                {serviceData.servicesBoxes.map(
                  (serv: ServiceBox, i: number) => (
                    <div key={'serv-' + i} className={serv.className!}>
                      <img src={images[i]} alt={serv.imageAltText} />
                      <h4 className="service-title">{serv.servTitle}</h4>
                      <div className="service-text">{serv.servDesc}</div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="one-half width-40 last">
              <h2 className="entry-title section-title">{serviceData.title}</h2>
              <p className="section-info">{serviceData.description}</p>
              {serviceData.paragraphes.map((parg: string, i: number) => (
                <p key={'p-' + i}>{parg}</p>
              ))}

              <div className="button-group-wrapper">
                <a className="button">Download CV</a>
                <a href="#portfolio" className="button">
                  Check My Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Service;
