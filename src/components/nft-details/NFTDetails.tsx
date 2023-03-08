import { FunctionComponent } from "react";
import type { NftTokenType } from "alchemy-sdk";
import styles from "./NFTDetails.module.css";

type NFTDetails = {
  tokenId: string;
  tokenType: NftTokenType;
  title: string;
  description: string;
  media: string[];
  attributes: {
    value: string;
    trait_type: string;
  }[];
};

type NFTDetailsProps = {
  nftDetails: NFTDetails;
};

const NFTDetails: FunctionComponent<NFTDetailsProps> = ({
  nftDetails: { tokenId, tokenType, title, description, media, attributes },
}) => {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.info}>
        <p>#{tokenId}</p>
        <p>Type: {tokenType}</p>
      </div>
      {description && (
        <>
          <h3>Description</h3>
          <div className={styles.description}>{description}</div>
        </>
      )}
      {!!media.length && (
        <>
          <h3>Media</h3>
          <div className={styles.media}>
            {media.map((url) => (
              <img src={url} className={styles.mediaItem} />
            ))}
          </div>
        </>
      )}
      {attributes && (
        <>
          <h3>Attributes</h3>
          <table className={styles.attributes}>
            {attributes.map((attribute) => (
              <tr>
                <td className={styles.traitType}>{attribute.trait_type}:</td>
                <td>{attribute.value}</td>
              </tr>
            ))}
          </table>
        </>
      )}
    </div>
  );
};

export default NFTDetails;
export type { NFTDetails };
