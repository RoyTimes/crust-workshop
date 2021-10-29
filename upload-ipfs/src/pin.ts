import got from 'got';

const ipfsPinningService = 'https://pin.crustcode.com/psa';

const pin = async(authHeader: string, cid: string) => {
  if (cid.length !== 46) {
    throw new Error('CID len err');
  }

  const { body } = await got.post(
    ipfsPinningService + '/pins',
    {
      headers: {
        authorization: 'Bearer ' + authHeader,
      },
      json: {
        cid: cid,
        name: 'heco-live-file.txt'
      }
    }
  )
  return body;
}
export default pin;


// const main = async() => {
//   await pin(
//     'c3ViLTVGMmtpU1V4VTNja3p0bVZ0MWFHV1lTV2ZWOTNwN2tLSHFaZTlqVVd3bmRiMTFTbjoweGY2YmM5MGMxMjAwZTU0ODAxMTg2ODU2MDI2NjNmZjY4Y2I4MTgxZTE5MGNlMWEwOTJmMjI2OGFhYjM0N2RjZmQyY2U1MzQwOTRmYTY1MDU0ZDBlMTMzMTk5ZTc4YTcxZjg3Nzg2ZjU3NzMzYzI2OWE0ZWUyMTFlNGRhMDk4OTA5', 
//     'QmeotSG6pi9u8mDEjoVTUEd2j84KoMn5TfJWmmfNfWycHx'
//   );
// }

// main().catch(err => {
//   console.error(err);
// })
