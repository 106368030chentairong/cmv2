
window.userWalletAddress = null
const loginButton = document.getElementById('loginButton')
const userWallet = document.getElementById('userWallet')

function toggleButton() {
  if (!window.ethereum) {
    loginButton.innerText = 'MetaMask is not installed'
    loginButton.classList.remove('bg-purple-500', 'text-white')
    loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed')
    return false
  }

  loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((e) => {
      console.error(e.message)
      return
    })
  if (!accounts) { return }

  window.userWalletAddress = accounts[0]
  userWallet.innerText = window.userWalletAddress
  loginButton.innerText = 'Sign out of MetaMask'
  loadBalance()

  loginButton.removeEventListener('click', loginWithMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', signOutOfMetaMask)
  }, 200)
}

function signOutOfMetaMask() {
  window.userWalletAddress = null
  userWallet.innerText = ''
  loginButton.innerText = 'Sign in with MetaMask'

  loginButton.removeEventListener('click', signOutOfMetaMask)
  setTimeout(() => {
    loginButton.addEventListener('click', loginWithMetaMask)
  }, 200)
}

window.addEventListener('DOMContentLoaded', () => {
  toggleButton()

function loadBalance(){
  web3Provider = null;
  contracts = {};
  account = '0x0';
  const Web3 = require("web3");
  const ethEnabled = async () => {
      if (window.ethereum) {
          await window.ethereum.send('eth_requestAccounts');
          window.web3 = new Web3(window.ethereum);
          return true;
      }
  }
  if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
  } else {
      // Specify default instance if no web3 instance provided
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
  }
  $.getJSON("Market.json", function (market) {
      console.log("initializing Market contract")

      // Instantiate a new truffle contract from the artifact
      contracts.Market = TruffleContract(market);
      // Connect provider to interact with contract
      contracts.Market.setProvider(web3Provider);
  });
  $.getJSON("Users.json", function (users) {
      console.log("initializing User contract")
      // Instantiate a new truffle contract from the artifact
      contracts.Users = TruffleContract(users);
      // Connect provider to interact with contract
      contracts.Users.setProvider(App.web3Provider);
  });

  var marketInstance;
  var userInstance;

  var loader = $("#loader");
  var content = $("#content");

  //loader.show();
  content.show();

  // Load account data
  console.log("loading account data")
  var currentAccount;
  web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
          console.log("Your Account: " + account)
          account = account;
          currentAccount = account;
          web3.eth.getBalance(account, function(err, balance) {
              if (err === null) {  //Note:set id="accountBalance" in your html page
                  $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
              }
          });
      }
  });
}
});
