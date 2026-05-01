import { useState, useEffect } from "react";
import "./QuoteCarousel.css";

const quotes = [
  {
    text: "We don't just build technology — we build the people who build with technology. Our mission is to deliver innovative digital solutions while empowering a new generation of skilled tech professionals.",
    author: "IDTECH Real World Innovations"
  },
  {
    text: "Innovation is not just about creating new things, it's about transforming lives and empowering communities through technology and education.",
    author: "IDTECH Real World Innovations"
  },
  {
    text: "Every line of code we write, every student we train, is a step towards building a more technologically empowered future.",
    author: "IDTECH Real World Innovations"
  },
  {
    text: "We believe in practical learning, real-world solutions, and turning ambitious ideas into digital reality.",
    author: "IDTECH Real World Innovations"
  }
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
      setIsAnimating(false);
    }, 500);
  };

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="quote-carousel-section" data-aos="fade-up">
      <div className="container">
        <div className="carousel-wrapper">
          <div className="quote-icon-bg">
            <i className="bi bi-quote"></i>
          </div>

          <div className={`quote-content ${isAnimating ? "fade-out" : "fade-in"}`}>
            <p className="quote-text">{quotes[currentIndex].text}</p>
            <span className="quote-author">— {quotes[currentIndex].author}</span>
          </div>

          <div className="carousel-controls">
            <button onClick={handlePrev} className="carousel-btn prev" aria-label="Previous quote">
              <i className="bi bi-chevron-left"></i>
            </button>
            
            <div className="carousel-dots">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  aria-label={`Go to quote ${index + 1}`}
                />
              ))}
            </div>

            <button onClick={handleNext} className="carousel-btn next" aria-label="Next quote">
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
