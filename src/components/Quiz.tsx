import { FC, useState } from 'react';
import { IQuiz } from '../@types/services.type';
import { shuffleArray } from '../utils/shuffleArray';

export const Quiz: FC<{quizData: IQuiz[]}> = ({quizData}) => {
  const [count, setCount] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const answersCount = quizData.length
  const answersArr = quizData[count]?.incorrect_answers.concat(quizData[count].correct_answer).sort(() => Math.random() - 0.5)
  const nextQuestion = (answer: string) => {
    if (answer === quizData[count].correct_answer) setCorrectAnswersCount(prevState => prevState + 1)
    setCount(prevState => prevState + 1)
  }

  if (count === answersCount) return <div>done. correct answers: {correctAnswersCount} of {answersCount}</div>
  return <div>
    <p>{quizData[count].category}</p>
    <p>{quizData[count].question}</p>
    {shuffleArray(answersArr).map(answer => <div key={answer} onClick={() => nextQuestion(answer)}>{answer}</div>)}
  </div>
}