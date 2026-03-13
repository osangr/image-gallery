import type { Photo } from "../../types";
import styles from "./ImageCard.module.scss";
import { motion } from "framer-motion";

interface ImageCardProps {
  photo: Photo;
  onRemove: (uniqueId: string) => void;
}

export function ImageCard({ photo, onRemove }: ImageCardProps) {
  const { author, uniqueId, id } = photo;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onRemove(uniqueId);
    }
  };

  return (
    <motion.article
      onClick={() => onRemove(uniqueId)}
      className={styles.photoCard}
      tabIndex={0}
      role="button"
      aria-label={`Eliminar foto de ${author}`}
      onKeyDown={handleKeyDown}
    >
      <figure>
        <img
          src={`https://picsum.photos/id/${id}/200/200`}
          alt={`Imagen de ${author}`}
          loading="lazy"
        />
        <figcaption>{author}</figcaption>
      </figure>
    </motion.article>
  );
}
