//Komponent för sektion som visar alla fotografens album
import { Link } from "react-router-dom";
import LoadingSVG from "../Images/loading.svg";
import useFetch from "../Components/useFetch";
import Notification from "../Components/Notification";

const ProfileAlbums = (role) => {
  const { data: albums, loading, error } = useFetch(`album/`);
  if (loading) {
    return (
      <div className="loading">
        <img src={LoadingSVG} alt="loading" />
      </div>
    );
  }
  if (error) {
    return <div>ERROR: {error}</div>;
  }

  return (
    <><Notification /><section id="profileAlbumsSection">
      <div id="profileAlbumTop">
        <h2>My Albums</h2>
        <Link to="Album/New">Create new album</Link>
      </div>
      {albums.length === 0 ? (
        <h3>Create your first album!</h3>
      ) : (
        <div id="albums">
          {albums.map((album) => {
            return (
              
              <Link
              
                to={"/Profile/Album/" + album._id}
                state={{
                  sentAlbum: album,
                  role: role,
                }}
                key={album._id}
              >
                <div className="album">
                  <picture>
                    <img
                      src={"../Images/AlbumCovers/" + album.cover}
                      alt={album.name} />
                  </picture>
                  <h3>{album.name}</h3>
                  
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section></>
  );
};

export default ProfileAlbums;
