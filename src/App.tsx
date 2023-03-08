import { FunctionComponent, useState } from "react";
import AddressSearch from "./components/address-search/AddressSearch";

const App: FunctionComponent = () => {
  const [a, setA] = useState<string>();
  return (
    <>
      <AddressSearch onList={setA} />
      <div>{a}</div>
    </>
  );
};

export default App;
