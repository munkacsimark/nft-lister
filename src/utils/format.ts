import web3 from "web3";

const formatTokenId = (tokenId: string) =>
  web3.utils.isHex(tokenId)
    ? web3.utils.hexToNumber(tokenId).toString()
    : tokenId;

export { formatTokenId };
