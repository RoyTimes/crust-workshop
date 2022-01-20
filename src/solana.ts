import { randomBytes } from 'tweetnacl';
import nacl from 'tweetnacl';
const {Keypair} = require("@solana/web3.js");
import { u8aToHex } from '@polkadot/util'

import upload from './upload'
import pin from './pin'

const main = async () => {

  // 1. get authheader 

  const keypair = Keypair.generate();

  // get address
  const address = keypair.publicKey.toBase58();
  
  // get singature
  // solana/web3.js doesn't provide sign method, use the nacl instead since solana/web3.js depend on nacl as well
  const signature = nacl.sign.detached(Buffer.from(address), keypair.secretKey);
  const sig = u8aToHex(signature).substring(2);

  // Authorization: Bear <base64(ChainType-PubKey:SignedMsg)>
  // compile a authHeader
  const authHeaderRaw = `solana-${address}:${sig}`;
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
