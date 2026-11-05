import { useRef, useState } from 'react'
import './App.css'
import {
  site,
  loveStory,
  wedding,
  afterMarriage,
  parenthood,
  baby,
  letter,
  blessings,
  closing,
} from './data/story'

function Divider() {
  return (
    <div className="divider">
      <span>❤</span>
    </div>
  )
}

function Photo({ src, caption, date }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className="photo">
      {failed || !src ? (
        <div className="photo-placeholder">Photo coming soon</div>
      ) : (
        <img src={src} alt={caption || ''} loading="lazy" onError={() => setFailed(true)} />
      )}
      {(date || caption) && (
        <figcaption>
          {date && <span className="photo-date">{date}</span>}
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

function Gallery({ items }) {
  return (
    <div className="gallery">
      {items.map((item, i) => (
        <Photo key={i} src={item.photo} caption={item.caption} date={item.date} />
      ))}
    </div>
  )
}

function Envelope() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`envelope-wrap ${open ? 'is-open' : ''}`}>
      <button
        type="button"
        className="envelope"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Close the letter' : 'Open the letter'}
      >
        <span className="envelope-flap" />
        <span className="envelope-seal">❤</span>
      </button>
      {!open && <p className="hint">{letter.hint}</p>}
      <div className="letter">
        <div className="letter-paper">
          <p className="letter-greeting">{letter.greeting}</p>
          {letter.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="letter-closing">{letter.closing}</p>
          <p className="letter-name">{site.fromName}</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [entered, setEntered] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [page, setPage] = useState(0)
  const audioRef = useRef(null)

  const enterStory = () => {
    setEntered(true)
    setPage(0)
    window.scrollTo(0, 0)
    // The click counts as permission, so the browser allows music to start.
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false))
  }

  const backToWelcome = () => {
    audioRef.current?.pause()
    setPlaying(false)
    setPage(0)
    setEntered(false)
  }

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  const pages = [
    {
      title: 'A NEW CHAPTER BEGINS',
      intro:
        'To my brother and sister-in-law: Every great story expands. Heres a look back at the journey that brought you here, and the little boy about to make our family whole. ',
    },
    {
      title: loveStory.title,
      intro: loveStory.intro,
      body: <Gallery items={loveStory.items} />,
    },
    {
      title: wedding.title,
      intro: wedding.intro,
      body: (
        <>
          <Gallery items={wedding.items} />
          <p className="message">{wedding.message}</p>
        </>
      ),
    },
    {
      title: afterMarriage.title,
      intro: afterMarriage.intro,
      body: <Gallery items={afterMarriage.items} />,
    },
    {
      title: parenthood.title,
      intro: parenthood.intro,
      body: (
        <>
          <Gallery items={parenthood.items} />
          <p className="message">{parenthood.message}</p>
        </>
      ),
    },
    {
      title: baby.title,
      body: (
        <>
          <div className="baby-card">
            <p className="baby-name">{site.babyName || 'A little miracle'}</p>
          </div>
          <Gallery items={baby.photos} />
          <p className="message">{baby.message}</p>
        </>
      ),
    },
    {
      title: letter.title,
      body: <Envelope />,
    },
    {
      title: blessings.title,
      intro: blessings.intro,
      body: (
        <div className="blessings">
          {blessings.items.map((b, i) => (
            <blockquote key={i} className="blessing">
              <p>{b.message}</p>
              <footer>{b.from}</footer>
            </blockquote>
          ))}
        </div>
      ),
    },
    {
      title: closing.title,
      body: (
        <>
          <Photo src={closing.photo} />
          <p className="message">{closing.message}</p>
          <p className="signature">{closing.signature}</p>
        </>
      ),
    },
  ]

  const current = pages[page]
  const isLast = page === pages.length - 1

  const goNext = () => {
    if (isLast) {
      backToWelcome()
      return
    }
    setPage(page + 1)
    window.scrollTo(0, 0)
  }

  const goBack = () => {
    setPage(page - 1)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <audio ref={audioRef} src={site.music} loop preload="auto" />

      {!entered ? (
        <main className="welcome-page">
          <div className="card">
            <p className="small-heading">A CELEBRATION OF LOVE &amp; FAMILY</p>
            <h1>
              A New Chapter
              <br />
              Begins
            </h1>
            <Divider />
            <p className="subtitle">
              A beautiful journey of love, memories, togetherness and a little miracle.
            </p>
            <button className="enter-button" onClick={enterStory}>
              Enter Our Story
            </button>
            <p className="footer-text">Made with ❤️ for a lifetime of memories</p>
          </div>
        </main>
      ) : (
        <main className="story-page">
          <button
            type="button"
            className="music-button"
            onClick={toggleMusic}
            aria-label={playing ? 'Pause music' : 'Play music'}
          >
            {playing ? 'Music on' : 'Music off'}
          </button>

          <div className="card page-card" key={page}>
            <h2>{current.title}</h2>
            <Divider />
            {current.intro && <p className="subtitle">{current.intro}</p>}
            {current.body}

            <div className="nav-buttons">
              {page > 0 && (
                <button className="enter-button ghost" onClick={goBack}>
                  Back
                </button>
              )}
              <button className="enter-button" onClick={goNext}>
                {isLast ? 'Back to Welcome' : 'Next'}
              </button>
            </div>

            <div className="dots">
              {pages.map((_, i) => (
                <span key={i} className={`dot ${i === page ? 'active' : ''}`} />
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default App