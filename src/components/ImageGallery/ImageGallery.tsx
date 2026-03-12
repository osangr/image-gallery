import { useEffect, useRef } from "react";
import { usePhotos } from "../../hooks/usePhotos";
import { ImageCard } from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "../Skeleton/Skeleton";

const containerVariants = {
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export function ImageGallery() {
  const observerTarget = useRef<HTMLDivElement>(null);

  const { photos, error, hasMore, loadMore, removePhoto, isLoading } =
    usePhotos();

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
    removePhoto(uniqueId);
  };

  return (
    <>
      {isLoading && photos.length === 0 ? (
        <Skeleton />
      ) : (
        <motion.ul
          className={styles.galleryGrid}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {photos.map((photo) => (
              <motion.li
                key={photo.uniqueId}
                layout
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                variants={itemVariants}
              >
                <ImageCard photo={photo} onRemove={handleRemovePhoto} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {!hasMore && <p>No hay más imágenes</p>}
      <div ref={observerTarget} />
    </>
  );
}
