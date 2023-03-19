const { ethers } = require('ethers');

const cex_addresses_map = require('./cex_addresses.json');

const provider = new ethers.providers.InfuraProvider('arbitrum', apiKey);

// Replace with the target ERC20 token contract address
const tokenAddress = '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9';

// Replace with the ABI of the ERC20 token contract
const tokenAbi = [
  'function balanceOf(address) view returns (uint)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
];

const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, provider);

function main() {
    for (const [cexName, addresses] of Object.entries(cex_addresses_map)) {
        console.log(cexName);
        for (const address of addresses) {
            console.log(address);
        }
    }
}

async function monitorTransfers() {
    const filter = tokenContract.filters.Transfer();
    const historicalEvents = await provider.getLogs({
        ...filter,
        fromBlock: startingBlockHeight,
        toBlock: 'latest'
      });
    
      for (const event of historicalEvents) {
        const parsedEvent = tokenContract.interface.parseLog(event);
        const { from, to, value } = parsedEvent.args;
    
        if (addressesToMonitor.includes(to)) {
          console.log(`Historical transfer detected: ${value} tokens to ${to}`);
        }
      }

      tokenContract.on('Transfer', (from, to, value) => {
        if (addressesToMonitor.includes(to)) {
          console.log(`Transfer detected: ${value} tokens to ${to}`);
        }
      });
      console.log('Monitoring transfers...');
      
}
