import TitleRename from "../utility/TitleRename";
import Register from "./Register";
import Items from "../Components/Items";
import { Route } from "react-router-dom";
import Footer from "../Components/Footer";
import About from "../Components/About";
const Home = () => {
  TitleRename("Photo Proof - Home");
  //Home Page
  return (
    <div id="homeDiv">
      <div className="first-page"></div>
      <div className="first-text">
        <h1>PHOTO<span id="first-text2">PROOF</span></h1>
        <h1 id="first-text2">PROOF</h1>
        <p className="right-text">Pellentesque mauris a lobortis in bibendum sed lobortis semper. Eget eu vel eu vitae.</p>
      </div>
      <Footer />
      <Items/>
      <About/>
      </div>  
  );
};

export default Home;
