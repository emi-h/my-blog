import Image from "next/image";
import Link from "next/link";
import styles from "src/styles/About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.container}>
        <section>
          <h2>About me</h2>
          <div className={styles.myImageArea}>
            <div className={styles.myImage}>
              <Image src="/eric.png" alt="emi" width={200} height={200} />
            </div>
            <p>emi</p>
          </div>
          <div className={styles.myIntro}>
            <p>2020年〜フリーランスでコーダーをしています。</p>
            <p>
              2022年5月頃からReact.jsを学び始め、
              <br />
              このサイトを制作しました。
            </p>
          </div>
        </section>
        <section className={styles.sns}>
          <h2>SNSなど</h2>
          <ul>
            <li>
              Twitter:&nbsp;&nbsp;
              <Link href="https://twitter.com/emi11882681">@emi11882681</Link>
            </li>
            <li>
              Github:&nbsp;&nbsp;
              <Link href="https://github.com/emi-h">emi-h</Link>
            </li>
            <li>
              Mail:&nbsp;&nbsp;
              <Link href="mailto:emi.programming@gmail.com">
                emi.programming@gmail.com
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
