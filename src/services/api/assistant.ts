import { assistantPromptSuggestions, assistantResponses } from '@/mocks/assistant';
import { apiRequest } from '@/services/api/client';
import { isMockMode } from '@/services/api/runtime';
import type { AssistantPromptSuggestion, AssistantResponse } from '@/types/assistant';

async function getAssistantPromptSuggestionsMock(): Promise<AssistantPromptSuggestion[]> {
  return Promise.resolve(assistantPromptSuggestions);
}

async function getAssistantResponseMock(): Promise<AssistantResponse> {
  return Promise.resolve(assistantResponses[0]);
}

export async function getAssistantPromptSuggestions(): Promise<AssistantPromptSuggestion[]> {
  if (isMockMode()) {
    return getAssistantPromptSuggestionsMock();
  }

  return apiRequest<AssistantPromptSuggestion[]>('/assistant/prompts');
}

export async function getAssistantResponse(): Promise<AssistantResponse> {
  if (isMockMode()) {
    return getAssistantResponseMock();
  }

  return apiRequest<AssistantResponse>('/assistant/recommendation');
}
