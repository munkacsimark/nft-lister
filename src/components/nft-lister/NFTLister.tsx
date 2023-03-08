import { FunctionComponent, useState } from "react";
import { createPortal } from "react-dom";
import useSWR from "swr";
import { getNFTsForCollection } from "../../utils/alchemy";
import type { GetNFTsForCollectionResponse } from "../../types/alchemy-responses";
import fetcher from "../../utils/fetcher";
import { formatTokenId } from "../../utils/format";
import NFTBox from "../nft-box/NFTBox";
import styles from "./NFTLister.module.css";
import Modal from "../modal/Modal";

type NFTListerProps = { contractAddress: string };

const NFTLister: FunctionComponent<NFTListerProps> = ({ contractAddress }) => {
  const [showModalId, setShowModalId] = useState<string | null>(null);

  const { data, error, isLoading } = useSWR<GetNFTsForCollectionResponse>(
    contractAddress ? getNFTsForCollection(contractAddress) : null,
    fetcher
  );

  const handleShowNFTDetailsModal = (tokenId: string) =>
    setShowModalId(tokenId);
  const handleCloseNFTDetailsModal = () => setShowModalId(null);

  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles.loading}`}>Loading...</div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${styles.error}`}>
        Error happened. 😢
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {data &&
        data.nfts.map((nft) => (
          <NFTBox
            key={nft.id.tokenId}
            id={formatTokenId(nft.id.tokenId)}
            media={nft.media[0].thumbnail}
            title={nft.title}
            onShowDetails={() => handleShowNFTDetailsModal(nft.id.tokenId)}
          />
        ))}
      <Modal isOpen={!!showModalId} onClose={handleCloseNFTDetailsModal}>
        {showModalId}
      </Modal>
    </div>
  );
};

export default NFTLister;
