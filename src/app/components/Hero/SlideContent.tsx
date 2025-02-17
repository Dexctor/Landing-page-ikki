/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion'

interface SlideContentProps {
  title: string
  description?: string
  features?: string[]
  cta: string
  highlight?: string
}

export const SlideContent = ({ 
  title, 
  description, 
  features, 
  cta, 
  highlight 
}: SlideContentProps) => {
  const formattedTitle = highlight ? (
    <span>
      {title.replace(highlight, '')}
      <span className="text-emerald-400">{highlight}</span>
    </span>
  ) : title

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="bg-gradient-to-br from-black/80 to-black/60
                backdrop-blur-lg rounded-3xl p-6 md:p-8 lg:p-12 
                text-white border border-white/10 shadow-2xl
                hover:shadow-emerald-500/10 transition-all duration-700
                relative overflow-hidden group select-none
                min-h-[400px] md:min-h-[450px] lg:min-h-[500px]
                flex flex-col justify-between"
    >
      <div className="space-y-6 md:space-y-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                     bg-gradient-to-r from-white via-emerald-200 to-emerald-400 
                     bg-clip-text text-transparent leading-tight tracking-tight"
        >
          {formattedTitle}
        </h2>

        <div className="text-sm sm:text-base md:text-lg text-gray-200 
                      space-y-4 leading-relaxed tracking-wide"
        >
          {description && (
            <p className="text-gray-50 font-medium leading-relaxed">{description}</p>
          )}

          {features && (
            <div className="flex flex-col gap-4">
              <p className="text-gray-50 font-medium leading-relaxed">
                Vous souhaitez bénéficier d'un jumeau numérique de votre bien immobilier pour :
              </p>
              <ul className="list-none space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-emerald-400 font-semibold text-lg tracking-wide
                   mt-6 md:mt-8 lg:mt-10">
        {cta}
      </p>
    </motion.div>
  )
} 