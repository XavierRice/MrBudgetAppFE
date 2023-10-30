import goldenPig from "../assets/goldenPig.png"

function Home() {

    return (
        <div className="Home">
          <div className="container-fluid " id="hero">
          <img src={goldenPig} className="img-fluid " alt="golden pig" />
          </div>
        <h2>Hello</h2>
        <h3>This is the Budget app!</h3>
      </div>
    );
    
    
    }
    
    
    export default Home;