import { askPerplexity } from "../../services/perplexity";

export default async function handler(req, res) {
  const { question } = req.body;
  try {
    const answer = await askPerplexity(question);
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
