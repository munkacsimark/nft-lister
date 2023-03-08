import { FunctionComponent, useState } from "react";
import AddressSearch from "./components/address-search/AddressSearch";
import NFTLister from "./components/nft-lister/NFTLister";

const App: FunctionComponent = () => {
  const [address, setAddress] = useState<string>();
  return (
    <>
      <AddressSearch onList={setAddress} />
      {address && <NFTLister contractAddress={address} />}
    </>
  );
};

export default App;
