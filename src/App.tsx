import { FC, useState } from 'react';
import { Settings } from './components/Settings';
import { Quiz } from './components/Quiz';

export const App: FC = () => {
  const [start, setStart] = useState(false)

  if (!start) return <Settings/>
  return <Quiz/>
}