import { ChangeEvent, FC, useState } from "react";
import styles from "src/components/SearchInput/SearchInput.module.css";

export const SearchInput: FC = () => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //     setSearch("");
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input placeholder="Search…" onChange={handleChange} value={search} />
      <button aria-label="Search">検索</button>
    </form>
  );
};
