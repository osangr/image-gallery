import { act, renderHook, waitFor } from "@testing-library/react";
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

const mockPhotosPage2 = [
  {
    id: 3,
    author: "Author 3",
    url: "https://example.com/photo3.jpg",
    download_url: "https://example.com/photo3.jpg",
    width: 300,
    height: 300,
    uniqueId: "unique3",
  },
  {
    id: 4,
    author: "Author 4",
    url: "https://example.com/photo4.jpg",
    download_url: "https://example.com/photo4.jpg",
    width: 300,
    height: 300,
    uniqueId: "unique4",
  },
];

vi.stubGlobal("fetch", vi.fn());

afterEach(() => {
  vi.resetAllMocks();
});

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

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

  test("removes photo correctly", async () => {
    vi.mocked(fetch).mockResolvedValue({
      json: () => Promise.resolve(mockPhotos),
    } as Response);
    const { result } = renderHook(() => usePhotos());

    await waitFor(() => {
      expect(result.current.photos).toHaveLength(2);
    });

    act(() => {
      const photoToRemove = result.current.photos[0].uniqueId;
      result.current.removePhoto(photoToRemove);
    });

    await waitFor(() => {
      expect(result.current.photos).toHaveLength(1);
      expect(result.current.photos[0].author).toBe("Author 2");
    });
  });

  test("loadMore increments page and fetches more photos", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPhotos),
      } as Response)
      .mockResolvedValueOnce({
        json: () => Promise.resolve(mockPhotosPage2),
      } as Response);

    const { result } = renderHook(() => usePhotos());

    await waitFor(() => {
      expect(result.current.photos).toHaveLength(2);
    });

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "https://picsum.photos/v2/list?page=2&limit=100",
      );
      expect(result.current.photos).toHaveLength(4);
    });
  });
});
