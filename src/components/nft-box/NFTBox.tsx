import { FunctionComponent } from "react";
import Button from "../button/Button";
import styles from "./NFTBox.module.css";

type NFTBoxProps = {
  id: string;
  onShowDetails: () => void;
};

const NFTBox: FunctionComponent<NFTBoxProps> = ({ id, onShowDetails }) => {
  return (
    <div className={styles.box}>
      <p>ID: {id}</p>
      <Button variant="secondary" onClick={() => onShowDetails()}>
        Show details
      </Button>
    </div>
  );
};

export default NFTBox;
