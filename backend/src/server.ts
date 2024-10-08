import app from "./app";
import "./services/score-tracker";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${String(PORT)}`);
});
