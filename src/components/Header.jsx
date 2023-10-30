import { Link } from "react-router-dom"
import styled from 'styled-components'
import "./Header.css"
import NavBar from "./NavBar";

const H4 = styled.h4`
color: ${props => (props.totalamount <= 700 ? "red" : props.totalamount <= 1200 ? "purple" : "green"    )};
`;

const Header = (props) => {
    const {totalAmount} = props;
    return (

        <header className="fixed">
            <nav className="navbar navbar-expand-lg "> {/* The bootstrap took some getting use too. Setting to "fixed-top" made the header the top/length of the page but cut out the search bar */}
                <div className="container">
                    <nav>
                        <div className="frame-parent">
                            <div className="frame-wrapper">
                                <div className="mr-parent">
                                    <div className="mr">Mr.</div>
                                    <div className="budget">Budget</div>
                                </div>
                                <div className="guestTotal"> <styledH4 totalAmount={totalAmount}>{totalAmount}</styledH4></div>
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

                    </nav>
                </div>
            </nav>
        </header >
    )
};

export default Header;