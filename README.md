# reselect-computed [![Build Status](https://travis-ci.org/Vanilla-IceCream/reselect-computed.svg?branch=master)](https://travis-ci.org/Vanilla-IceCream/reselect-computed) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/reselect-computed/badge.svg?branch=master)](https://coveralls.io/github/Vanilla-IceCream/reselect-computed?branch=master)

Declaratively created computed properties.

## Install

```bash
$ npm i reselect-computed -S
# or
$ yarn add reselect-computed
```

## Usage

```js
export interface ICounter {
  value: number;
}

export const INITIAL: ICounter = { value: 0 };

export const MEMOIZE = (counter: ICounter): ICounter => counter;
```

```js
import { createSelector } from 'reselect';

import { MEMOIZE, ICounter } from './constants';

export const evenOrOdd = createSelector(
  [MEMOIZE],
  ({ value }: ICounter): string => value % 2 === 0 ? 'even' : 'odd'
);
```

```js
import React from 'react';
import { bindActionCreators } from 'redux';
import { bindSelectCreators } from 'reselect-computed';
import { connect } from 'react-redux';

import * as actions from './actions';
import * as selectors from './selectors';

export const Counter = ({ counter, actions, selectors }) => (
  <div>
    <p className="typography">
      Clicked: {counter.value} times, value is {selectors.evenOrOdd}.
    </p>
  </div>
);

export default connect(
  ({ counter }) => ({ counter, selectors: bindSelectCreators(selectors, counter) }),
  dispatch => ({ actions: bindActionCreators(actions, dispatch) })
)(Counter);
```
