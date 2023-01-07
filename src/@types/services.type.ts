export interface IQuiz {
  category: string;
  type: 'boolean' | 'multiple'
  difficulty: 'easy' | 'medium' | 'hard'
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IDataResponse {
  response_code: number;
  results: IQuiz[]
}

export interface IError {
  quizData: 'ERR_NETWORK'
}