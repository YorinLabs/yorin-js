// instrumentation-client.js
import { Yorin } from "yorin-js";

const yorin = new Yorin({
  apiKey: process.env.NEXT_PUBLIC_YORIN_PUBLISHABLE_KEY,
  apiUrl: process.env.NEXT_PUBLIC_YORIN_API_URL,
});

yorin.init();

export { yorin };
