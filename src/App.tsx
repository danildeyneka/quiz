import { FC, useState } from 'react';
import { Settings } from './components/Settings';
import { Quiz } from './components/Quiz';
import { IQuiz } from './@types/services.type';

export const App: FC = () => {
  const [quizData, setQuizData] = useState<IQuiz[]>([])

  if (quizData?.length === 0) return <Settings setQuizData={setQuizData}/>
  return <Quiz quizData={quizData} setQuizData={setQuizData}/>
}