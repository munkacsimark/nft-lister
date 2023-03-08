import { FunctionComponent } from "react";
import Button from "../button/Button";
import styles from "./NFTBox.module.css";

type NFTBoxProps = {
  id: string;
  title: string;
  media?: string;
  onShowDetails: () => void;
};

const NFTBox: FunctionComponent<NFTBoxProps> = ({
  id,
  title,
  media,
  onShowDetails,
}) => {
  return (
    <div className={styles.box}>
      {media && <img src={media} className={styles.media} />}
      <p className={styles.detail}>#{id}</p>
      {title && <p className={styles.detail}>Title: {title}</p>}
      <Button
        variant="secondary"
        onClick={() => onShowDetails()}
        className={styles.button}
      >
        Show details
      </Button>
    </div>
  );
};

export default NFTBox;
