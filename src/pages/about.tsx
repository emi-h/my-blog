import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import styles from "src/styles/About.module.css";

const About = () => {
  return (
    <>
      <CommonMeta title="About" description="自己紹介とサイトについて" />
      <div className={styles.about}>
        <div className={styles.container}>
          <Breadcrumb pageTitle="About me" />
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
              <h3>SNS</h3>
              <ul className={styles.snsList}>
                <li>
                  Twitter:&nbsp;&nbsp;
                  <Link href="https://twitter.com/emi11882681">
                    @emi11882681
                  </Link>
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
            </div>
          </section>
          <section>
            <div className={styles.aboutSiteArea}>
              <h2>About this website</h2>
              <p>
                Next.js v13
                <br />
                microCMS
                <br />
                TypeScript <br />
                Vercel
              </p>
              <h3>機能</h3>
              <ul className={styles.featuresList}>
                <li>Static Site Generation</li>
                <li>カテゴリ機能</li>
                <li>ページネーション(ブログページ)</li>
                <li>検索機能(ブログページ)</li>
                <li>目次(ブログ詳細ページ)</li>
                <li>お問合せフォーム : Noway form</li>
                <li>404ページ</li>
                <li>管理画面プレビュー</li>
                <li>サイトマップ</li>
                <li>RSS</li>
                <li>Googleタグマネージャー</li>
                <li>Instagram投稿掲載</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
