import { instance } from './index';
import { IDataResponse } from '../@types/services.type';

export const quizApi = {
  getData: (amount: string, category: string, difficulty: string, answerType: string) =>
    instance.get<IDataResponse>(`?amount=${ amount }`
      + ((category === 'any') ? '' : ('&category=' + category))
      + ((difficulty === 'any') ? '' : ('&difficulty=' + difficulty))
      + ((answerType === 'any') ? '' : ('&answerType=' + answerType))
    )
      .then(res => res.data.results)
      .catch(e => e)
}