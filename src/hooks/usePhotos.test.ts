import { renderHook, waitFor } from "@testing-library/react";
import { usePhotos } from "./usePhotos";

const mockPhotos = [
  {
    id: 1,
    author: "Author 1",
    url: "https://example.com/photo1.jpg",
    download_url: "https://example.com/photo1.jpg",
    width: 300,
    height: 300,
    uniqueId: "unique1",
  },
  {
    id: 2,
    author: "Author 2",
    url: "https://example.com/photo2.jpg",
    download_url: "https://example.com/photo2.jpg",
    width: 300,
    height: 300,
    uniqueId: "unique2",
  },
];

vi.stubGlobal("fetch", vi.fn());

describe("usePhotos", () => {
  test("initially loads photos", async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockPhotos),
    } as Response);
    const { result } = renderHook(() => usePhotos());

    await waitFor(() => {
      expect(result.current.photos).toHaveLength(2);
      expect(result.current.error).toBeNull();
      expect(result.current.hasMore).toBe(true);
    });
  });

  test("handles fetch error", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Fetch error"));
    const { result } = renderHook(() => usePhotos());

    await waitFor(() => {
      expect(result.current.photos).toHaveLength(0);
      expect(result.current.error).toBe(
        "Ha habido un error al cargar las imágenes. Inténtalo de nuevo más tarde.",
      );
      expect(result.current.hasMore).toBe(false);
    });
  });
});
