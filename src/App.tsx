import { FunctionComponent, useState } from "react";
import AddressSearch from "./components/address-search/AddressSearch";
import NFTLister from "./components/nft-lister/NFTLister";
import styles from "./App.module.css";

const App: FunctionComponent = () => {
  const [address, setAddress] = useState<string>();

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.title}>NFT Lister</h1>
      <span className={styles.info}>
        List NFTs from an Ethereum contract address.
      </span>
      <AddressSearch onList={setAddress} />
      {address && <NFTLister contractAddress={address} />}
    </div>
  );
};

export default App;
