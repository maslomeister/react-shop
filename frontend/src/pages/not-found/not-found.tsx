import React from "react";

import styles from "./not-found.module.css";

export const NotFound: React.FC = () => {
  return (
    <main className={styles["not-found"]}>
      <h1 data-testid="404">404</h1>
      <h3>Страница не найден</h3>
    </main>
  );
};
