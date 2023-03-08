import { FunctionComponent, useMemo, useState } from "react";
import useSWRInfinite from "swr/infinite";
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

const LISTER_LIMIT = 20;

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
  rawTokenId: tokenId, // needed only for React key
  tokenId: formatTokenId(tokenId),
  tokenType,
  title,
  description,
  media: media.reduce<string[]>((accumulator, { thumbnail }) => {
    return thumbnail ? [...accumulator, thumbnail] : accumulator;
  }, []),
  attributes,
});

type NFTListerProps = { contractAddress: string };

const NFTLister: FunctionComponent<NFTListerProps> = ({ contractAddress }) => {
  const [selectedNFT, setSelectedNFT] = useState<NFTDetailsType | null>(null);

  const getKey = useMemo(
    () =>
      (pageIndex: number, previousPageData: GetNFTsForCollectionResponse) => {
        if (previousPageData && !previousPageData.nfts) return null;

        // first page, we don't have `previousPageData`
        if (pageIndex === 0)
          return getNFTsForCollection(contractAddress, LISTER_LIMIT);

        return getNFTsForCollection(
          contractAddress,
          LISTER_LIMIT,
          previousPageData.nextToken
        );
      },
    [contractAddress]
  );

  const { data, error, isLoading, size, setSize } =
    useSWRInfinite<GetNFTsForCollectionResponse>(getKey, fetcher);

  const isLoadingMore =
    isLoading || (size > 0 && data && data[size - 1] === undefined);

  const isReachingEnd =
    data?.[0]?.nfts.length === 0 ||
    (data && data[data.length - 1]?.nfts.length < LISTER_LIMIT);

  const handleShowNFTDetailsModal = (nftDetails: NFTDetailsType) =>
    setSelectedNFT(nftDetails);
  const handleCloseNFTDetailsModal = () => setSelectedNFT(null);

  const handleLoadMore = () => {
    setSize(size + 1);
  };

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
    <>
      <div className={styles.container}>
        <div className={styles.nftList}>
          {data &&
            data.map(({ nfts }) =>
              nfts
                .map((nft) => reduceNFTDetails(nft))
                .map((nftDetails) => (
                  <NFTBox
                    key={nftDetails.rawTokenId}
                    id={nftDetails.tokenId}
                    media={nftDetails.media[0]}
                    title={nftDetails.title}
                    onShowDetails={() => handleShowNFTDetailsModal(nftDetails)}
                  />
                ))
            )}
        </div>
        {!isReachingEnd && (
          <Button
            onClick={handleLoadMore}
            className={styles.loadMoreButton}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Loading..." : "Load more"}
          </Button>
        )}
      </div>
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
    </>
  );
};

export default NFTLister;
