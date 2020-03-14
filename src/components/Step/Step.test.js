import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Step from '.';

afterEach(() => {
  jest.clearAllMocks();
});

const title = 'Title';
const number = '1';
const onClick = jest.fn();

const tree = <Step onClick={onClick} title={title} number={number} checked={false} active={true} />;

test('should display title and step number correctly', async () => {
  const { getByText } = render(tree);

  expect(getByText(number)).toBeInTheDocument();
  expect(getByText(title)).toBeInTheDocument();
});

test('should not display number if step is already checked', async () => {
  const { getByText, queryByText } = render(
    <Step onClick={onClick} title={title} number={number} checked={true} active={true} />
  );

  expect(getByText(title)).toBeInTheDocument();
  const stepNumber = queryByText(number);
  expect(stepNumber).not.toBeInTheDocument();

  expect.assertions(2);
});

test('should call onClick function when step is checked', async () => {
  const { getByText } = render(
    <Step onClick={onClick} title={title} number={number} checked={true} active={true} />
  );

  fireEvent.click(getByText(title));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('should not call onClick function when step is not checked', async () => {
  const { getByText } = render(
    <Step onClick={onClick} title={title} number={number} checked={false} active={false} />
  );

  fireEvent.click(getByText(title));

  expect(onClick).not.toHaveBeenCalled();
});
