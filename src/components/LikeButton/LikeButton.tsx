import { FC, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import styles from "src/components/LikeButton/LikeButton.module.css";

export const LikeButton: FC = () => {
  const [like, setLike] = useState({ count: 0, liked: false });

  const onClick = () => {
    setLike({
      count: like.count + (like.liked ? -1 : 1),
      liked: !like.liked,
    });
  };

  return (
    <>
      <div className={styles.box}>
        <p className={styles.title}>
          この記事が良かったと思ったらアイコンをクリック！
        </p>
        <button className={styles.button} onClick={onClick}>
          <span className={like.liked ? styles.iconLiked : ""}>
            <AiFillHeart />
          </span>
        </button>
        <span>{like.count}</span>
        {like.liked ? (
          <span className={styles.thanksMessage}> Thanks! :)</span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
