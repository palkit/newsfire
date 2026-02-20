export default async function handler(req, res) {
  const { country = "us", category = "general", page = 1, pageSize = 10 } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}