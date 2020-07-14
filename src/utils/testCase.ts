import {compose, pipe} from "./index"
function sum1(x: number) {
    return x + 1;
  }
  function mult3(x: number) {
    return x * 3;
  }
  function log(x: number): string {
    return `${x}`;
  } 
  
  
  
  
  //Compiler should catch inconsistensies between 
  //parameters and return types between functions in the middle of the argument array
  const test = compose( sum1, sum1, mult3)
  const pipeTest = pipe(mult3, sum1, sum1)
  test(1) 
  pipeTest(1)