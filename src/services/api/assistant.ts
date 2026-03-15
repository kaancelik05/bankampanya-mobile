import { assistantPromptSuggestions, assistantResponses } from '@/mocks/assistant';

export async function getAssistantPromptSuggestions() {
  return Promise.resolve(assistantPromptSuggestions);
}

export async function getAssistantResponse() {
  return Promise.resolve(assistantResponses[0]);
}
