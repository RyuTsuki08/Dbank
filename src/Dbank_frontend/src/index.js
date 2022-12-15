import { Dbank_backend } from '../../declarations/Dbank_backend';

const button = document.getElementById('plug-connect-btn');
const principalId = document.getElementById('principal-id');

async function checkConnection(){
  const result = await window.ic.plug.isConnected()
  const plugId = window.ic.plug.sessionManager.sessionData;
  if(result){
    principalId.innerText = `Welcome ${plugId.principalId}`;
  }
}

async function PlugConnect(){
  try {
    let publicKey = await window.ic.plug.requestConnect();
    console.log(`The connected user's public key is:`, publicKey);
    const plugID = window.ic.plug.sessionManager.sessionData;
    console.log(plugID)
  } catch (e) {
    console.log(e);
  }
}

button.addEventListener('click', PlugConnect)


async function checkBalance(){
  const currentAmount = await Dbank_backend.checkBalance();

  const span = document.getElementById('value');
  span.innerText = currentAmount.toFixed(2);
}

window.addEventListener('load', checkBalance);
window.addEventListener('load', checkConnection);

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  let inputTopTup = document.getElementById('input-amount').value;
  let inputRetire = document.getElementById('withdrawal-amount').value;
  const button = event.target.querySelector('#submit-btn')

  if(inputTopTup){
    button.setAttribute('disabled', true)
    await Dbank_backend.topUp(parseFloat(inputTopTup))
    inputTopTup = '';
    button.removeAttribute('disabled')
    checkBalance();
  }

  if(inputRetire){
    button.setAttribute('disabled', true)
    await Dbank_backend.retire(parseFloat(inputRetire))
    inputRetire = '';
    button.removeAttribute('disabled')
    checkBalance();
  } 

  // await Dbank_backend.compound();

});