import { client } from "./client.js";
client.setUrl("https://api-auth-two.vercel.app");

export const requestRefresh = async function (refreshToken) {
  const { response, data } = await client.post("/auth/refresh-token", {
    refreshToken
  });
  if (response.ok) {
    return data;
  }
};
