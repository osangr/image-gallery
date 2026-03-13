import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <main>
        <h1 className={styles.title}>Image Gallery</h1>

        <ImageGallery />
        <ScrollToTop />
      </main>
    </>
  );
}

export default App;
