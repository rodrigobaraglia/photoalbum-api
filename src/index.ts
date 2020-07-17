import { app, PORT } from "./app";
import {connect} from "./database";
import {composePipeTestCase} from "./utils/testCase"

async function main() {
  await connect();
  await app.listen(PORT);
  console.log(`Server running on ${PORT}`);

}
main();
composePipeTestCase();

