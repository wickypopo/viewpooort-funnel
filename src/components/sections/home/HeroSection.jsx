import { motion, useReducedMotion } from 'framer-motion'
import { BrowserMockup } from '@/components/site'
import { IconTextButton } from '@/components/ui'
import { siteData } from '@/data.js'

const letterStagger = 0.018
const wordStagger = 0.045
const itemDuration = 0.42

function AnimatedLetters({ children, className = '', delay = 0 }) {
  return (
    <span className={className}>
      {Array.from(children).map((letter, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * letterStagger,
            duration: itemDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`${letter}-${index}`}
        >
          {letter}
        </motion.span>
      ))}
    </span>
  )
}

function AnimatedWords({ children, delay = 0 }) {
  return (
    <>
      {children.split(' ').map((word, index) => (
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + index * wordStagger,
            duration: itemDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
          key={`${word}-${index}`}
        >
          {word}
          {index < children.split(' ').length - 1 ? '\u00a0' : ''}
        </motion.span>
      ))}
    </>
  )
}

export function HeroSection() {
  const { hero } = siteData
  const shouldReduceMotion = useReducedMotion()
  const headlineLetterCount = hero.headline.join('').length
  const copyWordCount = hero.copy.split(' ').length
  const copyDelay = shouldReduceMotion ? 0 : headlineLetterCount * letterStagger + 0.18
  const buttonDelay = shouldReduceMotion ? 0 : copyDelay + copyWordCount * wordStagger + 0.16
  const browserDelay = shouldReduceMotion ? 0 : buttonDelay + 0.36

  return (
    <section
      className="hero-background flex h-[850px] flex-col items-center overflow-hidden px-6 pt-20 pb-0"
      data-section="hero"
      id="hero"
    >
      <div className="flex flex-col items-center gap-[25px] text-center">
        <h1 aria-label={hero.headline.join(' ')} className="type-hero text-white">
          {shouldReduceMotion ? (
            <>
              <span className="text-white/70">{hero.headline[0]}</span>
              <br />
              {hero.headline[1]}
            </>
          ) : (
            <>
              <AnimatedLetters className="text-white/70">{hero.headline[0]}</AnimatedLetters>
              <br />
              <AnimatedLetters delay={hero.headline[0].length * letterStagger + 0.04}>
                {hero.headline[1]}
              </AnimatedLetters>
            </>
          )}
        </h1>
        <p className="type-body max-w-[628px] text-white/80">
          {shouldReduceMotion ? hero.copy : <AnimatedWords delay={copyDelay}>{hero.copy}</AnimatedWords>}
        </p>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: buttonDelay, duration: itemDuration, ease: [0.22, 1, 0.36, 1] }}
        >
          <IconTextButton as="a" href="/contact">
            {hero.action}
          </IconTextButton>
        </motion.div>
      </div>
      <motion.div
        className="mt-10 h-[555px] w-full max-w-[1049px]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 140 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ delay: browserDelay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrowserMockup
          alt={hero.mockup.headline}
          className="h-full w-full"
          image={siteData.assets.heroScreen}
          mobileImage={siteData.assets.heroScreenMobile}
          imageClassName="h-[649px] object-cover object-top max-md:h-[420px]"
        />
      </motion.div>
    </section>
  )
}
