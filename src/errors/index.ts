import {Request} from "express";
import {IValidationResults} from "../validation";

export function bodyPropsError(props: string[], body: Request) {
    return console.log(
      "ERROR: body of request doesn't match requiered properties:\n",
      {
        body: { ...body },
        required_props: props,
      }
    );
  }
  

export function documentPropsError<T>(doc: IValidationResults<T>) {
  return console.log("Error: Document has missing props \n", {
    document: doc.item,
    required_props: doc.props,
  });
}
  