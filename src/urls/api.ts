export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://kcg-review.herokuapp.com"
    : "http://localhost:3001/api/v1";
