This project lists NFTs from given Ethereum address. The preloaded address fetches [BAYC](https://opensea.io/collection/boredapeyachtclub) NFTs but you can search for other contract addresses eg. on [OpenSea](https://opensea.io/). The app is fully responsive, based on `rem` units. Handles `dark` and `light` themes. Implements infinite scroll with a "Load More" button.

For development:
- You will need an [Alchemy](https://www.alchemy.com/) account and an API key.
- `npm install`
- Create a `.env.local` based on `.env.example` and put your API key there.
- `npm run dev`

Tech stack:
- [Vite](https://vitejs.dev/)
- React + TypeScript + CSS modules
- [SWR](https://swr.vercel.app/) for fetching
- [Alchemy](https://docs.alchemy.com/) for getting NFT data

You can try the deployed app here: https://glittering-faun-55d932.netlify.app
