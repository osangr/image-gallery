import { useEffect, useRef, useState } from "react";
import type { Photo } from "./types";
import styles from "./App.module.scss";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=100`,
        );
        const data: Photo[] = await response.json();
        const photosWithUniqueId = data.map((photo) => ({
          ...photo,
          uniqueId: crypto.randomUUID(),
        }));
        setPhotos((prev) => [...prev, ...photosWithUniqueId]);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [page]);

  return (
    <>
      <main>
        <h1>Image Gallery</h1>

        <div className={styles.galleryGrid}>
          {photos.map((photo) => (
            <div key={photo.uniqueId}>
              <img
                src={`https://picsum.photos/id/${photo.id}/200/200`}
                alt={photo.author}
              />
              <p>{photo.author}</p>
            </div>
          ))}
        </div>
        <div ref={observerTarget} />
      </main>
    </>
  );
}

export default App;
