
const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data) {
        this.index = 0;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = "0";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
    }

    mineBlock(difficulty) {
	//todo: mining algorithm
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesis()];
    }

    createGenesis() {
        return new Block(0, "01/01/2018", "Genesis block", "0")
    }

    latestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock){
        newBlock.previousHash = this.latestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
    // verify integrity of new chain, then accept for consensus
    replaceChain(newBlocks) {
    if (newBlocks.checkValid() && newBlocks.length > this.chain.length) {
        console.log('Received blockchain is valid. Replacing current blockchain with received blockchain');
        this.chain = newBlocks;
        broadcast(responseLatestMsg());
   	} else {
        console.log('Received blockchain invalid');
      }
	}
}



//test 
let jsChain = new Blockchain();
jsChain.addBlock(new Block("12/25/2018", {amount: 5}));
jsChain.addBlock(new Block("12/26/2018", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());