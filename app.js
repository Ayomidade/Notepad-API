import express, { json, urlencoded } from "express";
import { router } from "./routes/route.js";

const PORT = 5050;
export const app = express(); //instance of my backend application
app.use(urlencoded({ extended: true }));
app.use(json()); //to recognize the incoming Request Object as a JSON Object
app.use("/api", router); //localhost:5050/api

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
  // console.log(`Error occurred, server can't start`, error);
});
