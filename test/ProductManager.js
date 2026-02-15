import { expect } from "chai";
import hre from "hardhat";
import { getAddress } from "viem";

describe("ProductManager", function () {
  async function deployProductManagerFixture() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();
    const productManager = await hre.viem.deployContract("ProductManager");
    const publicClient = await hre.viem.getPublicClient();
    return { productManager, owner, otherAccount, publicClient };
  }

  it("should add a product and store all details", async function () {
    const { productManager, owner } = await deployProductManagerFixture();
    const name = "Blockchain Phone";
    const desc = "A secure smartphone for Web3";
    const img = "https://example.com/phone.png";
    await productManager.write.addProduct([name, desc, img]);
    const products = await productManager.read.getAllProducts();
    const p = products[0];
    expect(products.length).to.equal(1);
    expect(p.name).to.equal(name);
    expect(p.description).to.equal(desc);
    expect(getAddress(p.creator)).to.equal(getAddress(owner.account.address));
    expect(p.createdAt).to.be.greaterThan(0n);
  });

  it("should return the list of multiple products", async function () {
    const { productManager } = await deployProductManagerFixture();
    await productManager.write.addProduct(["P1", "D1", "U1"]);
    await productManager.write.addProduct(["P2", "D2", "U2"]);
    const list = await productManager.read.getAllProducts();
    expect(list.length).to.equal(2);
    expect(list[1].name).to.equal("P2");
  });
});