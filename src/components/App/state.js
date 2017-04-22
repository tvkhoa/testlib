import makeStateAction from 'redux-state-action';

const reducerPath = 'eh/app';

const names = {
  content: {
    type: 'string',
    defaultValue: 'react-tippy',
  },
  username: {
    type: 'string',
    defaultValue: 'React-tippy',
  },
  title: {
    type: 'string',
    defaultValue: 'tooltip lib',
  },
};

export const {
  branch,
  actionCreatorFactory,
  selectorFactory,
} = makeStateAction({
  reducerPath,
  names,
});

export const setUsernameAC = actionCreatorFactory('username');
export const setTitleAC = actionCreatorFactory('title');

export const contentSelector = selectorFactory('content');
export const usernameSelector = selectorFactory('username');
export const titleSelector = selectorFactory('title');
