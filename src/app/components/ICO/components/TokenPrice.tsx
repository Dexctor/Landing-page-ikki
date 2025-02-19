import { motion } from 'framer-motion'
import type { TokenPriceProps } from '../types'

export const TokenPrice = ({ currentPrice, nextPrice, progressPercentage }: TokenPriceProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative overflow-hidden rounded-3xl bg-black/70 
                backdrop-blur-xl p-6 border border-violet-500/20
                hover:border-emerald-500/20 transition-all duration-300"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-violet-500/5 to-transparent 
                    opacity-50 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex justify-between mb-8">
          <div>
            <h3 className="text-emerald-400 mb-2 text-sm tracking-wider font-medium">
              Current Price
            </h3>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-white">
                ${currentPrice}
              </p>
              <span className="text-emerald-500">USDT</span>
            </div>
          </div>
          <div className="text-right">
            <h3 className="text-emerald-400 mb-2 text-sm tracking-wider font-medium">
              Next Price
            </h3>
            <div className="flex items-baseline gap-2 justify-end">
              <p className="text-3xl font-bold text-white">
                ${nextPrice}
              </p>
              <span className="text-emerald-500">USDT</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-300"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-right mt-2 text-sm text-gray-400">
          {progressPercentage}% until next price
        </p>
      </div>
    </motion.div>
  )
} 