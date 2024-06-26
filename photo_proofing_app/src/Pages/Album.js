//Komponent för specifikt album

import useFetch from "../Components/useFetch";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import EditAlbum from "../Components/EditAlbum";
import AddPhotos from "../Components/AddPhotos";
import ShareAlbum from "../Components/ShareAlbum";
import DeleteAlbum from "../Components/DeleteAlbum";
import ShowDetailsComponent from "../Components/ShowDetails";
import Download from "../Components/Download";
import DeleteIcon from "../Images/delete.svg";
import RemoveIcon from "../Images/remove.svg";
import LikeIcon from "../Images/favorite.svg";
import TitleRename from "../utility/TitleRename";
import { useEffect } from "react";
const Album = (props) => {
  TitleRename("Photo Proof - Album");

  const location = useLocation();

   // Debugging to check the state content
  const { sentAlbum, role } = location.state 
  console.log("Role:", role);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteArray, setDeleteArray] = useState([]);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState('');
  let owner = false;
  if (sentAlbum.owner === localStorage.getItem("id")) {
    owner = true;
  }
  const isOwner = sentAlbum.owner === localStorage.getItem("id");
  const isAdmin = role === "Admin";
  const showOptions = isOwner || isAdmin;
  const {
    data: photosGet,
    loading: loadingPhotos,
    error: errorPhotos,
    refetch: refetchPhotos,
  } = useFetch(`photo/album/${sentAlbum._id}`);

  const {
    data: albumGet,
    loading: loadingAlbum,
    error: errorAlbum,
    refetch: refetchAlbum,
  } = useFetch(`album/${sentAlbum._id}`);

  const handleShowEdit = () => {
    if (showEdit) {
      setShowEdit(false);
      setShowAdd(false);
      setShowShare(false);
      setShowDetails(false);
      setShowDelete(false);
    } else {
      setShowEdit(true);
      setShowAdd(false);
      setShowShare(false);
      setShowDetails(false);
      setShowDelete(false);
    }
  };

  const handleShowAdd = () => {
    if (showAdd) {
      setShowAdd(false);
      setShowEdit(false);
      setShowShare(false);
      setShowDetails(false);
      setShowDelete(false);
    } else {
      setShowAdd(true);
      setShowEdit(false);
      setShowShare(false);
      setShowDetails(false);
      setShowDelete(false);
    }
  };

  const handleShowShare = () => {
    if (showShare) {
      setShowShare(false);
      setShowAdd(false);
      setShowEdit(false);
      setShowDetails(false);
      setShowDelete(false);
    } else {
      setShowShare(true);
      setShowAdd(false);
      setShowEdit(false);
      setShowDetails(false);
      setShowDelete(false);
    }
  };

  const handleShowDetails = (e) => {
    if (showDetails) {
      setShowDetails(false);
      setShowShare(false);
      setShowAdd(false);
      setShowEdit(false);
      setShowDelete(false);
    } else {
      setShowDetails(true);
      setShowShare(false);
      setShowAdd(false);
      setShowEdit(false);
      setShowDelete(false);
    }
  };

  const handleShowDelete = (e) => {
    if (showDelete) {
      setShowDelete(false);
      setShowDetails(false);
      setShowShare(false);
      setShowAdd(false);
      setShowEdit(false);
    } else {
      setShowDelete(true);
      setShowDetails(false);
      setShowShare(false);
      setShowAdd(false);
      setShowEdit(false);
    }
  };

  const addRemoveDelete = (e) => {
    //Kolla om klass deletePhoto finns, isåfall ta bort, annars lägg till (toggle), toggla i deleteArray
    if (
      e.target.parentElement.parentElement.classList.contains("deletePhoto")
    ) {
      e.target.parentElement.parentElement.classList.remove("deletePhoto");
      setDeleteArray(
        deleteArray.filter(
          (id) => id !== e.target.parentElement.parentElement.id
        )
      );
      e.target.src = DeleteIcon;
    } else {
      e.target.parentElement.parentElement.classList.add("deletePhoto");
      setDeleteArray([...deleteArray, e.target.parentElement.parentElement.id]);
      e.target.src = RemoveIcon;
    }
  };
 
  
  const allowDownload = async (photoId, email) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:8000/api/photo/allowDownload/${photoId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': `${token}`, 
        },
        body: JSON.stringify({ email })
      });
  
      if (response.ok) {
        
      } else {
        
      }
    } catch (error) {
      
    }
  };
  const deletePhotos = async () => {
    try {
      await fetch("http://localhost:8000/api/photo/many", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          token: localStorage.getItem("token"),
          
        },
        body: JSON.stringify({ ids: deleteArray }),
      });
      setDeleteArray([]);
      await refetchPhotos();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLikePhoto = async (e) => {
    //toggle css klass för liked
    try {
      if (e.target.parentElement.parentElement.classList.contains("liked")) {
        e.target.parentElement.parentElement.classList.remove("liked");
        e.target.src = LikeIcon;
      } else {
        e.target.parentElement.parentElement.classList.add("liked");
        e.target.src = RemoveIcon;
      }
      await fetch(
        "http://localhost:8000/api/photo/" +
          e.target.parentElement.parentElement.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            like: {
              userID: localStorage.getItem("id"),
              email: localStorage.getItem("email"),
            },
          }),
        }
      );
    } catch (err) {
      setMessage(err.message);
    }
  };

  const checkLiked = (photo) => {
    //Kollar om en bild är likad, returnerar true eller     false
    if (photo.likes.length > 0) {
      for (let i = 0; i < photo.likes.length; i++) {
        if (photo.likes[i].userID === localStorage.getItem("id")) {
          return true;
        }
      }
    }
    return false;
  };
  
  const sendRequest = async () => {
    //Uppdatera album och visa för fotograf att kund "likat" färdigt
    try {
      const response = await fetch(
        "http://localhost:8000/api/album/" + sentAlbum._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            done: true,
            user: localStorage.getItem("id"),
            email: localStorage.getItem("email"),
            comment: comment,
          }),
        }
      );
      if (response.ok) {
        setMessage("Thank you for feedback!");
      }
    } catch (err) {}
  };

  if (loadingPhotos) return <p>Loading...</p>;
  if (errorPhotos) {
    return <p>There was an error fetching photos.. {errorPhotos.message}</p>;
  }
  
  return (
    
    <section className="AlbumSection">
      
      <h1>{sentAlbum.name}</h1>
      <div className="tagsDiv">
        {sentAlbum.tags.map((tag) => {
          return (
            <span className="tag" key={tag}>
              {tag}
            </span>
          );
        })}
      </div>
      {sentAlbum.description && (
        <div id="descriptionDiv">
          <p>{sentAlbum.description}</p>
        </div>
      )}
      
      {showOptions && (       
      <div className="buttonDiv">
          <button
            style={
              showEdit
                ? {
                    background: "#a2b3f7",
                  }
                : null
            }
            onClick={handleShowEdit}
          >
            Edit Album
          </button>
          <button
            style={
              showAdd
                ? {
                    background: "#a2b3f7",
                  }
                : null
            }
            onClick={handleShowAdd}
          >
            Add Photos
          </button>
          <button
            style={
              showShare
                ? {
                    background: "#a2b3f7",
                  }
                : null
            }
            onClick={handleShowShare}
          >
            Share Album
          </button>
          <button
            style={
              showDelete
                ? {
                    background: "#a2b3f7",
                  }
                : null
            }
            onClick={handleShowDelete}
          >
            Delete Album
          </button>
        </div>
      )}
      {showEdit && isOwner  && (
        <EditAlbum sentAlbum={albumGet} refetchAlbum={refetchAlbum} />
      )}
      {showAdd && isOwner  && (
        <AddPhotos sentAlbum={albumGet} refetchPhotos={refetchPhotos} />
      )}
      {showShare && showOptions  && (
        <ShareAlbum
          sentAlbum={albumGet}
          refetchAlbum={refetchAlbum}
          handleShowDetails={handleShowDetails}
          setSelectedEmail={setSelectedEmail}
          selectedEmail={selectedEmail}
        />
      )}
      
      {showDetails && owner && (
        <ShowDetailsComponent
          sentAlbum={albumGet}
          refetchAlbum={refetchAlbum}
          photosGet={photosGet}
        />
      )}
      {showDelete && owner && <DeleteAlbum sentAlbum={albumGet} />}
      {deleteArray.length > 0 && owner && (
        <div id="deletePhotosDiv">
          <h3>
            Delete {deleteArray.length}{" "}
            {deleteArray.length > 1 ? "images" : "image"}
          </h3>
          <button onClick={deletePhotos}>Delete Photos</button>
        </div>
      )}
      {role === "Customer" && (
        <>
          <Download
            checkLiked={checkLiked}
            photosGet={photosGet}
            sentAlbum={sentAlbum}
          />
          <form id="sendRequestForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="comment">Comment</label>
            <textarea onChange={(e) => setComment(e.target.value)} />
            <button onClick={sendRequest}>Send Request</button>
            {message && <p>{message}</p>}
          </form>
        </>
      )}
       
      


      <div id="collection">
        {photosGet.length === 0 && <h2>No Photos found, Add photos!</h2>}
        {photosGet.map((photo) => {
          return (
            <div key={photo._id} className="photo-container">
            <div
              className={checkLiked(photo) ? "liked photoDiv" : "photoDiv"}
              id={photo._id}
              key={photo._id}
            >
              <span
                style={{ backgroundColor: !owner && "rgb(0, 153, 23)" }}
                onClick={owner ? addRemoveDelete : toggleLikePhoto}
              >
                <img src={owner ? DeleteIcon : LikeIcon} alt="Delete" />
              </span>
              
              <picture className="photo">
                <img
                  src={
                    role === "Customer"
                      ? "../../Images/Watermarked/wm_" + photo.name
                      : "../../Images/Photos/" + photo.name
                  }
                  alt={photo.name}
                />
              </picture>
              
            </div>
           
            {(role === "Admin" || role === "Photographer" || true) && (
  <input
    type="checkbox"
    checked={photo.allowDownload.includes(selectedEmail)}
    onChange={() => allowDownload(photo._id, selectedEmail)}
  />
)}
            
        
      
</div>
          );
        })}
      </div>
      
    </section>
  );
};
export default Album;
