import { useEffect, useRef, useState } from "react";
import type { Photo } from "./types";
import styles from "./App.module.scss";

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=100`,
        );
        const data: Photo[] = await response.json();

        if (data.length === 0) {
          setHasMore(false);
          return;
        }

        const photosWithUniqueId = data.map((photo) => ({
          ...photo,
          uniqueId: crypto.randomUUID(),
        }));
        setPhotos((prev) => [...prev, ...photosWithUniqueId]);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setError(
          "Ha habido un error al cargar las imágenes. Inténtalo de nuevo más tarde.",
        );
      }
    };

    fetchPhotos();
  }, [page]);

  const handleRemovePhoto = (uniqueId: string) => {
    setRemovingId(uniqueId);
  };

  const handleTransitionEnd = (uniqueId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.uniqueId !== uniqueId));
    setRemovingId(null);
  };

  return (
    <>
      <main>
        <h1>Image Gallery</h1>

        <div className={styles.galleryGrid}>
          {photos.map((photo) => (
            <div
              key={photo.uniqueId}
              onClick={() => handleRemovePhoto(photo.uniqueId)}
              onTransitionEnd={() => handleTransitionEnd(photo.uniqueId)}
              className={`${styles.photoCard} ${
                removingId === photo.uniqueId ? styles.removing : ""
              }`}
            >
              <img
                src={`https://picsum.photos/id/${photo.id}/200/200`}
                alt={photo.author}
              />
              <p>{photo.author}</p>
            </div>
          ))}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {!hasMore && <p>No hay más imágenes</p>}
        <div ref={observerTarget} />
      </main>
    </>
  );
}

export default App;
