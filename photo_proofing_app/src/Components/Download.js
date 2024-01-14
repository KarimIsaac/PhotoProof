import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Download = ({ photosGet, sentAlbum }) => {

  const handleDownload = async () => {
    const zip = new JSZip();
    for (const photo of photosGet) {
      try {
        const response = await fetch(`/download/${photo.name}`);
        if (!response.ok) {
          throw new Error(`Failed to download ${photo.name}`);
        }
        const blob = await response.blob();
        zip.file(photo.name, blob);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'photos.zip');
  };

  return (
    <div>
      {/* Download all button */}
      <button onClick={handleDownload}>
        Download All as ZIP
      </button>
      {/* Individual download buttons */}
      {photosGet.map(photo => (
        <button key={photo._id} onClick={() => handleDownload(photo.name)}>
          Download {photo.name}
        </button>
      ))}
    </div>
  );
};

export default Download;
