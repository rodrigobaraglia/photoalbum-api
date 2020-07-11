import { app, PORT } from "./app";
import { connectDB } from "./database";
import {compose, pipe} from "./utils"

async function main() {
  await connectDB();
  await app.listen(PORT);
  console.log(`Server running on ${PORT}`);

}
main();
