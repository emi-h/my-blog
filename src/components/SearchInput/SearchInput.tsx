import { MicroCMSListResponse } from "microcms-js-sdk";
import { ComponentProps, Dispatch, FC, SetStateAction } from "react";
import styles from "src/components/SearchInput/SearchInput.module.css";
import { Blog } from "src/types/Blog";

export const SearchInput: FC<{
  setSearchData: Dispatch<
    SetStateAction<MicroCMSListResponse<Blog> | undefined>
  >;
}> = ({ setSearchData }) => {
  const handleSubmit: ComponentProps<"form">["onSubmit"] = async (e) => {
    e.preventDefault();
    const q = e.currentTarget.query.value;
    const data = await fetch("/api/search", {
      body: JSON.stringify({ q }),
      headers: { "Content-type": "application/json" },
      method: "POST",
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearchData(json);
  };

  const handleclick: ComponentProps<"button">["onClick"] = () => {
    setSearchData(undefined);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input type="text" name="query" placeholder="検索ワード" />
      <button aria-label="Search">検索</button>
      <button type="reset" aria-label="reset" onClick={handleclick}>
        リセット
      </button>
    </form>
  );
};
