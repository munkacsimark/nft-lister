import { FunctionComponent, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
};

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  children,
  onClose,
}) => {
  return isOpen
    ? createPortal(
        <div className={styles.container}>
          <div className={styles.modal}>
            <header className={styles.header}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                width="40"
                onClick={onClose}
              >
                <path
                  d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"
                  fill={
                    window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "#eaeaea"
                      : "#111"
                  }
                />
              </svg>
            </header>
            <div className={styles.content}>{children}</div>
          </div>
          <div className={styles.backdrop} onClick={() => onClose()} />
        </div>,

        document.getElementById("modal")!
      )
    : null;
};

export default Modal;
