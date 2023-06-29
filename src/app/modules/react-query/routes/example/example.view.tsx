import { useController } from '@tokamakjs/react';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ExampleController } from './example.controller';

export function ExampleView() {
  const ctrl = useController<ExampleController>();

  if (ctrl.isLoading) {
    return 'Loading...';
  }

  if (ctrl.error) {
    return 'An error has occurred: ' + ctrl.error.message;
  }

  const data = ctrl.data!;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{ctrl.isFetching ? 'Updating...' : ''}</div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}
