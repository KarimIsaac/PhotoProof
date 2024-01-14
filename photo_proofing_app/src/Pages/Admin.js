import React from 'react';
import useFetch from "../Components/useFetch";
import LoadingSVG from "../Images/loading.svg";
import { Link } from "react-router-dom";
const Admin = () => {
    
    const { data: albums, loading, error } = useFetch("album/");

    if (loading) {
        return (
            <div className="loading">
                <img src={LoadingSVG} alt="loading" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="adminPanel">
            <h1>Admin Panel</h1>
            <section id="allAlbumsSection">
                <h2>All Albums</h2>
                <div id="albums">
                    {albums.map((album) => (
                        <><Link
                            to={`/Profile/Album/${album._id}`}
                            state={{
                                sentAlbum: album,
                            }}
                            key={album._id}
                        >
                            <div className="album">
                                <picture>
                                    <img
                                        src={`../../Images/AlbumCovers/${album.cover}`} 
                                        alt={album.name} />
                                </picture>
                                <h3>{album.name}</h3>
                            </div>
                        </Link><div key={album._id} className="album">

                                

                            </div></>
                    ))}
                </div>
            </section>
            
        </div>
    );
}

export default Admin;