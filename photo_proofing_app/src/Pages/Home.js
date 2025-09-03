import TitleRename from "../utility/TitleRename";
<<<<<<< HEAD
import Register from "./Register";
=======
>>>>>>> 41a56c1fe11721b4771629c18548f6d9dad69dab
import Items from "../Components/Items";
import { Route } from "react-router-dom";
import Footer from "../Components/Footer";
import About from "../Components/About";
const Home = () => {
  TitleRename("Photo Proof - Home");
  //Home Page
  return (
    <div id="homeDiv">
<<<<<<< HEAD
      <div className="first-page"></div>
      <div className="first-text">
        <h1>PHOTO<span id="first-text2">PROOF</span></h1>
        <h1 id="first-text2">PROOF</h1>
        <p className="right-text">Pellentesque mauris a lobortis in bibendum sed lobortis semper. Eget eu vel eu vitae.</p>
      </div>
      <Footer />
=======
    
>>>>>>> 41a56c1fe11721b4771629c18548f6d9dad69dab
      <Items/>
      <About/>
      </div>  
  );
};

export default Home;
