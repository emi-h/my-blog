import { ComponentProps, FC } from "react";
import styles from "src/components/BtnMenu/BtnMenu.module.css";

export const BtnMenu: FC<{
  handleClick: ComponentProps<"button">["onClick"];
  menu: boolean;
}> = ({ handleClick, menu }) => {
  const OpenStyle = menu ? styles.open : undefined;

  return (
    <button className={`${styles.btn} ${OpenStyle}`} onClick={handleClick}>
      <span></span>
    </button>
  );
};
