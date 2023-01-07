import React, { FC, useState } from 'react';
import { Form } from 'react-bootstrap';
import { answerTypes, categories, difficulties } from '../assets/data';
import { optionsCreator } from '../utils/optionsCreator';
import { IQuiz } from '../@types/services.type';
import { quizApi } from '../services/quiz.api';

export const Settings: FC<{ setQuizData: (arg: IQuiz[]) => void }> = ({ setQuizData }) => {
  const [amount, setAmount] = useState('10')
  const [category, setCategory] = useState('any')
  const [difficulty, setDifficulty] = useState('any')
  const [answerType, setAnswerType] = useState('any')

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const data = await quizApi.getData(amount, category, difficulty, answerType)
    setQuizData(data)
  }
  return <Form>

    <input value={ amount } onChange={ e => setAmount(e.target.value + '') } type="number" max={ 50 } min={ 1 }/>

    <select value={ category } onChange={ e => setCategory(e.target.value) }>
      { optionsCreator(categories) }
    </select>

    <select value={ difficulty } onChange={ e => setDifficulty(e.target.value) }>
      { optionsCreator(difficulties) }
    </select>

    <select value={ answerType } onChange={ e => setAnswerType(e.target.value) }>
      { optionsCreator(answerTypes) }
    </select>

    <button type="submit" onClick={ (e) => handleSubmit(e) }>send</button>
  </Form>
}