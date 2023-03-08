const apiUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${
  import.meta.env.VITE_ALCHEMY_API_KEY
}`;

const getNFTsForCollection = (
  contractAddress: string,
  limit: number,
  startToken?: string
) =>
  `${apiUrl}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true${
    startToken ? `&startToken=${startToken}` : ""
  }${limit ? `&limit=${limit}` : ""}`;

export { getNFTsForCollection };
