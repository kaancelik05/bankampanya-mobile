import { useQuery } from '@tanstack/react-query';
import { getAssistantPromptSuggestions, getAssistantResponse } from '@/services/api/assistant';

export function useAssistantPrompts() {
  return useQuery({
    queryKey: ['assistant', 'prompts'],
    queryFn: getAssistantPromptSuggestions,
  });
}

export function useAssistantResponse() {
  return useQuery({
    queryKey: ['assistant', 'response'],
    queryFn: getAssistantResponse,
  });
}
