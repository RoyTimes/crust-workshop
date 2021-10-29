import { randomBytes } from 'tweetnacl';
import { KeyPair } from 'near-api-js';
import { baseEncode } from 'borsh';
import { u8aToHex } from '@polkadot/util'

import upload from './upload'
import pin from './pin'

const main = async () => {

  // 1. generate authHeader 
  const keyPair = KeyPair.fromRandom('ed25519');

  const addressRaw = keyPair.getPublicKey();

  const address = baseEncode(addressRaw.data);
  console.log(address);

  const sigRaw = keyPair.sign(Buffer.from(address));
  const sig = u8aToHex(sigRaw.signature).substring(2);

  const authHeaderRaw = `near-${address}:${sig}`;

  console.log(authHeaderRaw);
  const authHeader = Buffer.from(authHeaderRaw).toString('base64');


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
