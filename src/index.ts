import { app, PORT } from "./app";
import {connect} from "./database";
import {composePipeTestCase} from "./utils/testCase"
import * as dotenv from 'dotenv';

async function main() {
  dotenv.config()
  await connect();
  await app.listen(PORT);
  console.log(`Server running on ${PORT}`);
  // config()
}

main();
composePipeTestCase();

