require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./db/connect");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

const basicInfoRouter = require("./routes/basic_info");
const employeeRouter = require("./routes/employee");
const founderRouter = require("./routes/founder_info");
const fundDisbursmentRouter = require("./routes/fund_disbursment");
const fundRaisedRouter = require("./routes/fund_raised");
const impactRouter = require("./routes/impact");
const patentRouter = require("./routes/patent");


app.use("/api/v1/basicinfo", basicInfoRouter);
app.use("/api/v1/employees", employeeRouter);
app.use("/api/v1/founders", founderRouter);
app.use("/api/v1/funddisbursments", fundDisbursmentRouter);
app.use("/api/v1/fundraised", fundRaisedRouter);
app.use("/api/v1/impacts", impactRouter);
app.use("/api/v1/patents", patentRouter);

// Error handling middleware
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();