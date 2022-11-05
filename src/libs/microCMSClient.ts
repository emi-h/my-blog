import { createClient } from "microcms-js-sdk"; //ES6

// Initialize Client SDK.
export const client = createClient({
  apiKey: process.env.API_KEY,
  serviceDomain: process.env.DOMAIN,
});
