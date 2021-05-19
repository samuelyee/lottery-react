import React, { useEffect, useState } from 'react';
import './App.css';
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{    
    const callManager = async () => {      
      setManager(await lottery.methods.manager().call());      
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await web3.eth.getBalance(lottery.options.address));
    };    
    callManager();
  }, [manager]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction success...');
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });
    setMessage('You have been entered!');
  };

  const handlePickaWinner = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Waiting on transaction success...');
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMessage('A winner has been picked!');
  };

  return (
    <div className="App">   
      <h2> Lottery Contract </h2>
      <p> This contract is managed by {manager} </p>
      <p>
        There are currently {`${players.length}`} people entered, 
        competing to win {web3.utils.fromWei(balance)} ether!
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4> Want to try your luck? </h4>
        <div>
          <label> Amount of ether to enter </label>
          <input 
            value={value}
            onChange={(event)=>setValue(event.target.value)}
          />
        </div>
        <button type='submit'>
          Enter
        </button>        
      </form>
      <hr />
      <h4> Ready to pick a winner? </h4>
      <button onClick={handlePickaWinner}> pick a winner! </button>
      <hr/>
      <h1> {message} </h1>
    </div>
  );
}

export default App;
