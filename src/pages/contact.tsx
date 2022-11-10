import Head from "next/head";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import styles from "src/styles/Contact.module.css";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact | console.log(emi);</title>
        <meta name="description" content="お問い合わせページ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.contact}>
        <div className={styles.container}>
          <Breadcrumb pageTitle="Contact" />
          <div className={styles.formArea}>
            <iframe
              className={styles.iframe}
              height="734px"
              src="https://www.noway-form.com/f/6e251ea0-c037-4815-b757-17640222d7d2/embed"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
