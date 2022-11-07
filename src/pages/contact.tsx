import styles from "src/styles/Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <div className={styles.container}>
        <div>
          <iframe
            className={styles.iframe}
            height="734px"
            src="https://www.noway-form.com/f/6e251ea0-c037-4815-b757-17640222d7d2/embed"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
