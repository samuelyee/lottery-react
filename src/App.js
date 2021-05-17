import React, { useEffect, useState } from 'react';
import './App.css';
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(()=>{    
    const callManager = async () => {      
      setManager(await lottery.methods.manager().call());      
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await web3.eth.getBalance(lottery.options.address));
    };    
    callManager();
  }, [manager]);

  return (
    <div className="App">   
      <h2> Lottery Contract </h2>
      <p> This contract is managed by {manager} </p>
      <p>
        There are currently {players.length} people entered, 
        competing to win {`${web3.utils.fromWei(balance)}`} ether!
      </p>
    </div>
  );
}

export default App;
