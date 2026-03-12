import { useEffect, useState } from "react";
import type { Photo } from "./types";
import styles from "./App.module.scss";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list?page=2&limit=100",
        );
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <>
      <main>
        <h1>Image Gallery</h1>

        <div className={styles.galleryGrid}>
          {photos.map((photo) => (
            <div key={photo.id}>
              <img src={photo.download_url} alt={photo.author} />
              <p>{photo.author}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
