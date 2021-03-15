import { applyMiddleware, createStore, combineReducers } from 'redux';
import { entitiesReducer, queriesReducer, queryMiddleware } from 'redux-query';
import superagentInterface from 'redux-query-interface-superagent';

const reducer = combineReducers({
  entities: entitiesReducer,
  queries: queriesReducer,
});

export type StoreState = {
  queries: any;
  entities: any;
};

export const getQueries = (state: StoreState) => state.queries;
export const getEntities = (state: StoreState) => state.entities;

const store = createStore(reducer, applyMiddleware(queryMiddleware(superagentInterface, getQueries, getEntities)));

export default store;
