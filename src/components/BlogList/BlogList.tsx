import dayjs from "dayjs";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { AiFillHeart } from "react-icons/ai";
import styles from "src/components/BlogList/BlogList.module.css";
import { Blog } from "src/types/Blog";

type Props = MicroCMSListResponse<Blog>;

export const BlogList: FC<{ blogData: Props }> = ({ blogData }) => {
  if (blogData.contents.length === 0) {
    return <div>記事は存在しません</div>;
  }
  return (
    <ul className={styles.grid}>
      {blogData.contents.map((data) => {
        return (
          <li className={styles.card} key={data.id}>
            <Link href={`/blog/${data.id}`}>
              <div className={styles.card_img}>
                <Image
                  src={data.portfolio_img.url}
                  alt="Picture of the author"
                  fill
                  sizes="100%"
                />
              </div>
              <div className={styles.card_description}>
                <div className={styles.card_content}>
                  <p className={styles.card_categories}>
                    <span>{data.category.category}</span>
                  </p>
                  <p className={styles.card_title}>{data.title}</p>
                  <div className={styles.like}>
                    <span>
                      <AiFillHeart />
                    </span>
                    <span>10</span>
                  </div>
                  <time dateTime={data.createdAt} className={styles.card_date}>
                    {dayjs(data.createdAt).format("YYYY.MM.DD")}
                  </time>
                </div>
                {/* <p className={styles.card_tags}>
                          <span>タグ</span>
                          <span>タグ</span>
                          <span>タグ</span>
                        </p> */}
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
