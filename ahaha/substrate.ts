import {randomBytes} from 'tweetnacl'
import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';

import pin from './pin'
import upload from './upload'

require('dotenv').config()

const main = async() => {

  // 1. get a signature of an addr
  
  // 1.1 get the seed phrase
  const seed = process.env.SEED;
  if (!seed) {
    throw new Error("seed phrase not found");
  }

  // 1.2 get a keypair
  const keyring = new Keyring();
  const pair = keyring.addFromUri(seed as string);

  // 1.3 get the signature of the addr
  const sigRaw = pair.sign(pair.address);
  const sig = u8aToHex(sigRaw);

  // 1.4 compile the sig to autHeader
  const authHeaderRaw = `sub-${pair.address}:${sig}`;
  const authHeader = Buffer.from(authHeaderRaw).toString('base64');

  // 2. post file to a Web3 Auth enabled gateway

  // 2.1 generate some content
  const content = randomBytes(1000);

  // 2.2 upload to an IPFS node
  const cid = await upload(authHeader, u8aToHex(content));

  if (!cid) {
    throw new Error('upload failed');
  }

  // 2.3 pin the file
  const pinResult = await pin(authHeader, cid.toString());

  console.log('pinning status', pinResult);
}

main().catch(err => {
  console.error(err);
});
