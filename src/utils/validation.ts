import {IStruct} from "./declarations";


export interface IAsync {
    <T extends any[], Z>(...args: T): Promise<Z>;
  }

export interface IValidationResults<T> {
    isValid: boolean;
    props: string[];
    item:IStruct<T>
  }

export function isDefined<T>(o: T) {
  return o !== undefined;
}

export function validateProp<T>(o: IStruct<T>) {
  return function _validateProp(prop: string) {
    return Reflect.has(o, prop) ? isDefined(o[prop]) : false;
  };
}

export function validateProps(...props: string[]) {
  return function _validateProps(item: IStruct<any>) {
    return {
      isValid: props.map(validateProp(item)).every((value) => value === true),
      props,
      item,
    };
  };
}

export function handleAsync<F extends Function>(fn: F): IAsync {
  return async function _handleAsync(...args: any[]): Promise<any> {
    try {
      return await fn(...args);
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}

export function bodyPropsError(props: string[], body: Request) {
  return console.log(
    "ERROR: body of request doesn't match requiered properties:\n",
    {
      body: { ...body },
      required_props: props,
    }
  );
}
