import React from "react";
import "../Navbar/Navbar.styles.scss";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ReactComponent as BrandLogo } from "../../assets/eventlogo.svg";

const StyledButton = withStyles({
  root: {
    fontSize: "14px",
    fontWeight: "bolder",
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 20px",
    positions: "relative"
  },
  label: {
    textTransform: "none"
  }
})(Button);

const Navbar = () => {
  return (
    <div className="home__navbar">
      <BrandLogo className="home__navbar__logo" />
      <div className="home__options">
        <StyledButton className="home__navbar__button">
          Available Events
        </StyledButton>
        <StyledButton className="home__navbar__button">Log in</StyledButton>
        <StyledButton className="home__navbar__button">Sign up</StyledButton>
        <StyledButton className="home__navbar__button">Contacts</StyledButton>
      </div>
    </div>
  );
};
export default Navbar;
