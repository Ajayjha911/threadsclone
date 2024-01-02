import mongoose from "mongoose";

let isConnected = false;
// const uri =
//   "mongodb+srv://ajayindra911:6X7amjsWHdTrfArP@cluster0.346kmqi.mongodb.net/?retryWrites=true&w=majority";
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
