import web3 from "web3";

const formatTokenId = (tokenId: string) => {
  try {
    return web3.utils.isHex(tokenId)
      ? web3.utils.hexToNumber(tokenId).toString()
      : tokenId;
  } catch (error) {
    console.log(`Error while formatting id: ${tokenId}`, error);
    return tokenId;
  }
};

export { formatTokenId };
