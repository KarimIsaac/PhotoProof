

const Download = ({ photosGet, sentAlbum }) => {

  const download= async (photoName) => {
    const response = await fetch(`../../Images/Photos/${photoName}`);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = photoName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  

  return (
    <div>
      {photosGet.map(photo => (
        photo.allowDownload && (
          <button key={photo._id} onClick={() => download(photo.name)}>
            Download {photo.name}
          </button>
        )
      ))}
    </div>
  );
};

export default Download;
