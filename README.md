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
// types.js

// @flow

export interface ICounter {
  value: number;
}

export interface Props {
  counter: ICounter;
  actions?: Object;
  selectors?: Object;
}
```

```js
// constants.js

// @flow

import { ICounter } from './types';

export const INITIAL: ICounter = {
  value: 0,
};
```

```js
// selectors.js

// @flow

import { createSelector } from 'reselect';

import { ICounter } from './types';

export const evenOrOdd = createSelector(
  (counter: ICounter): ICounter => counter,
  ({ value }: ICounter): string => (value % 2 === 0 ? 'even' : 'odd'),
);
```

```js
// Counter.js

// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { bindSelectCreators } from 'reselect-computed';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { Props } from './types';
import * as actions from './actions';
import * as selectors from './selectors';

export const Counter = ({ counter, actions, selectors }: Props): React.Element<Props> => (
  <div>
    <p className="typography">
      Clicked: {counter.value} times, value is {selectors.evenOrOdd}.
    </p>

    <style jsx>{`
      .typography {
        padding: 0.25rem 0;
      }
    `}</style>
  </div>
);

export const mapStateToProps = ({ counter }) => ({
  counter,
  selectors: bindSelectCreators(selectors, counter),
});

export const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      console.log('Counter is ready.');
    },
  }),
)(Counter);
```
