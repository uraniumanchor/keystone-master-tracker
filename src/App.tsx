import React from 'react';
import './App.css';
import { dungeons } from './constants/dungeons';
import { players } from './constants/players';
import Row from './Row';

function App() {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <>
              {dungeons.map(([id, name]) => (
                <th key={id}>{name}</th>
              ))}
            </>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <Row key={player.join('-')} player={player} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
