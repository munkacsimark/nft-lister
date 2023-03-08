import { FunctionComponent, useState } from "react";
import ThemeSwitcher from "./components/theme-switcher/ThemeSwitcher";
import AddressSearch from "./components/address-search/AddressSearch";
import NFTLister from "./components/nft-lister/NFTLister";
import styles from "./App.module.css";

const App: FunctionComponent = () => {
  const [address, setAddress] = useState<string>();

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>NFT Lister</h1>
        <ThemeSwitcher className={styles.themeSwitcher} />
      </header>
      <span className={styles.info}>
        List NFTs from an Ethereum contract address.
      </span>
      <AddressSearch onList={setAddress} />
      {address && <NFTLister contractAddress={address} />}
    </div>
  );
};

export default App;
