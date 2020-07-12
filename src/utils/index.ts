//Utility functions

export function handleAsync<F extends Function, T extends any[], Z>(fn: F) {
  return async function _handleAsync(...args: T): Promise<Z> {
    try {
      return await fn(...args);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function isDefined<T>(o: T) {
  return o !== undefined;
}

export function compose<T extends any[], U extends any[], Z>(
  ...fns: T
): (...args: U) => Z {
  return function _compose(...args: U): Z {
    return fns.reduceRight((res, fn) => fn(res), args);
  };
}

export function pipe<T extends any[], U extends any[], Z>(
  ...fns: T
): (...args: U) => Z {
  return function _pipe(...args: U): Z {
    return fns.reduce((res, fn) => fn(res), args);
  };
}