// server/server.js

import { get_env } from "./config/env.js";
import app from "./app.js";

const { PORT } = get_env();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
