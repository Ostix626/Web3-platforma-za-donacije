/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.18',
    defaultNetwork: 'mumbai',
    networks: {
      hardhat: {},
      mumbai: {
        url: 'https://matic-mumbai.chainstacklabs.com',
        accounts: [`0x${process.env.PRIVATE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
