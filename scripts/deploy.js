async function main() {
  const Delta = await hre.ethers.getContractFactory("Delta");
  const nft = await Delta.deploy();
  await nft.deployed();
  console.log("Delta deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
