export interface IResult {
  category: string;
  type: 'boolean' | 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface IResponse {
  response_code: number;
  results: IResult
}