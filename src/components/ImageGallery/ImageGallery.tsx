import { useEffect, useRef, useState } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import { ImageCard } from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.scss";

export function ImageGallery() {
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
    </>
  );
}
