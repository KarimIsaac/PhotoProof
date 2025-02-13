import TitleRename from "../utility/TitleRename";
import Items from "../Components/Items";
const Home = () => {
  TitleRename("Photo Proof - Home");
  //Home Page
  return (
    <div id="homeDiv">
    
      <Items/>
      </div>  
  );
};

export default Home;
