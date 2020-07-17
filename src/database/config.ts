import mongoose from "mongoose";

export async function connectDB() {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(String(process.env.CONNECTION_STRING), options);
  console.log("Database is connected");
}
