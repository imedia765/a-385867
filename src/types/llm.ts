export interface LLMProvider {
  id: string;
  name: string;
}

export interface CodeGeneration {
  result: string;
  logs?: string[];
}

export interface LLMError {
  message: string;
  code?: string;
}