// server/server.js

import { getEnv } from "./config/env.js";
import app from "./app.js";

const { PORT } = getEnv();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
