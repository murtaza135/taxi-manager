// @source https://github.com/alan2207/bulletproof-react/blob/17ad2a70e67a57015ef6d3913c09bfa3ded6e386/src/utils/lazy-import.ts
import * as React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport<
  T extends React.ComponentType<unknown>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  }) as I;
}

// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
