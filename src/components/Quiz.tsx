import { FC, useState } from 'react';
import { IQuiz } from '../@types/services.type';
import { shuffleArray } from '../utils/shuffleArray';
import HTMLReactParser from 'html-react-parser';
import { Button, Col, Container, Row } from 'react-bootstrap';

export const Quiz: FC<{ quizData: IQuiz[], setQuizData: (arg: IQuiz[]) => void }> = ({ quizData, setQuizData }) => {
  const [count, setCount] = useState(0)
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const answersCount = quizData.length
  const answersArr = quizData[count]?.incorrect_answers.concat(quizData[count].correct_answer).sort(() => Math.random() - 0.5)
  const nextQuestion = (answer: string) => {
    if (answer === quizData[count].correct_answer) setCorrectAnswersCount(prevState => prevState + 1)
    setCount(prevState => prevState + 1)
  }
  const restart = () => {
    setCount(0)
    setCorrectAnswersCount(0)
  }
  const progressBarStyle = {
    width: count / answersCount * 100 + '%'
  }

  if (count === answersCount) return <div className="mx-auto w-50 d-flex justify-content-between">
    <Button onClick={ () => restart() }>try again</Button>
    <div>Correct answers: { correctAnswersCount } of { answersCount }</div>
    <Button onClick={ () => setQuizData([]) }>another test</Button></div>

  return <div className="w-50 m-auto">
    <div className='progress-bar' style={progressBarStyle}></div>
    <h1 className="text-center mb-4 d-block">{ HTMLReactParser(quizData[count].category) }</h1>
    <p className="text-center" style={ { minHeight: 60 } }>{ HTMLReactParser(quizData[count].question) }</p>
    <Container className="mx-5 mt-4">
      <Row className="">
        {
          quizData[count].type === 'boolean'
            ? shuffleArray(answersArr)
              .map((answer, i) => <Col key={ answer } role="button" className={`mb-2 ${(answer === 'True') ? 'text-warning' : 'text-danger'}`} sm={ 6 }
                                       onClick={ () => nextQuestion(answer) }>{ HTMLReactParser(answer) }</Col>)
            : shuffleArray(answersArr)
              .map((answer, i) => <Col key={ answer } role="button" className="mb-2" sm={ 6 }
                                       onClick={ () => nextQuestion(answer) }>{ i + 1 }. { HTMLReactParser(answer) }</Col>)
        }
      </Row>
    </Container>
  </div>
}