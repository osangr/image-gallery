import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import { usePhotos } from "./hooks/usePhotos";

function App() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const { photos, error, hasMore, loadMore, removePhoto } = usePhotos();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  const handleRemovePhoto = (uniqueId: string) => {
    setRemovingId(uniqueId);
  };

  const handleTransitionEnd = (uniqueId: string) => {
    removePhoto(uniqueId);
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
              tabIndex={0}
              role="button"
              aria-label={`Eliminar foto de ${photo.author}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleRemovePhoto(photo.uniqueId);
                }
              }}
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
