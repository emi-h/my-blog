import { FC } from "react";
import styles from "src/components/TableOfContents/TableOfContents.module.css";
import { Toc } from "src/types/Toc";

export const TableOfContents: FC<{ toc: Toc[] }> = ({ toc }) => {
  return (
    <div className={styles.toc}>
      <p className={styles.ttl}>目次</p>
      <ul>
        {toc.map((data) => (
          <li key={data.id}>
            <a href={`#${data.id}`}>{data.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
