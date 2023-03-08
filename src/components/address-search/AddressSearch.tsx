import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { validateAddress } from "../../utils/validation";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from "./AddressSearch.module.css";

type AddressSearchProp = {
  onList: (address: string) => void;
};

const AddressSearch: FunctionComponent<AddressSearchProp> = ({ onList }) => {
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const address = formData.get("email")!.toString();

    if (!validateAddress(address.toString())) {
      setIsError(true);
      return;
    }

    onList(address);
  };

  const handleInputChange = () => {
    if (!isError) {
      return;
    }

    setIsError(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          type="search"
          name="email"
          required
          onChange={handleInputChange}
        />
        <Button type="submit">List NFTs</Button>
      </form>
      {isError && (
        <strong className={styles.error}>Invalid ethereum address</strong>
      )}
    </>
  );
};

export default AddressSearch;
