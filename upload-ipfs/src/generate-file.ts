import { randomBytes } from "tweetnacl";
import { u8aToHex } from "@polkadot/util";

const content = randomBytes(5000);
console.log(u8aToHex(content));
