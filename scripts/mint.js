const controller = require('../database/controller');
require("dotenv").config();
const utils = require('../utils/getTokenId');
const ethers = require('ethers');
const contract = require("../artifacts/contracts/Delta.sol/Delta.json");

async function main() {
  const provider = new ethers.providers.AlchemyProvider('maticmum', process.env.ALCHEMY_MUMBAI_KEY);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = contract.abi;
  const myNftContract = new ethers.Contract(process.env.CONTRACT, abi, signer);
  const email = process.env.EMAIL;
  const wallet = process.env.USERWALLET;
  const binLevel=1;
  const level=parseInt(binLevel-1,2);
  let nftTxn = await myNftContract.safeMint(wallet,level);
  await nftTxn.wait();
  const id = await utils.getData(wallet,process.env.CONTRACT);
  await controller.addUser(id, wallet, email,binLevel);
  console.log("Minting is complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
