import React, { useState } from 'react';
import ShareAlbum from '../Components/ShareAlbum'; 

import useFetch from "../Components/useFetch";
import LoadingSVG from "../Images/loading.svg";

const Admin = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
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

    const handleSelectAlbum = (album) => {
        setSelectedAlbum(album);
    }

    return (
        <div className="adminPanel">
            <h1>Admin Panel</h1>
            {selectedAlbum && (
                <ShareAlbum 
                    sentAlbum={selectedAlbum} 
                    
                />
            )}
            <section id="allAlbumsSection">
                <h2>All Albums</h2>
                <div id="albums">
                    {albums.map((album) => (
                        <div key={album._id} className="album">
                            <img 
                                src={`../../Images/AlbumCovers/${album.cover}`} 
                                alt={album.name} 
                                onClick={() => handleSelectAlbum(album)} 
                            />
                            <h3>{album.name}</h3>
                            
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Admin;
