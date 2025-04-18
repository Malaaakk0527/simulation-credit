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
      image: '/images/immobilier.jpg',
      description: 'Investissez dans l\'immobilier avec des taux adaptés et une simulation rapide.',
      link: '/simulation/immobilier'
    },
    {
      title: 'Crédit Consommation',
      image: '/images/consommation.jpg',
      description: 'Financez vos projets personnels en toute tranquillité avec notre crédit souple.',
      link: '/simulation/consommation'
    }
  ];

  return (
    <div className="home-container">
      {/* Carousel Section */}
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

      {/* Intro Section */}
      <section className="intro-section">
        <h2 className="intro-title">Simplifiez votre vie financière</h2>
        <p className="intro-text">
          Des solutions bancaires innovantes, des crédits personnalisés, et un accompagnement sur mesure.
          Notre plateforme vous permet de simuler rapidement vos projets et de trouver la solution qui vous correspond.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <img src={service.image} alt={service.title} className="service-image" />
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <Link to={service.link} className="simulate-button">
                  Simuler
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
