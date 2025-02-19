/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useCallback, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

import { SLIDER_SETTINGS, SLIDES } from './constants'
import { SlideContent } from './SlideContent'
import { NavigationDots } from './NavigationDots'

const Hero = () => {
  const [showCarousel, setShowCarousel] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Slider>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index)
    sliderRef.current?.slickGoTo(index)
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleSlideChange(index)
    }
  }, [handleSlideChange])

  const sliderSettings = {
    ...SLIDER_SETTINGS,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    adaptiveHeight: false,
  }

  return (
    <section 
      className="relative w-full h-full min-h-[80vh] lg:min-h-screen"
      role="region"
      aria-label="Présentation principale"
    >
      {/* Vidéo en arrière-plan avec fallback */}
      <div className="absolute inset-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="/images/video-fallback.jpg"
        >
          <source src="/video/back.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay optimisé pour le contraste */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"
          aria-hidden="true"
        />
      </div>

      {/* Bouton toggle redesigné */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowCarousel(!showCarousel)}
        className="absolute top-20 md:top-28 right-4 z-[60] p-3
                  bg-gradient-to-br from-white/5 to-white/10
                  hover:from-emerald-500/10 hover:to-emerald-400/20
                  backdrop-blur-md rounded-full
                  border border-white/10 hover:border-emerald-500/20
                  transition-all duration-500
                  focus:ring-2 focus:ring-emerald-400/30
                  focus:ring-offset-2 focus:ring-offset-black/50
                  shadow-lg shadow-black/20
                  hover:shadow-emerald-500/10
                  outline-none group"
        aria-label={showCarousel ? "Voir la vidéo" : "Voir le carousel"}
      >
        {showCarousel ? (
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              times: [0, 0.5, 1]
            }}
          >
            <motion.div
              animate={{ 
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
            >
              <svg 
                className="w-6 h-6 text-white/80 group-hover:text-emerald-400
                          transition-colors duration-500"
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path 
                  d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z"
                />
              </svg>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <svg 
              className="w-6 h-6 text-white/80 group-hover:text-emerald-400
                        transition-colors duration-500" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        )}
      </motion.button>

      {/* Carousel avec améliorations UX */}
      <AnimatePresence mode="wait">
        {showCarousel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="w-full max-w-6xl px-4 md:px-8">
              <div className="slick-custom relative">
                <Slider ref={sliderRef} {...sliderSettings}>
                  {SLIDES.map((slide, index) => (
                    <div 
                      key={index} 
                      className="outline-none px-4 py-6 md:py-8 lg:py-10"
                      role="tabpanel"
                      aria-label={`Slide ${index + 1} sur ${SLIDES.length}`}
                    >
                      <SlideContent {...slide} />
                    </div>
                  ))}
                </Slider>

                <NavigationDots 
                  total={SLIDES.length}
                  current={currentSlide}
                  onSelect={handleSlideChange}
                  onKeyPress={handleKeyPress}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
