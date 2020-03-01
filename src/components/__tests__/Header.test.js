import React from 'react';
import renderer from 'react-test-renderer';

import { BagProvider } from '../../context/BagContext';
import Header from '../Header';

describe('Header', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <BagProvider>
          <Header />
        </BagProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
