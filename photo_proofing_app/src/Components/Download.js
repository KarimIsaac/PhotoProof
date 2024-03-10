

const Download = ({ photosGet, sentAlbum }) => {

  const download = async (photoName) => {
    const response = await fetch(`http://localhost:8000/api/photo/download/${photoName}`,{
      method: 'GET',
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    
    if(response.status === 200){
      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type');
      const blob = new Blob([buffer], { type: contentType });
  
  
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = photoName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }else {
      return alert('You are not allowed to download this photo');
    } 

   
};

// const response = await fetch(`../../Images/Photos/${photoName}`);
// const blob = await response.blob();
// const downloadUrl = window.URL.createObjectURL(blob);
// const link = document.createElement('a');
// link.href = downloadUrl;
// link.download = photoName;
// document.body.appendChild(link);
// link.click();
// document.body.removeChild(link);

  return (
    <div>
      {photosGet.map(photo => (
        photo.allowDownload.includes(localStorage.getItem('email')) && (
          <button key={photo._id} onClick={() => download(photo.name)}>
            Download {photo.name}
          </button>
        )
      ))}
    </div>

  );
};

export default Download;
