import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import styles from "./App.module.scss";

function App() {
  return (
    <>
      <main>
        <h1 className={styles.title}>Image Gallery</h1>

        <ImageGallery />
      </main>
    </>
  );
}

export default App;
