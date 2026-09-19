import React from "react";
// import HeroImg from "../assets/images/hero-4.png";
import HeroImg from "../../assets/images/hero-4.png";
const Hero = () => {
  return (
    <section className="section-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-3 fw-bold">Learn Anytime, Anywhere</h1>
            <p className="lead">
              Join our Learning Management System and explore a wide range of
              courses to enhance your skills and achieve your goals.
            </p>
            <a href="#courses" className="btn btn-white">
              Explore Courses
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img src={HeroImg} alt="Student Learning" className="img-fluid " />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
