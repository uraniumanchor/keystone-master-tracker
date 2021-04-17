import React from 'react';
import { useRequests } from 'redux-query-react';
import { QueryConfig } from 'redux-query';
import { Dungeons, dungeons } from './constants/dungeons';
import { useSelector } from 'react-redux';
import { getEntities } from './store';

import './Row.css';

type RowProps = {
  player: [string, string, number[]];
};

function Row({ player }: RowProps) {
  const playerKey = React.useMemo(() => `${player[1]}-${player[0]}`, [player]);
  const requests = React.useMemo<QueryConfig[]>(
    () =>
      player[2].map((id) => ({
        url: 'https://0ijiy7wzfj.execute-api.us-east-1.amazonaws.com/mythic-plus-scored-runs',
        body: {
          season: 'season-sl-1',
          mode: 'timed',
          characterId: id,
        },
        transform: (body) => {
          return {
            [playerKey]: body.dungeons.reduce((memo: number[], dungeon: any) => {
              const index = dungeons.findIndex((d) => d[0] === dungeon.dungeon.id);
              if (index === -1) {
                throw new Error(`unknown dungeon ${dungeon.dungeon.id}`);
              }
              memo[index] = dungeon.mythic_level;
              return memo;
            }, []),
            dungeons: body.dungeons.reduce((memo: Dungeons, dungeon: any) => {
              const did = dungeon.dungeon.id;
              memo[did] = memo[did] || [];
              if (dungeon.mythic_level >= 15 && !memo[did].includes(playerKey)) {
                memo[did].push(playerKey);
              }
              return memo;
            }, {}),
          };
        },
        update: {
          [playerKey]: (oldValue: number[] = [], newValue: number[]) => {
            return newValue.reduce((memo, run, index) => {
              memo.push(Math.max(oldValue[index] || 0, run || 0));
              return memo;
            }, [] as number[]);
          },
          dungeons: (oldValue: Dungeons = {}, newValue: Dungeons) => {
            return Object.entries(newValue).reduce((memo: Dungeons, [did, players]: [string, string[]]) => {
              memo[+did] = players.reduce((players, player) => {
                debugger;
                if (!players.includes(player)) {
                  players.push(player);
                }
                return players;
              }, (memo[+did] || []) as string[]);
              debugger;

              return memo;
            }, oldValue);
          },
        },
      })),
    [player, playerKey]
  );

  const [{ isFinished }, refresh] = useRequests(requests);

  const runs = useSelector(getEntities)[playerKey];

  return (
    <tr>
      <td>
        {playerKey} <button onClick={refresh}>Refresh</button>
      </td>
      {isFinished ? (
        <>
          {runs.map((run: number, i: number) => (
            <td key={i} className={`run-${run}`}>
              +{run || 0}
            </td>
          ))}
          <td>{runs.reduce((memo: number, run: number) => memo + (run >= 15 ? 0 : 1), 0)}</td>
        </>
      ) : (
        <td>Loading...</td>
      )}
    </tr>
  );
}

export default Row;
