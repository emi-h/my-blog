import Link from "next/link";
import { FC } from "react";
import { Breadcrumb } from "src/components/Breadcrumb/Breadcrumb";
import { CommonMeta } from "src/components/CommonMeta/CommonMeta";
import styles from "src/styles/PrivacyPolicy.module.css";

const privacyPolicy: FC = () => {
  return (
    <>
      <CommonMeta title="Privacy policy" description="プライバシーポリシー" />
      <div className={styles.privacyPolicy}>
        <div className={styles.container}>
          <Breadcrumb pageTitle="Privacy policy" />
          <h1>Privacy policy</h1>
          <section>
            <h2>個人情報の利用目的</h2>
            <p>
              https://3things.work/(以下当ブログ)では、メールでのお問い合わせ、メールマガジンへの登録などの際に、名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただく場合がございます。
            </p>
            <p>
              これらの個人情報は質問に対する回答や必要な情報を電子メールなどをでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
            </p>
          </section>
          <section>
            <h2>個人情報の第三者への開示</h2>
            <p>
              当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
            </p>
            <ul>
              <li>本人のご了解がある場合</li>
              <li>法令等への協力のため、開示が必要となる場合</li>
            </ul>
            <p>個人情報の開示、訂正、追加、削除、利用停止</p>
            <p>
              ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
            </p>
          </section>
          <section>
            <h2>アクセス解析ツールについて</h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
              このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
              <Link href="https://marketingplatform.google.com/about/analytics/terms/jp/">
                ここ
              </Link>
              をクリックしてください。
            </p>
          </section>
          <section>
            <h2>免責事項</h2>
            <p>
              当サイトで掲載している画像の著作権・肖像権等は各権利所有者に帰属致します。権利を侵害する目的ではございません。記事の内容や掲載画像等に問題がございましたら、各権利所有者様本人が直接メールでご連絡下さい。確認後、対応させて頂きます。
            </p>
            <p>
              当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
            </p>
            <p>
              当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
            </p>
            <p>
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default privacyPolicy;
