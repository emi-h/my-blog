import Link from "next/link";
import styles from "src/styles/404.module.css";

const Custom404 = () => {
  return (
    <>
      <main className={styles.main}>
        <p>ページがありません。</p>
        <br />
        <br />
        <p>
          <Link href="/">トップページへ戻る</Link>
        </p>
      </main>
    </>
  );
};
export default Custom404;
