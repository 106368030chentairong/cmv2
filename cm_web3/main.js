// 添加此至 javascript 中，讓程式在一載入就先判斷有沒有 web3 如果沒有的話我們採用 infura 主網的節點
window.onload = function() {

    const {ethereum} =window;

    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');
    const address = await window.ethereum.enable();
    console.log(address)
    ethereumButton.addEventListener('click', () => {
    getAccount();
    });

    async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
    }

  }
