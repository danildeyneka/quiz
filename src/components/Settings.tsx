import React, { FC, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { answerTypes, categories, difficulties } from '../assets/data';
import { optionsCreator } from '../utils/optionsCreator';
import { IQuiz } from '../@types/services.type';
import { quizApi } from '../services/quiz.api';

export const Settings: FC<{ setQuizData: (arg: IQuiz[]) => void }> = ({ setQuizData }) => {
  const [amount, setAmount] = useState('10')
  const [category, setCategory] = useState('any')
  const [difficulty, setDifficulty] = useState('any')
  const [answerType, setAnswerType] = useState('any')
  const [loading, setLoading] = useState(false)
  const [amountError, setAmountError] = useState(false)

  const handleSetAmount = (num: string) => {
    if (+num > 0 && +num < 51) {
      setAmountError(false)
      setAmount(num)
    } else setAmountError(true)
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoading(true)
    const data = await quizApi.getData(amount, category, difficulty, answerType)
    setLoading(false)
    setQuizData(data)
  }
  return <Form className="w-25 m-auto text-center">
    <h1 className="mb-4 fw-bold">Quiz game</h1>
    <InputGroup>
      <Form.Group className="rounded-4 mb-2 w-100">Enter number of questions</Form.Group>
      <Form.Control className="rounded-2" aria-label="number of questions" placeholder={ amount } value={ amount }
                    type="number" onChange={ e => handleSetAmount(e.target.value) }/>
    </InputGroup>
    { amountError && <p className="text-warning w-75 m-auto mt-1">Please enter a number from 1 to 50</p> }

    <Form.Group>
      <Form.Label className="mt-2">Select category</Form.Label>
      <Form.Select value={ category } aria-label="category" onChange={ e => setCategory(e.target.value) }>
        { optionsCreator(categories) }
      </Form.Select>
    </Form.Group>

    <Form.Group>
      <Form.Label className="mt-2">Select difficulty</Form.Label>
      <Form.Select value={ difficulty } aria-label="difficulty" onChange={ e => setDifficulty(e.target.value) }>
        { optionsCreator(difficulties) }
      </Form.Select>
    </Form.Group>

    <Form.Group>
      <Form.Label className="mt-2">Select questions type</Form.Label>
      <Form.Select value={ answerType } aria-label="questions type" onChange={ e => setAnswerType(e.target.value) }>
        { optionsCreator(answerTypes) }
      </Form.Select>
    </Form.Group>

    <Button className="fs-4 rounded-4 bg-info mt-3 border-info px-5" type="submit"
            onClick={ (e) => handleSubmit(e) }>Start</Button>

    { loading && <div className='text-warning'>Loading...</div> }
  </Form>
}