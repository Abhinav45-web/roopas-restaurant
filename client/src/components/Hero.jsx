import { Link } from "react-router-dom";
import { FiArrowRight, FiStar } from "react-icons/fi";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <FiStar />
          Fresh food. Happy mood.
        </div>

        <h1>
          Flavours that feel
          <span> like home.</span>
        </h1>

        <p>
          Discover delicious meals prepared with fresh ingredients,
          authentic flavours and a little bit of love.
        </p>

        <div className="hero-buttons">
          <Link to="/menu" className="primary-button">
            Explore Menu
            <FiArrowRight />
          </Link>

          <a href="#popular" className="secondary-button">
            View Popular Dishes
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>4.8★</strong>
            <span>Customer Rating</span>
          </div>

          <div>
            <strong>30 min</strong>
            <span>Average Delivery</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Delicious Dishes</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="food-circle">
          <span className="food-emoji">🍛</span>
        </div>

        <div className="floating-card card-one">
          🔥 Most Loved
        </div>

        <div className="floating-card card-two">
          ⭐ 4.8 Rating
        </div>
      </div>
    </section>
  );
}

export default Hero;