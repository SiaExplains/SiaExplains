// import Image from 'next/image';
import SpanEffect from "@/components/ui/SpanEffect/SpanEffect";
import Card from "../components/ui/Card/Card";

import styles from "./page.module.scss";

export default function Home() {
  return (
        <Card topLessRadius={true} optionalClassName={styles.card}>
          <div className={styles.heroContainer}>
            <div className={styles.imageContainer}>
              <img src="/sia.png" alt="Logo" className={styles.siaImage}  />
            </div>
            <div className={styles.textContainer}>
              <h1 className={styles.title}>Hey, <SpanEffect>friends</SpanEffect> 👋</h1>
              <p className={styles.description}>
                I’m Sia. I’m a Software Engineer, Content Creator, Entrepreneur and <u>curious human</u>.
              </p>
            </div>
          </div>
        </Card>
  );
}
