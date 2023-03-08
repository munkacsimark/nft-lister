import { FunctionComponent, useState } from "react";
import useSWR from "swr";
import { getNFTsForCollection } from "../../utils/alchemy";
import type {
  GetNFTsForCollectionResponse,
  GetNFTsForCollectionResponseNFT,
} from "../../types/alchemy";
import fetcher from "../../utils/fetcher";
import { formatTokenId } from "../../utils/format";
import NFTBox from "../nft-box/NFTBox";
import Modal from "../modal/Modal";
import Button from "../button/Button";
import NFTDetails from "../nft-details/NFTDetails";
import type { NFTDetails as NFTDetailsType } from "../nft-details/NFTDetails";
import styles from "./NFTLister.module.css";

const reduceNFTDetails = ({
  id: {
    tokenId,
    tokenMetadata: { tokenType },
  },
  title,
  description,
  media,
  metadata: { attributes },
}: GetNFTsForCollectionResponseNFT) => ({
  tokenId: formatTokenId(tokenId),
  tokenType,
  title,
  description,
  media: media.map(({ thumbnail }) => thumbnail),
  attributes,
});

type NFTListerProps = { contractAddress: string };

const NFTLister: FunctionComponent<NFTListerProps> = ({ contractAddress }) => {
  const [selectedNFT, setSelectedNFT] = useState<NFTDetailsType | null>(null);

  const { data, error, isLoading } = useSWR<GetNFTsForCollectionResponse>(
    contractAddress ? getNFTsForCollection(contractAddress) : null,
    fetcher
  );

  const handleShowNFTDetailsModal = (nftDetails: NFTDetailsType) =>
    setSelectedNFT(nftDetails);
  const handleCloseNFTDetailsModal = () => setSelectedNFT(null);

  const handleOpenSeaOpen = () => {
    if (!selectedNFT) {
      return;
    }

    const openSeaUrl = "https://opensea.io/assets/ethereum/";
    window.open(
      `${openSeaUrl}${contractAddress}/${selectedNFT.tokenId}`,
      "_blank",
      "noreferrer"
    );
  };

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
        data.nfts
          .map((nft) => reduceNFTDetails(nft))
          .map((nftDetails) => (
            <NFTBox
              key={nftDetails.tokenId}
              id={nftDetails.tokenId}
              media={nftDetails.media[0]}
              title={nftDetails.title}
              onShowDetails={() => handleShowNFTDetailsModal(nftDetails)}
            />
          ))}
      <Modal isOpen={!!selectedNFT} onClose={handleCloseNFTDetailsModal}>
        {selectedNFT && (
          <>
            <NFTDetails nftDetails={selectedNFT} />
            <Button
              className={styles.buyButton}
              onClick={() => handleOpenSeaOpen()}
            >
              Buy on OpenSea
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NFTLister;
