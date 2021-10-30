import { mnemonicGenerate } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate();
console.log(`SEED = '${mnemonic}'`);
