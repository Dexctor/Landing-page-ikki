import type { TimeLeft } from '../hooks/useIcoTimer'
import { motion } from 'framer-motion'

interface TimeUnitProps {
  value: string
  unit: string
}

const TimeUnit = ({ value, unit }: TimeUnitProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-black/40 rounded-lg p-3 border border-emerald-500/20 text-center"
  >
    <div className="text-3xl font-bold text-white">{value}</div>
    <div className="text-emerald-400 text-sm uppercase">{unit}</div>
  </motion.div>
)

export const IcoTimer = ({ timeLeft }: { timeLeft: TimeLeft }) => (
  <div className="grid grid-cols-4 gap-4">
    {Object.entries(timeLeft).map(([unit, value]) => (
      <TimeUnit 
        key={unit} 
        value={value} 
        unit={unit} 
      />
    ))}
  </div>
) 