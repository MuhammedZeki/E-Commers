const express = require("express");
const moongoose = require("mongoose");

const app = express();
const logger = require("morgan");
const cors = require("cors");

//ROUTER
const ProductsRouter = require("./routes/products");
const CategoriesRouter = require("./routes/categories");
const AuthRouter = require("./routes/auth");
const CouponRouter = require("./routes/coupon");
const UsersRouter = require("./routes/user");
const PaymentRouter = require("./routes/payment");

const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await moongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error.message);
  }
};

//MIDDLEWARES
app.use(express.json());
app.use(logger("dev"));
app.use(cors());

app.use(ProductsRouter);
app.use(CategoriesRouter);
app.use(AuthRouter);
app.use(CouponRouter);
app.use(UsersRouter);
app.use(PaymentRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
