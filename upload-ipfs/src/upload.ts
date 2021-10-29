import { create } from 'ipfs-http-client'

const ipfsGateway = 'https://crustwebsites.net';

const upload = async (authHeader: string, content: string) => {

  const ipfs = create({
    url: ipfsGateway + '/api/v0',
    headers: {
      authorization: 'Basic ' + authHeader
    }
  });
  const { cid } = await ipfs.add(content);

  return cid;
}

export default upload;
