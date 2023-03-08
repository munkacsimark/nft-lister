import { NftTokenType } from "alchemy-sdk";

const apiUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${
  import.meta.env.VITE_ALCHEMY_API_KEY
}`;

const getNFTsForCollection = (contractAddress: string, startToken?: string) =>
  `${apiUrl}/getNFTsForCollection?contractAddress=${contractAddress}&withMetadata=true${
    startToken ? `&startToken=${startToken}` : ""
  }`;

const getNFTMetadata = (
  contractAddress: string,
  tokenId: string,
  tokenType?: Omit<NftTokenType, "UNKNOWN">
) =>
  `${apiUrl}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenId}${
    tokenType ? `&tokenType=${tokenType}` : ""
  }`;

export { getNFTsForCollection, getNFTMetadata };
