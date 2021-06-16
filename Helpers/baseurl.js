const baseurl =
  process.env.NODE_ENV === "production"
    ? "https://myluckystore.vercel.app"
    : "http://localhost:3000";

export default baseurl;
