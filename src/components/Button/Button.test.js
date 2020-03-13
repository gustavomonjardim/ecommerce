import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Button from '.';

const buttonText = 'Teste';
const onClick = jest.fn();
const tree = <Button text={buttonText} onClick={onClick} />;

test('should call onClick function when pressed', async () => {
  const { getByText } = render(tree);

  fireEvent.click(getByText(buttonText));

  expect(onClick).toHaveBeenCalledTimes(1);
});
