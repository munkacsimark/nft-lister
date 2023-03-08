import { NftTokenType } from "alchemy-sdk";

// Declaring types here, because there is a difference between SDK and API

type GetNFTsForCollectionResponse = {
  nextToken?: string;
  nfts: {
    contract: {
      address: string;
    };
    id: {
      tokenId: string;
      tokenMetadata: {
        tokenType: NftTokenType;
      };
    };
    title: string;
    description: string;
    tokenUri: {
      gateway: string;
      raw: string;
    };
    media: [
      {
        gateway: string;
        thumbnail: string;
        raw: string;
        format: string;
        bytes: number;
      }
    ];
    metadata: {
      image: string;
      attributes: {
        value: string;
        trait_type: string;
      }[];
    };
    timeLastUpdated: string;
    contractMetadata: {
      name: string;
      symbol: string;
      totalSupply: string;
      tokenType: NftTokenType;
      contractDeployer: string;
      deployedBlockNumber: number;
      openSea: {
        floorPrice: number;
        collectionName: string;
        safelistRequestStatus: string;
        imageUrl: string;
        description: string;
        externalUrl: string;
        twitterUsername: string;
        discordUrl: string;
        lastIngestedAt: string;
      };
    };
  }[];
};

type GetNFTMetadataResponse = {
  contract: {
    address: string;
  };
  id: {
    tokenId: string;
    tokenMetadata: {
      tokenType: NftTokenType;
    };
  };
  title: string;
  description: string;
  tokenUri: {
    gateway: string;
    raw: string;
  };
  media: {
    gateway: string;
    thumbnail: string;
    raw: string;
    format: string;
    bytes: number;
  }[];
  metadata: {
    name: string;
    image: string;
    attributes: {
      value: string;
      trait_type: string;
    }[];
  };
  timeLastUpdated: string;
  contractMetadata: {
    name: string;
    symbol: string;
    totalSupply: string;
    tokenType: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    openSea: {
      floorPrice: number;
      collectionName: string;
      safelistRequestStatus: string;
      imageUrl: string;
      description: string;
      externalUrl: string;
      twitterUsername: string;
      discordUrl: string;
      lastIngestedAt: string;
    };
  };
};

export type { GetNFTsForCollectionResponse, GetNFTMetadataResponse };
