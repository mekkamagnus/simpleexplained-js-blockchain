const SHA256 = require("crypto-js/sha256");
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this. previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){       // (ref:calculateHash)
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){       
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
} 
let artiphacts = new Blockchain();
artiphacts.addBlock(new Block(1, "10/10/2022", { amount: 7 }));
artiphacts.addBlock(new Block(1, "09/09/2022", { amount: 88 }));
artiphacts.addBlock(new Block(1, "08/09/2022", { amount: 333 }));
console.log(JSON.stringify(artiphacts, null, 4));
