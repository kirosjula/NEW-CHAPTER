import {useEffect,useRef, useState} from 'react'
import Wishes from './Wishes.jsx';
import {createPortal} from 'react-dom'
import Intro from './Intro'
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
function Lightbox({ items, index, setIndex, onClose }) {
  const touchX = useRef(null)
  const total = items.length
  const prev = () => setIndex((index - 1 + total) % total)
  const next = () => setIndex((index + 1) % total)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) {
      if (dx < 0) next()
      else prev()
    }
  }

  const item = items[index]
  return createPortal(
    <div
      className="lightbox"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <img key={index} src={item.photo} alt={item.caption || ''} />
      {total > 1 && (
        <>
          <button
            type="button"
            className="lb-arrow lb-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
          >
            &lsaquo;
          </button>
          <button
            type="button"
            className="lb-arrow lb-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
          >
            &rsaquo;
          </button>
          <p className="lb-count">
            {index + 1} / {total}
          </p>
        </>
      )}
      <p className="lb-hint">
        {total > 1 ? 'Swipe or tap the arrows · tap the photo to close' : 'Tap to close'}
      </p>
      <span className="lightbox-close">✕</span>
    </div>,
    document.body
  )
}

function Photo({ src, caption, date, onOpen }) {
  const [failed, setFailed] = useState(false)
  const [solo, setSolo] = useState(false)
  return (
    <figure className="photo">
      {failed || !src ? (
        <div className="photo-placeholder">Photo coming soon</div>
      ) : (
        <img 
        src={src} 
        alt={caption || ''} 
        loading="lazy" 
        onError={() => setFailed(true)}
        onClick={() => (onOpen ? onOpen() : setSolo(true))} 
        />
      )}
      {(date || caption) && (
        <figcaption>
          {date && <span className="photo-date">{date}</span>}
          {caption}
        </figcaption>
      )}
      {solo && (
        <Lightbox
        items={[{photo: src, caption}]}
        index={0}
        setIndex={() => {}}
        onClose={() => setSolo(false)}
      />
      )}
    </figure>
  )
}

function Gallery({ items }) {
  const [current, setCurrent] = useState(null)
  return (
    <div className="gallery">
      {items.map((item, i) => (
        <Photo 
        key={i} 
        src={item.photo} 
        caption={item.caption} 
        date={item.date} 
        onOpen={() => setCurrent(i)}
        />
      ))}
      {current !== null &&(
        <Lightbox
        items={items}
        index={current}
        setIndex={setCurrent}
        onClose={() => setCurrent(null)}
        />
      )}
    </div>
  )
}

function Envelope() {
  const [open, setOpen] = useState(false)
  const [hearts]= useState(() =>
    Array.from({ length: 28}, (_, i) => ({
      id: i,
      left: Math.random() *100,
      size:14+Math.random()*20,
      delay: Math.random()*2.5,
      duration: 4+Math.random()*3,
    }))
  )
  return (
    <div className={`envelope-wrap ${open ? 'is-open' : ''}`}>
      {open &&
  createPortal(
    <div className="hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          ❤
        </span>
      ))}
    </div>,
    document.body
  )}
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

  const [introDone, setIntroDone] = useState(false)

  
    const enterStory = () =>{
      setEntered(true)
      setIntroDone(false)
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
      title: 'A LOOK BACK!',
      intro:
        "To my brother and sister-in-law: Every great story expands. Here's a look back at the journey that brought you here, and the little boy about to make our family whole. ",
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
      title: blessings.title,
      intro:blessings.intro,
      body:<Wishes/>,
     
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
  const replayMagic = () => {
    setPage(0)
    setIntroDone(false)
    window.scrollTo(0, 0)
  }

  const startOfStory = () => {
    setPage(0)
    window.scrollTo(0, 0)
  }

if (entered && !introDone) {
    return (
      <>
      <audio ref={audioRef} src={site.music} loop preload="auto"/>
      <Intro onFinish={() => setIntroDone(true)}/>
          </>
      ) 
  }



  return (
    <>
      <audio ref={audioRef} src={site.music} loop preload="auto" />

      {
          entered && (
        <div className="story-bar">
          <button onClick={replayMagic}>✨ Replay Magic</button>
          <button onClick={startOfStory}>📖 Read Our Story</button>
          
        </div>
      )}

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