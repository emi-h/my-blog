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

export const Instagram: FC = (props) => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Props>(`/api/instagram`, fetcher);
  const instagramData = data?.media.data;
  // console.log(instagramData); //https://scontent.cdninstagram.com/v/t51.29350-15/282297267_1116057898989573_8080856797540806956_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=4QRioAkDEIIAX9VLsCZ&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng&oe=6380FE47

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
                // loader={myLoader}
                src={data.media_url}
                alt={data.caption}
                width={96}
                height={96}
              />
              {/* <li><a href="https://www.instagram.com/p/Cdzzn53hNjA/"><img alt="相棒です。値段も手頃で買ってよかった☺️
              #コーヒーメーカー" srcset="https://example.com/https://scontent.cdninstagram.com/v/t51.29350-15/282297267_1116057898989573_8080856797540806956_n.jpg?_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=4QRioAkDEIIAX9VLsCZ&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=AL-3X8kEAAAA&amp;oh=00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng&amp;oe=6380FE47?w=96&amp;q=75 1x, https://example.com/https://scontent.cdninstagram.com/v/t51.29350-15/282297267_1116057898989573_8080856797540806956_n.jpg?_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=4QRioAkDEIIAX9VLsCZ&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=AL-3X8kEAAAA&amp;oh=00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng&amp;oe=6380FE47?w=256&amp;q=75 2x" src="https://example.com/https://scontent.cdninstagram.com/v/t51.29350-15/282297267_1116057898989573_8080856797540806956_n.jpg?_nc_cat=100&amp;ccb=1-7&amp;_nc_sid=8ae9d6&amp;_nc_ohc=4QRioAkDEIIAX9VLsCZ&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=AL-3X8kEAAAA&amp;oh=00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng&amp;oe=6380FE47?w=256&amp;q=75" width="96" height="96" decoding="async" data-nimg="1" loading="lazy" style=""></a></li>
              <li><a href="https://www.instagram.com/p/Cdzzn53hNjA/"><img alt="相棒です。値段も手頃で買ってよかった☺️
              #コーヒーメーカー" srcset="/_next/image?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F282297267_1116057898989573_8080856797540806956_n.jpg%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3D8ae9d6%26_nc_ohc%3D4QRioAkDEIIAX9VLsCZ%26_nc_ht%3Dscontent.cdninstagram.com%26edm%3DAL-3X8kEAAAA%26oh%3D00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng%26oe%3D6380FE47&amp;w=96&amp;q=75 1x, /_next/image?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F282297267_1116057898989573_8080856797540806956_n.jpg%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3D8ae9d6%26_nc_ohc%3D4QRioAkDEIIAX9VLsCZ%26_nc_ht%3Dscontent.cdninstagram.com%26edm%3DAL-3X8kEAAAA%26oh%3D00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng%26oe%3D6380FE47&amp;w=256&amp;q=75 2x" src="/_next/image?url=https%3A%2F%2Fscontent.cdninstagram.com%2Fv%2Ft51.29350-15%2F282297267_1116057898989573_8080856797540806956_n.jpg%3F_nc_cat%3D100%26ccb%3D1-7%26_nc_sid%3D8ae9d6%26_nc_ohc%3D4QRioAkDEIIAX9VLsCZ%26_nc_ht%3Dscontent.cdninstagram.com%26edm%3DAL-3X8kEAAAA%26oh%3D00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng%26oe%3D6380FE47&amp;w=256&amp;q=75" width="96" height="96" decoding="async" data-nimg="1" loading="lazy" style="color: transparent;"></a></li> */}
              {/*                                      https://scontent.cdninstagram.com/v/t51.29350-15/282297267_1116057898989573_8080856797540806956_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=4QRioAkDEIIAX9VLsCZ&_nc_ht=scontent.cdninstagram.com&edm=AL-3X8kEAAAA&oh=00_AfADe42Jt8hSN07yaJHIDQmonJjudPfJEtOx3dMa7cIwng&oe=6380FE47 */}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
