# IPFS Web3 Auth Workshops by Crust Network 

How to painlessly use decentralized IPFS storage network?

## How to Run

1. Install Dependencies
```bash
yarn
```

2. Run with `ts-node`

```bash
ts-node xxx.ts
```

OR use `npx` if you do not have `ts-node` in your env:

```bash
npx ts-node xxx.ts
```

## Navigation Guide

```
.
├── README.md
├── package.json
├── src
│   ├── eth.ts #how to interact w/Crust from ETH-ish blockchains:Moonbeam/Heco/Eth/Polygon etc.
│   ├── live.ts #used for live coding on workshops ...
│   ├── near.ts #how to interact w/Crust from NEAR
│   ├── substrate.ts #how to interact w/Crust from Substrate based blockchains 
│   ├── pin.ts #helper function to PIN a CID to Crust Network
│   ├── upload.ts #helper function to upload a file to an IPFS node
│   └── util
│       ├── generate-file.ts #a useful script to generate a file of randomBytes
│       └── generate-seed.ts #a useful script to generate a brand new blockchain seed phrase
├── tree.txt
└── yarn.lock
```
