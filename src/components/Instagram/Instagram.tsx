import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "src/components/Instagram/Instagram.module.css";
import { InstagramData } from "src/types/Instagram";
import useSWR from "swr";

type Props = {
  id: string;
  name: string;
  media: {
    data: InstagramData[];
  };
};

export const Instagram: FC = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Props>(`/api/instagram`, fetcher);
  const instagramData = data?.media.data;

  if (error) return <div>エラー</div>;
  if (!data && !error) return <div>ローディング中...</div>;
  if (!data) return <div>データがありません</div>;

  return (
    <ul className={styles.instagramList}>
      {instagramData?.map((data) => {
        return (
          <li key={data.id}>
            <Link href={data.permalink}>
              <Image
                src={data.media_url}
                alt={data.caption}
                fill
                sizes="96px"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
