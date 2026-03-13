import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.scss";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handdleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handdleScroll);
    return () => window.removeEventListener("scroll", handdleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={styles.scrollToTop}
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          aria-label="Volver arriba"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
