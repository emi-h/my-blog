import { ReactElement } from "react";
import { Footer } from "src/components/Footer/Footer";
import { Header } from "src/components/Header/Header";
import styles from "src/components/Layout/Layout.module.css";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
