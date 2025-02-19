import { motion } from 'framer-motion'
import type { IcoStatusProps } from '../types'

const StatusIndicator = ({ isLive }: { isLive: boolean }) => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <motion.div 
        className={`h-3 w-3 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <div className={`absolute inset-0 rounded-full animate-ping opacity-75 
                    ${isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
    </div>
    <span className={`font-medium tracking-wide ${isLive ? 'text-emerald-400' : 'text-amber-400'}`}>
      {isLive ? 'ICO is Live' : 'ICO Coming Soon'}
    </span>
  </div>
)

const containerStyles = `
  relative overflow-hidden rounded-3xl bg-black/70 
  backdrop-blur-xl p-6 mb-8 border border-violet-500/20
  hover:border-emerald-500/20 transition-all duration-300
`

export const IcoStatus = ({ isLive, totalRaised }: IcoStatusProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={containerStyles}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-violet-500/5 to-transparent 
                    opacity-50 transition-opacity duration-300" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <StatusIndicator isLive={isLive} />
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-slate-400 text-sm mb-1">Total Raised</p>
            <motion.p 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className='text-emerald-500 mr-3'>$</span>
              {totalRaised.toLocaleString()}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 border border-emerald-500/10 rounded-2xl 
                    group-hover:border-emerald-500/20 transition-colors duration-300" />
    </motion.div>
  )
} 