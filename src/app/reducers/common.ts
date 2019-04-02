import { Action } from '../constants/action-types';

type State = { [key: string]: boolean };

const INITITAL_STATE: State = <State>{};

export const loading = (state: State = INITITAL_STATE, action: Action) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(action.type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "REQUEST"
  };
};

export const error = (state: State = INITITAL_STATE, action: Action) => {
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(action.type);
  if (!matches) return state;
  const [, requestName, requestState] = matches;
  return {
    ...state,
    [requestName]: requestState === "FAILURE"
  };
};

export const getIsLoading = (state: State, ids: string[]) => ids.some(id => state[id]);

export const getIsError = (state: State, ids: string[]) => ids.some(id => state[id]);
