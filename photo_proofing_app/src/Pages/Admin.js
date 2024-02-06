import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ShareAlbum from '../Components/ShareAlbum'; 
import useFetch from "../Components/useFetch";
import LoadingSVG from "../Images/loading.svg";

const Admin = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const { data: albums, loading, error } = useFetch("album/");
    const navigate = useNavigate(); // Initialize useNavigate

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

    // Updated handleSelectAlbum to navigate to Album component
    const handleSelectAlbum = (album) => {
        navigate(`/Profile/Album/${album._id}`, { state: { sentAlbum: album, role: 'Admin' } });
    }

    return (
        <div className="adminPanel">
            <h1>Admin Panel</h1>
            <section id="allAlbumsSection">
                <h2>All Albums</h2>
                <div id="albums">
                    {albums.map((album) => (
                        <div key={album._id} className="album" onClick={() => handleSelectAlbum(album)}>
                            <img 
                                src={`../../Images/AlbumCovers/${album.cover}`} 
                                alt={album.name} 
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
