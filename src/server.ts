import { app } from "./app";

const port = process.env.PORT || 8000;

app.listen(port as number, () => {
  console.log(`App running on port ${port}`);
});