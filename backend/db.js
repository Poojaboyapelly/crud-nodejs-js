const mongoose = require('mongoose');

const uri = "mongodb+srv://poojaboyapelly:IVlWctVRreGnWtQQ@cluster0.rymqmcp.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
