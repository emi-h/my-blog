import Head from "next/head";
import { Footer } from "src/components/Footer/Footer";
import { Header } from "src/components/Header/Header";
import { client } from "src/libs/microCMSClient";
import styles from "src/styles/Home.module.css";

export default function Home({ blog }) {
  console.log(blog);

  return (
    <div className={styles.container}>
      <Head>
        <title>Emi&apos;s blog | Top</title>
        <meta name="description" content="Emi's Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>なんで</main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};
