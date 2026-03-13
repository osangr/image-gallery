import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../types";

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (isLoadingRef.current) return;
      isLoadingRef.current = true;
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://picsum.photos/v2/list?page=${page}&limit=50`,
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
        setHasMore(false);
        console.error("Error fetching photos:", error);
        setError(
          "Ha habido un error al cargar las imágenes. Inténtalo de nuevo más tarde.",
        );
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    };

    fetchPhotos();
  }, [page]);

  const loadMore = useCallback(() => {
    if (hasMore && !isLoadingRef.current) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const removePhoto = (uniqueId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.uniqueId !== uniqueId));
  };

  return { photos, error, hasMore, loadMore, removePhoto, isLoading };
}
