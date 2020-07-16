// import {Composable, IComposite, IPipeline } from "./declarations";
// import { Request } from "express";
// //Utility functions

// //Functions are named to keep track of them in error messages.
// //Underscore is used to denote inner functions.

// //Should there be different ways to respond to an error?
// // export function handleAsync<F extends Function>(fn: F): IAsync {
// //   return async function _handleAsync(...args: any[]): Promise<any> {
// //     try {
// //       return await fn(...args);
// //     } catch (err) {
// //       console.log(err);
// //       return err;
// //     }
// //   };
// // }

// //Would hasOwnProperty or some kind of Reflect method be a better validation tool?
// //Parsing requests will demand more instances of validation
// export function isDefined<T>(o: T) {
//   return o !== undefined;
// }

// export interface IStruct<T> {
//   [prop: string]: T;
// }
// export interface IValidationResults<T> {
//   isValid: boolean;
//   props: string[];
//   item:IStruct<T>
// }
// export function validateProp<T>(o: IStruct<T>) {
//   return function _validateProp(prop: string) {
//     return Reflect.has(o, prop) ? isDefined(o[prop]) : false;
//   };
// }

// export function validateProps(...props: string[]) {
//   return function _validateProps(item: IStruct<any>) {
//     return {
//       isValid: props
//         .map(validateProp(item))
//         .every((value) => value === true),
//       props,
//       item,
//     };
//   };
// }

// export function pluckProps<T>(props: string[], o: IStruct<T>): IStruct<T> {
//   return props.reduce((struct, prop) => ({ ...struct, [prop]: o[prop] }), {});
// }
// export function parseBody(...props: string[]) {
//   return function __parseBody<T>(req: Request): IStruct<T> | void {
//     return validateProps(...props)(req.body).isValid
//       ? pluckProps(props, req.body)
//       : bodyPropsError(props, req.body);
//   };
// }

// export function bodyPropsError(props: string[], body: Request) {
//   return console.log(
//     "ERROR: body of request doesn't match requiered properties:\n",
//     {
//       body: { ...body },
//       required_props: props,
//     }
//   );
// }

// export function compose<T extends any[]>(...fns: Composable<T>): IComposite<T> {
//   return function _compose(...args) {
//     return fns.reduceRight((res, fn) => fn(res), args);
//   };
// }

// export function pipe<T extends any[]>(...fns: Composable<T>): IPipeline<T> {
//   return function _pipe(...args) {
//     return fns.reduce((res, fn) => fn(res), args);
//   };
// }
export {pipe, compose, pluckProps} from "./composition";
export {IStruct, ForeignData} from "./declarations";
// export * as U from "./utilityTypes"