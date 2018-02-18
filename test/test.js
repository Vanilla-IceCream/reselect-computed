import { createSelector } from 'reselect';

import { bindSelectCreators } from '../src';

process.chdir(__dirname);

describe('reselect-computed', () => {
  it('should handle bindSelectCreators', async () => {
    const state = { value: 10 };

    const evenOrOdd = createSelector(
      num => num,
      ({ value }) => value % 2 === 0 ? 'even' : 'odd'
    );

    const selectors = { evenOrOdd };

    const result = await bindSelectCreators(selectors, state);
    expect(result.evenOrOdd).toEqual('even');
  })
});
