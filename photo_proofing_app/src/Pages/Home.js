import TitleRename from "../utility/TitleRename";
import Slideshow from "../Components/Slideshow";
import Items from "../Components/Items";
const Home = () => {
  TitleRename("Photo Proof - Home");
  //Home Page
  return (
    <div id="homeDiv">
      <Slideshow/>
      <Items/>
      </div>  
  );
};

export default Home;
