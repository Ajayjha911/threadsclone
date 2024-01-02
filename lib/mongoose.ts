import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) return console.log("Not Connected");
  if (isConnected) return console.log("Already Connected");

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    isConnected = true;

    console.log("Connected To DB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
