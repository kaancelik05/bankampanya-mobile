export type AssistantPromptSuggestion = {
  id: string;
  text: string;
};

export type AssistantRecommendation = {
  id: string;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  targetType: 'campaign' | 'tracking' | 'credit';
  targetId: string;
};

export type AssistantResponse = {
  id: string;
  prompt: string;
  summary: string;
  insight: string;
  recommendations: AssistantRecommendation[];
};
