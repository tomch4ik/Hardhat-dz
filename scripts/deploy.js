const hre = require("hardhat");

async function main() {
  const MediaStore = await hre.ethers.getContractFactory("MediaStore");
  const mediaStore = await MediaStore.deploy();

  await mediaStore.waitForDeployment();

  console.log("MediaStore deployed to:", await mediaStore.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});