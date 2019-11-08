import React from "react";
import "../home/Home.styles.scss";
import homebg from "../../assets/homebg.png";
import Navbar from "../../components/Navbar/Navbar.component";
const HomePage = () => (
  <div className="home">
    <div className="home__background">
      <Navbar />
      <div className="home__container">
        <div></div>
        <h1 className="home__message">
          Share your event to the people that matters to you.
        </h1>
      </div>
    </div>
  </div>
);

export default HomePage;
