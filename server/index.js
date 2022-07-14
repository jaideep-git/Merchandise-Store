const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });
const connectDatabase = require("./config/database");

// ! Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server down due to Uncaught Exception`);
    process.exit(1);
});
  

// * Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING AT ${process.env.PORT}`);
});

// ! Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server down due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
});
