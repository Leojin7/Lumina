import Perplexity from "@perplexity-ai/client";

export const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY
});

export async function askPerplexity(query) {
  return client.ask(query);
}
