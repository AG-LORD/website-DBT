// src/integrations/Core.js

export async function InvokeLLM({ prompt, add_context_from_internet = false }) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `🤖 [Mock Response] You asked: "${prompt.slice(0, 60)}..."`;
}
