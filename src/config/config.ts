import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL;
    if (dbURL) {
      await mongoose.connect(dbURL);
      console.log("Database connected 😎");
    } else {
      throw new Error("Please check the Database URL in .env");
    }
  } catch (error) {
    console.log("Error trying to connect to database: ", error);
    throw new Error("Error trying to connect to database:");
  }
};
