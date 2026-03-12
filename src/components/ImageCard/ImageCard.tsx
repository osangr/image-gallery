import type { Photo } from "../../types";
import styles from "./ImageCard.module.scss";

interface ImageCardProps {
  photo: Photo;
  onRemove: (uniqueId: string) => void;
  onTransitionEnd: (uniqueId: string) => void;
  isRemoving: boolean;
}

export function ImageCard({
  photo,
  onRemove,
  onTransitionEnd,
  isRemoving,
}: ImageCardProps) {
  const { author, uniqueId, id } = photo;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onRemove(uniqueId);
    }
  };

  const handleAnimationEnd = () => {
    if (isRemoving) {
      onTransitionEnd(uniqueId);
    }
  };

  return (
    <article
      onClick={() => onRemove(uniqueId)}
      onTransitionEnd={handleAnimationEnd}
      className={`${styles.photoCard} ${isRemoving ? styles.removing : ""}`}
      tabIndex={0}
      role="button"
      aria-label={`Eliminar foto de ${author}`}
      onKeyDown={handleKeyDown}
    >
      <figure>
        <img
          src={`https://picsum.photos/id/${id}/200/200`}
          alt={`Imagen de ${author}`}
        />
        <figcaption>{author}</figcaption>
      </figure>
    </article>
  );
}
