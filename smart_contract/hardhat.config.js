require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/bKD6FWgaJwzPAu9-vnmYiJ1IQIwENCoR',
      accounts: [
        '05b78b0498b62f48f8be5acec39480382a2c90bf1ee499310f1b45b149d5e2f7',
      ],
    },
  },
}