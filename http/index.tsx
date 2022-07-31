import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_API_KEY}`,
  },
});

// To fetch All Categories
export const fetchCategories = async () => api.get("/api/categories");

// To fetch all Articles
export const fetchArticles = async (queryString: string) =>
  api.get(`/api/articles?${queryString}`);

// To fetch single Article
export const fetchArticlesBySlug = async (quertString: string) =>
  api.get(`/api/articles?${quertString}`);
