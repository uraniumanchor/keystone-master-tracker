import React from 'react';
import './App.css';
import { Dungeons, dungeons } from './constants/dungeons';
import { players } from './constants/players';
import Row from './Row';
import { useSelector } from 'react-redux';
import { getEntities } from './store';

function App() {
  const dungeonData: Dungeons = useSelector(getEntities).dungeons || {};

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <>
              {dungeons.map(([id, name]) => (
                <th key={id}>
                  {name} ({players.length - (dungeonData[id] || []).length})
                </th>
              ))}
            </>
            <th>
              Missing (
              {players.length * dungeons.length -
                Object.values(dungeonData).reduce((memo: number, players: string[]) => memo + players.length, 0)}
              )
            </th>
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
