import { render, screen } from "@testing-library/react";
import { ImageCard } from "./ImageCard";
import type { Photo } from "../../types/index";
import userEvent from "@testing-library/user-event";

const mockPhoto: Photo = {
  id: 1,
  author: "Test Author",
  url: "https://example.com/test.jpg",
  download_url: "https://example.com/test.jpg",
  width: 300,
  height: 300,
  uniqueId: "unique",
};

const renderImageCard = (onRemove = vi.fn()) => {
  render(<ImageCard photo={mockPhoto} onRemove={onRemove} />);
};

describe("ImageCard", () => {
  test("renders the image and author correctly", () => {
    renderImageCard();

    expect(screen.getByAltText("Imagen de Test Author")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
  });

  test("calls onRemove when the remove button is clicked", () => {
    const mockOnRemove = vi.fn();

    renderImageCard(mockOnRemove);

    screen.getByRole("button").click();

    expect(mockOnRemove).toHaveBeenCalledWith("unique");
  });

  test("calls onRemove when Enter is pressed", async () => {
    const mockOnRemove = vi.fn();

    renderImageCard(mockOnRemove);

    const button = screen.getByRole("button");
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(mockOnRemove).toHaveBeenCalledWith("unique");
  });

  test("calls onRemove when Space is pressed", async () => {
    const mockOnRemove = vi.fn();
    renderImageCard(mockOnRemove);

    screen.getByRole("button").focus();
    await userEvent.keyboard(" ");

    expect(mockOnRemove).toHaveBeenCalledWith("unique");
  });

  test("has correct aria-label", () => {
    renderImageCard();

    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Eliminar foto de Test Author",
    );
  });
});
