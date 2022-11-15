import express from "express";
import { userRouter } from "./routes/user.routes";

const app = express();

app.use(express.json())
app.use("/users", userRouter);

app.get("/", (_, response) => {
  return response.send("Hello");
});

app.listen("3333", () => console.log("Server is running on PORT 3333 🔥"));
