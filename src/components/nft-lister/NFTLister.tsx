import { FunctionComponent } from "react";
import useSWR from "swr";
import { getNFTsForCollection } from "../../utils/alchemy";
import type { GetNFTsForCollectionResponse } from "../../types/alchemy-responses";
import fetcher from "../../utils/fetcher";
import NFTBox from "../nft-box/NFTBox";
import styles from "./NFTLister.module.css";

type NFTListerProps = { contractAddress: string };

const NFTLister: FunctionComponent<NFTListerProps> = ({ contractAddress }) => {
  const { data, error, isLoading } = useSWR<GetNFTsForCollectionResponse>(
    false ? getNFTsForCollection(contractAddress) : null,
    fetcher
  );

  const handleShowNFTDetails = (tokenId: string) => {
    console.log(contractAddress, tokenId);
  };

  if (isLoading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error happened</div>;
  }

  return (
    <div className={styles.container}>
      {data &&
        data.nfts.map((nft) => (
          <NFTBox
            key={nft.id.tokenId}
            id={nft.id.tokenId}
            onShowDetails={() => handleShowNFTDetails(nft.id.tokenId)}
          />
        ))}
    </div>
  );
};

export default NFTLister;
