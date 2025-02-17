'use client'

import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Hero = () => {
  const [showCarousel, setShowCarousel] = useState(true)

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
  }

  const slides = [
    {
      title: "MyIkki Les inscriptions pour la phase de test sont ouvertes.",
      description: (
        <div className="flex flex-col gap-4">
          <p>Vous souhaitez bénéficier d&apos;un jumeau numérique de votre bien immobilier pour :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Avancer sur vos projets de travaux d&apos;aménagement ou de rénovation?</li>
            <li>Faire réaliser des devis sur l&apos;existant par des artisans</li>
          </ul>
          <p>Découvrez dès maintenant si votre bien est éligible à notre phase de test.</p>
          <p className="text-emerald-400 font-semibold mt-2">
            Découvrez vite si vous êtes éligible pour tester notre solution sur votre bien immobilier!
          </p>
        </div>
      )
    },
    {
      title: "Le meilleur outil pour piloter tous vos projets immobilier.",
      description: (
        <div className="flex flex-col gap-4">
          <p>Propriétaires ou en cours d&apos;achat simuler votre chantier avant de vous lancer!</p>
          <p className="text-emerald-400 font-semibold mt-2">
            Découvrez pourquoi IKKI est fait pour vous
          </p>
        </div>
      )
    },
    {
      title: "MyIkki Les inscriptions pour la phase de test sont ouvertes.",
      description: (
        <div className="flex flex-col gap-4">
          <p>Vous souhaitez bénéficier d&apos;un jumeau numérique de votre bien immobilier pour :</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Avancer sur vos projets de travaux d&apos;aménagement ou de rénovation?</li>
            <li>Faire réaliser des devis sur l&apos;existant par des artisans</li>
          </ul>
          <p>Découvrez dès maintenant si votre bien est éligible à notre phase de test.</p>
          <p className="text-emerald-400 font-semibold mt-2">
            Découvrez vite si vous êtes éligible pour tester notre solution sur votre bien immobilier!
          </p>
        </div>
      )
    },
    {
      title: (
        <span>
          DECOUVREZ NOTRE <span className="text-emerald-400">LIVRE BLANC</span>
        </span>
      ),
      description: (
        <div className="flex flex-col gap-4">
          <p>
            Explorez notre livre blanc pour découvrir comment Myikki connecte l&apos;ensemble
            des acteurs de l&apos;immobilier grâce à un jumeau numérique et à son écosystème
            à valeur ajoutée grâce à son Token IkkI.
          </p>
          <p className="text-emerald-400 font-semibold mt-2">
            Découvrez dès maintenant comment ce token utilitaire va transformer le marché de l&apos;immobilier
          </p>
        </div>
      )
    }
  ]

  return (
    <section className="relative w-full h-full">
      {/* Vidéo en arrière-plan */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/back.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>

      {/* Overlay avec dégradé */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      {/* Bouton pour basculer l'affichage du carousel */}
      <button
        onClick={() => setShowCarousel(!showCarousel)}
        className="absolute top-28 right-4 z-[60] px-6 py-2.5 bg-emerald-500/80 backdrop-blur-sm 
                  rounded-lg text-white hover:bg-emerald-400/80 transition-all duration-300 
                  font-medium text-sm"
      >
        {showCarousel ? 'Voir la vidéo' : 'Voir le carousel'}
      </button>

      {/* Carousel */}
      {showCarousel && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full max-w-5xl px-4 md:px-8">
            <div className="slick-custom">
              <Slider {...sliderSettings}>
                {slides.map((slide, index) => (
                  <div key={index} className="outline-none px-4 py-6 md:py-8">
                    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-10 
                                  text-white border border-white/10 shadow-2xl">
                      <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 
                                   bg-gradient-to-r from-white to-emerald-300 
                                   bg-clip-text text-transparent">
                        {slide.title}
                      </h2>
                      <div className="text-base md:text-lg text-gray-100 space-y-4 
                                    leading-relaxed">
                        {typeof slide.description === 'string' 
                          ? <p>{slide.description}</p> 
                          : slide.description
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
