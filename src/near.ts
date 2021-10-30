import { randomBytes } from 'tweetnacl';
import { KeyPair } from 'near-api-js';
import { baseEncode } from 'borsh';
import { u8aToHex } from '@polkadot/util'

import upload from './upload'
import pin from './pin'

const main = async () => {

  // 1. get authheader 

  const keyPair = KeyPair.fromRandom('ed25519');

  // get address
  const addressRaw = keyPair.getPublicKey().toString();
  const address = addressRaw.substring(8);
  
  // get singature 
  const {signature} = keyPair.sign(Buffer.from(address));
  const sig = u8aToHex(signature).substring(2);

  // Authorization: Bear <base64(ChainType-PubKey:SignedMsg)>
  // compile a authHeader
  const authHeaderRaw = `near-${address}:${sig}`;
  const authHeader = Buffer.from(authHeaderRaw).toString('base64');

  // 2. post files onto IPFS/Crust
  const content = randomBytes(5000);
  const contentHex = u8aToHex(content);

  const cid = await upload(authHeader, contentHex);
  console.log(cid);

  const result = await pin(authHeader, cid.toString());
  console.log(JSON.parse(result));
}

main().catch(err => {
  console.error(err);
});
