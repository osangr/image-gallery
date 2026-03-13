import { fireEvent, render, screen } from "@testing-library/react";
import { ScrollToTop } from "./ScrollToTop";

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("does not render the button when at the top of the page", () => {
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });

    render(<ScrollToTop />);

    fireEvent.scroll(window);

    expect(screen.queryByLabelText("Volver arriba")).not.toBeInTheDocument();
  });

  test("renders the button when scrolled down", () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });

    render(<ScrollToTop />);

    fireEvent.scroll(window);

    expect(screen.getByLabelText("Volver arriba")).toBeInTheDocument();
  });

  test("when button is clicked, it scrolls to the top", () => {
    Object.defineProperty(window, "scrollY", { value: 400, writable: true });
    const scrollToMock = vi.fn();

    window.scrollTo = scrollToMock;

    render(<ScrollToTop />);
    fireEvent.scroll(window);

    const button = screen.getByLabelText("Volver arriba");
    fireEvent.click(button);

    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
