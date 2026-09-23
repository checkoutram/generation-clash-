import { useEffect, useMemo, useRef, useState } from 'react'
import Landing from './components/Landing'
import BirthYear from './components/BirthYear'
import Quiz from './components/Quiz'
import Calculating from './components/Calculating'
import Result from './components/Result'
import {
  QUESTION_POOL, QUESTIONS_PER_GAME, generationForYear, computeResult,
  pickResultMessage, GENERATIONS, type Question, type ScoreBreakdown, type Generation,
} from './config'
import { initAnalytics, trackEvent, deviceType, trafficSource } from './analytics'

const GENERATION_LOOKUP = Object.fromEntries(GENERATIONS.map(g => [g.id, g])) as Record<string, Generation>

type Screen = 'landing' | 'birthyear' | 'quiz' | 'calculating' | 'result'

function pickRandomQuestions(): Question[] {
  const pool = [...QUESTION_POOL]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(QUESTIONS_PER_GAME, pool.length))
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [birthYear, setBirthYear] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [picks, setPicks] = useState<number[]>([])
  const startTime = useRef<number>(0)

  useEffect(() => {
    initAnalytics()
    trackEvent('page_view', { page: 'landing', device: deviceType(), ...trafficSource() })
  }, [])

  const startQuiz = (year: number) => {
    setBirthYear(year)
    setQuestions(pickRandomQuestions())
    startTime.current = Date.now()
    trackEvent('quiz_start', {
      birth_year: year,
      generation: generationForYear(year).name,
      ...trafficSource(),
    })
    setScreen('quiz')
    window.scrollTo(0, 0)
  }

  const result = useMemo(() => {
    if (screen !== 'result' || birthYear === null) return null
    const official = generationForYear(birthYear)
    const { breakdown } = computeResult(questions, picks)
    const vibe: Generation = GENERATION_LOOKUP[breakdown[0].gen]
    return { official, vibe, breakdown, message: pickResultMessage(official.id, vibe.id) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen])

  const handleQuizDone = (p: number[]) => {
    setPicks(p)
    if (birthYear !== null) {
      const official = generationForYear(birthYear)
      const { breakdown } = computeResult(questions, p)
      const vibe = GENERATION_LOOKUP[breakdown[0].gen]
      const pctOf = (id: string) => breakdown.find(b => b.gen === id)?.pct ?? 0
      trackEvent('quiz_complete', {
        generation: official.name,
        vibe: vibe.name,
        completion_seconds: Math.round((Date.now() - startTime.current) / 1000),
        millennial_score: pctOf('millennial'),
        gen_z_score: pctOf('genz'),
        gen_alpha_score: pctOf('genalpha'),
        gen_beta_score: pctOf('genbeta'),
      })
    }
    setScreen('calculating')
    window.scrollTo(0, 0)
  }

  const playAgain = () => {
    trackEvent('play_again', { device: deviceType() })
    setBirthYear(null)
    setPicks([])
    setQuestions([])
    setScreen('landing')
    window.scrollTo(0, 0)
  }

  return (
    <div className="mx-auto min-h-full max-w-2xl">
      {screen === 'landing' && <Landing onStart={() => setScreen('birthyear')} />}
      {screen === 'birthyear' && <BirthYear onSubmit={startQuiz} />}
      {screen === 'quiz' && (
        <Quiz questions={questions} onDone={handleQuizDone} />
      )}
      {screen === 'calculating' && <Calculating onDone={() => { setScreen('result'); window.scrollTo(0, 0) }} />}
      {screen === 'result' && result && birthYear !== null && (
        <Result
          birthYear={birthYear}
          official={result.official}
          vibe={result.vibe}
          breakdown={result.breakdown as ScoreBreakdown[]}
          message={result.message}
          questions={questions}
          picks={picks}
          onPlayAgain={playAgain}
        />
      )}
    </div>
  )
}
