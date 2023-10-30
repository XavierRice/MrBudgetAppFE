import { Link } from "react-router-dom"
import { useEffect } from "react";
import styled from 'styled-components'
import "./NavBar.css";

// USE EFFECT
const StyledH4 = styled.h4`
color: ${props => (props.totalAmount <= 1700 ? "red" : props.totalAmount <= 12000 ? "purple" : "green"   )};
text-align: center;
font-size:29px;
`;


const NavBar = (props) => {
  const {totalAmount} = props;

  useEffect( ()=> {}, [totalAmount])

  return (
    <div className="home-page">    {/* I made this in figma and locify. I enjoy the app and im learning to use it */}
      <div className="home-page-inner">
        <div className="frame-parent">
          <div className="frame-wrapper">
            <div className="mr-parent">
              <div className="mr">Mr.</div>
              <div className="budget">Budget</div>
            </div>
           {/* <StyledH4 totalAmount={totalAmount}>{totalAmount}</StyledH4> */}
          </div>
          <div className="navbar-wrapper">
            <div className="navbar1">
            <Link to="/" className="homeLink">
              <div className="home1">Home</div>
              </Link>
              <Link to="/transactions" className="indexLink">
              <div className="index2">Index</div>
              </Link>
              <Link to="/transactions/new" className="indexLink">
              <div className="about1">Form</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
