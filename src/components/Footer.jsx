import { Link } from "react-router-dom";

export default function Footer(){

    return (

        <footer>
            <section   className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom bg-warning fixed-bottom'>
                <a href="mailto:xavierrice@pursuit.org">Contact Me</a>  {/* This is one of the new methods ive learned but it doesn't work how i want*/}
                <Link to='https://github.com/Xavierrice/'>
                <h6 >About the Author</h6>
                </Link>
                <p>Copywright <strong>MR.BUDGETAPP</strong> </p>
            </section>
        </footer>

    )
};