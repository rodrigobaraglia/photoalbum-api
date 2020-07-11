//Utility functions 

export const handleAsync = <F extends Function, T extends any[], Z>(fn: F) => async (
  ...args: T
): Promise<Z> => {
  try {
    return await fn(...args);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export function isDefined<T>(o: T) {
  return o !== undefined;
}


export const compose = <T extends any[], U extends any[], Z>(
  ...fns: T
): ((...args: U) => Z) => (...args: U): Z =>
  fns.reduceRight((res, fn) => fn(res), args);

export const pipe = <T extends any[], U extends any[], Z>(
  ...fns: T
): ((...args: U) => Z) => (...args: U): Z =>
  fns.reduce((res, fn) => fn(res), args);


  //Concrete's Pareto.js Compose (type declaration sucks):
  // export default function composee(...fns: Function[]): Function {
  //   return fns.reduce((f, g) => (...args: any[]) => f(g(...args)));
  // }
