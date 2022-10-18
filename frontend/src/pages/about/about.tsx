import React from "react";

import styles from "./about.module.css";

export const About: React.FC = () => {
  return (
    <main className={styles.about}>
      <h1 data-testid="about">О магазине</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim dapibus, ultrices nunc nec, aliquam dolor. Nunc
        ullamcorper dolor porttitor massa bibendum accumsan. Maecenas viverra sem quis urna finibus, at interdum libero viverra. Donec
        suscipit tincidunt libero, malesuada viverra tellus mollis sed. Nunc et velit ut lectus euismod lacinia sit amet vel massa.
        Suspendisse vitae eros vehicula, vulputate ligula non, vestibulum justo. Proin posuere quam hendrerit nulla vulputate gravida.
        Mauris dignissim sodales nisl sed posuere. Ut vitae pretium urna. Nunc cursus est vel quam finibus commodo. Phasellus metus
        turpis, semper a placerat eget, tristique a eros. Nam pellentesque libero in metus tristique vehicula. Donec semper quis tellus
        at accumsan. Suspendisse dapibus, tellus non maximus varius, dolor odio efficitur augue, sit amet scelerisque ex mauris et
        dolor. Sed a lectus in mauris vulputate eleifend eu nec metus. Suspendisse sit amet lacinia odio. Aliquam et ligula vel mauris.
      </p>
    </main>
  );
};
