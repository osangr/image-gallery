import { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import { usePhotos } from "./hooks/usePhotos";
import { ImageCard } from "./components/ImageCard/ImageCard";

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

        <ul className={styles.galleryGrid}>
          {photos.map((photo) => (
            <li key={photo.uniqueId}>
              <ImageCard
                photo={photo}
                onRemove={handleRemovePhoto}
                onTransitionEnd={handleTransitionEnd}
                isRemoving={removingId === photo.uniqueId}
              />
            </li>
          ))}
        </ul>
        {error && <p className={styles.error}>{error}</p>}
        {!hasMore && <p>No hay más imágenes</p>}
        <div ref={observerTarget} />
      </main>
    </>
  );
}

export default App;
