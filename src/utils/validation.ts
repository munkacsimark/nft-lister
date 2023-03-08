import web3 from "web3";

const validateAddress = (address: string) => web3.utils.isAddress(address);

export { validateAddress };
