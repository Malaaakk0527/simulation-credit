import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import './Home.css';

const Home = () => {
  const carouselImages = [
    '/images/slide_1.jpg',
    '/images/slide_2.jpg',
    '/images/slide_3.jpg'
  ];

  const services = [
    {
      title: 'Crédit Immobilier',
      description: 'Investissez dans l\'immobilier avec nos solutions de financement adaptées à vos besoins. Simulez rapidement et obtenez des conseils personnalisés.',
      link: '/simulation/immobilier'
    },
    {
      title: 'Crédit Consommation',
      description: 'Financez vos projets personnels en toute tranquillité avec notre crédit souple et des taux avantageux. Simulation instantanée et procédure simplifiée.',
      link: '/simulation/consommation'
    }
  ];

  return (
    <div className="home-container">
      {/* Carousel Section - conservé mais avec style modernisé */}
      <div className="carousel-container">
        <Carousel autoplay effect="fade">
          {carouselImages.map((image, index) => (
            <div key={index}>
              <div
                className="carousel-slide"
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Intro Section - amélioré avec du contenu plus engageant */}
      <section className="intro-section">
        <h2 className="intro-title">Solutions financières sur mesure</h2>
        <p className="intro-text">
          Découvrez nos solutions bancaires innovantes conçues pour répondre à vos besoins.
          Grâce à notre plateforme intuitive, vous pouvez simuler rapidement vos projets 
          et trouver le financement idéal pour concrétiser vos rêves.
        </p>
      </section>

      {/* Services Section - modernisé mais conservant la même fonctionnalité */}
      <section className="services-section">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to={service.link} className="simulate-button">
                  Simuler maintenant
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
