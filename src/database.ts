import mongoose from "mongoose";

export async function connectDB() {
  const password = "THSoQto8f140g8LG";
  const dbname = "galleri-api";
  const uri = `mongodb+srv://rodrigobaraglia:${password}@cluster0-6mmbk.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, options);
  console.log("Database is connected");
}
