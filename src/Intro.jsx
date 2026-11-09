import { useEffect, useMemo, useRef, useState } from 'react'
import './Intro.css'

// Edit all the wording here
const TEXT = {
  kicker: 'A tiny surprise for you',
  title: 'Hello, Little One',
  intro: 'A new chapter is about to begin, and the whole family is waiting for you.',
  openBtn: 'Open Your Surprise 💝',
  catchTitle: 'First, catch the heart',
  catchHelp: 'Tap the floating heart 5 times to unlock the surprise.',
  giftTitle: 'A Gift For You',
  giftHelp: 'Tap the gift box gently.',
  giftMsg: 'Inside this gift is our love, our prayers, and a lifetime of smiles waiting for you. 💙',
  candleHelp: 'Make a wish for the little one, then blow out the candle.',
  candleBtn: 'Blow Candle 🕯️',
  finalKicker: 'A Wish For You',
  finalTitle: 'Welcome to the World 👶',
  finalP1:
    'Before you even arrived, you were already deeply loved. You are the newest blessing in our family, and your story is just beginning.',
  finalP2:
    'May God bless you with endless happiness, health, and a life full of love. We cannot wait to meet you. 💙',
  continueBtn: 'Read Our Story 💙',
}

const COLORS = ['#8fb7f2', '#f3d98b', '#ffffff', '#cfe0fb', '#f2b8b8', '#5b8bd9']

export default function Intro({ onFinish }) {
  const [step, setStep] = useState(0)
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState({ x: 40, y: 40 })
  const [giftOpen, setGiftOpen] = useState(false)
  const [flameOn, setFlameOn] = useState(true)
  const [confetti, setConfetti] = useState([])
  const gameRef = useRef(null)

  const floaters = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        emoji: ['💙', '🤍', '💛', '💕', '✨'][i % 5],
        left: Math.random() * 100,
        size: 18 + Math.random() * 22,
        dur: 7 + Math.random() * 6,
        delay: Math.random() * 8,
      })),
    []
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
      })),
    []
  )

  function moveHeart() {
    const box = gameRef.current
    if (!box) return
    const maxX = Math.max(box.clientWidth - 70, 0)
    const maxY = Math.max(box.clientHeight - 70, 0)
    setPos({ x: Math.random() * maxX, y: Math.random() * maxY })
  }

  useEffect(() => {
    if (step === 1) moveHeart()
  }, [step])

  function launchConfetti(amount = 100) {
    const batch = Array.from({ length: amount }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 1.2,
      dur: 2 + Math.random() * 2.5,
    }))
    setConfetti((c) => [...c, ...batch])
    setTimeout(() => setConfetti((c) => c.filter((p) => !batch.includes(p))), 4500)
  }

  function catchIt() {
    if (score >= 5) return
    const next = score + 1
    setScore(next)
    if (next >= 5) setTimeout(() => setStep(2), 500)
    else moveHeart()
  }

  function openGift() {
    if (giftOpen) return
    setGiftOpen(true)
    launchConfetti(50)
    setTimeout(() => setStep(3), 2500)
  }

  function blowCandle() {
    if (!flameOn) return
    setFlameOn(false)
    launchConfetti(120)
    setTimeout(() => {
      setStep(4)
      launchConfetti(80)
    }, 1200)
  }
 
  function replay() {
    setStep(0)
    setScore(0)
    setGiftOpen(false)
    setFlameOn(true)
  }

  return (
    <div className="in-root">
      <button className="in-skip" onClick={onFinish}>Skip intro →</button>

      <div className="in-balloon" style={{ background: '#9bbcf2', left: '6%', top: '14%' }} />
      <div className="in-balloon" style={{ background: '#f3d98b', right: '8%', top: '20%', animationDelay: '1s' }} />
      <div className="in-balloon" style={{ background: '#cfe0fb', left: '22%', bottom: '10%', animationDelay: '2s' }} />
      <div className="in-balloon" style={{ background: '#f2b8b8', right: '22%', bottom: '12%', animationDelay: '.5s' }} />

      {floaters.map((h) => (
        <span
          key={h.id}
          className="in-float"
          style={{
            left: `${h.left}vw`,
            fontSize: h.size,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {sparkles.map((s) => (
        <span
          key={s.id}
          className="in-sparkle"
          style={{ left: `${s.left}vw`, top: `${s.top}vh`, animationDelay: `${s.delay}s` }}
        />
      ))}

      {confetti.map((p) => (
        <i
          key={p.id}
          className="in-confetti"
          style={{
            left: `${p.left}vw`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}

      <main className="in-card">
        {step === 0 && (
          <section className="in-step">
            <p className="in-kicker">{TEXT.kicker}</p>
            <h1 className="in-script in-title">{TEXT.title}</h1>
            <p className="in-text">{TEXT.intro}</p>
            <button className="in-btn" onClick={() => setStep(1)}>{TEXT.openBtn}</button>
          </section>
        )}

        {step === 1 && (
          <section className="in-step">
            <h2 className="in-script in-h2">{TEXT.catchTitle}</h2>
            <p className="in-text">{TEXT.catchHelp}</p>
            <div className="in-game" ref={gameRef}>
              <div className="in-score">Caught: {score}/5</div>
              <button
                className="in-catch"
                style={{ left: pos.x, top: pos.y }}
                onPointerDown={catchIt}
                aria-label="Catch the heart"
              >
                💙
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="in-step">
            <h2 className="in-script in-h2">{TEXT.giftTitle}</h2>
            <p className="in-text">{TEXT.giftHelp}</p>
            <div className={`in-gift ${giftOpen ? 'open' : ''}`} onClick={openGift}>
              <div className="in-gift-lid" />
            </div>
            {giftOpen && <p className="in-gift-msg">{TEXT.giftMsg}</p>}
          </section>
        )}

        {step === 3 && (
          <section className="in-step">
            <div className="in-cake">
              {flameOn && <div className="in-flame" onClick={blowCandle} />}
              <div className="in-candle" />
              <div className="in-cake-top" />
              <div className="in-cake-base" />
            </div>
            <p className="in-text">{TEXT.candleHelp}</p>
            <button className="in-btn" onClick={blowCandle}>{TEXT.candleBtn}</button>
          </section>
        )}

        {step === 4 && (
          <section className="in-step">
            <p className="in-kicker">{TEXT.finalKicker}</p>
            <h2 className="in-script in-title">{TEXT.finalTitle}</h2>
            <div className="in-message">
              <p>{TEXT.finalP1}</p>
              <p>{TEXT.finalP2}</p>
            </div>
            <div className="in-actions">
              <button className="in-btn in-btn-ghost" onClick={replay}>Replay Magic ✨</button>
              <button className="in-btn" onClick={onFinish}>{TEXT.continueBtn}</button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}