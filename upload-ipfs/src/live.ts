import { randomBytes } from 'tweetnacl';
import {ethers} from 'ethers';
import { u8aToHex } from '@polkadot/util';
require('dotenv').config()

import upload from './upload'
import pin from './pin'


const main = async () => {

  // 1. generate an Auth Header

  // get the seed phrase
  const seed = process.env.SEED;
  if (!seed) {
    throw new Error('seed not found');
  }

  // generate a signature
  const keypair = ethers.Wallet.fromMnemonic(seed);

  // console.log(keypair.address);

  const sig = await keypair.signMessage(keypair.address);

  // console.log("signature", sig);

  // compile the auth header
  // Authorization: Bear <base64(ChainType-PubKey:SignedMsg)>
  const authHeaderRaw = `eth-${keypair.address}:${sig}`;
  // console.log("authHeaderRaw", authHeaderRaw);

  const authHeader = Buffer.from(authHeaderRaw).toString('base64');

  // console.log('authHeader', authHeader);

  // 2. post some content to the IPFS network 

  const content = randomBytes(5000);
  const contentHex = u8aToHex(content);

  const cid = await upload(authHeader, contentHex);
  console.log("CID", cid);

  const result = await pin(authHeader, cid.toString());

  console.log(JSON.parse(result));
}

main().catch(err => {
  console.error(err);
});
