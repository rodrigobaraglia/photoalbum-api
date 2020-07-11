import { app, PORT } from "./app";
import { connectDB } from "./database";
import {compose, pipe} from "./utils"





// const sum1 = (x: number) => x + 1
// const mult3= (x: number) => x * 3
// const log = (x: string): void => console.log(`${x}` )

// const test: ((x:number) => void) = compose(log, sum1, sum1, mult3)
//Concrete's implementation of compose doesn't allow 
//any further specification of the resulting function's parameters and return type
// const test2: ((x:number) => void) = composee(log, sum1, sum1, mult3)


async function main() {
  await connectDB();
  await app.listen(PORT);
  console.log(`Server running on ${PORT}`);
  // test(1)

// const f: ((x: number) => void) = f => f
// f(test(1))


console.log("weird")
}
main();
