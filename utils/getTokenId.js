const alch = require('alchemy-sdk');
require('dotenv').config();

const alchemy = new alch.Alchemy({ apiKey: process.env.ALCHEMY_MUMBAI_KEY, network: alch.Network.MATIC_MUMBAI, maxRetries:30 });

async function fetchForAddress(address) {
  const collection = [];
  const nfts = await alchemy.nft.getNftsForOwner(address);
  for (let element of nfts.ownedNfts) {
    collection.push(await alchemy.nft.getNftMetadata(element.contract.address, element.tokenId));
  }
  return collection;
};

exports.getTokenId = async (address, contract) => {
  const datas = await fetchForAddress(address);
  for (let data of datas) {
    if (data.contract.address === contract.toLowerCase()) {
      return data.tokenId;
    }
  }
};

exports.getTokenId1 = async (address, contract) => {
  let datas = [];
  let token = null;
  while (!token) {
    datas = await fetchForAddress(address);
    for (let data of datas) {
      if (data.contract.address === contract.toLowerCase()) {
        token = data.tokenId;
      }
    }
  }
  return token;
}

exports.getData=async (address,contract)=>{
  const nfts=await alchemy.nft.getNftsForOwner(address);
  console.log(contract.toLowerCase());
  for(let nft of nfts.ownedNfts){
    console.log(nft.contract.address);
    if(nft.contract.address===contract.toLowerCase()){
      console.log(nft.tokenId);
      return nft.tokenId;
    }
  }
}