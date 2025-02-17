/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface IcoProps {
  // Props à définir pour l'intégration backend
  initialPrice?: number
  nextPrice?: number
  totalCollected?: number
  currentMkiPrice?: number
  nextMkiPrice?: number
}

const Ico = ({ 
  initialPrice = 0.085, // Prix initial en MKI
  nextPrice = 0.0015,   // Prochain prix
  totalCollected = 6789999, // Montant total collecté
  currentMkiPrice = 0.085,  // Prix actuel du MKI
  nextMkiPrice = 0.0015     // Prochain prix du MKI
}: IcoProps) => {
  // État pour le compte à rebours
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  // État pour le mode de paiement (carte ou crypto)
  const [paymentMode, setPaymentMode] = useState<'CARD' | 'CRYPTO'>('CARD')
  
  // État pour le montant en USD que l'utilisateur souhaite investir
  const [usdAmount, setUsdAmount] = useState<string>('0')
  
  // État pour le solde MKI de l'utilisateur
  const [mkiBalance, setMkiBalance] = useState<string>('0.0')

  // Ajout d'un état pour gérer l'affichage du champ de code promo
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState('')

  // Fonction pour calculer le temps restant
  // TODO: Connecter à l'API pour obtenir la date de fin réelle
  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date('2024-12-31') // À remplacer par la date réelle de fin
      const now = new Date()
      const difference = endDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
          minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
          seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
        })
      }
    }

    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <section className="relative w-full min-h-screen bg-[#0A0B0D] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:px-8 lg:px-16 relative z-10">
        {/* Status Bar */}
        <motion.div 
          {...fadeInUp}
          className="flex flex-col md:flex-row justify-between items-center bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-12 border border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="relative">
              <div className="h-3 w-3 bg-emerald-500 rounded-full" />
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
            <span className="text-emerald-400 font-medium tracking-wide">ICO is Live</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-400 text-sm">Total Raised</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                ${totalCollected.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div 
              {...fadeInUp}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
                Next Price Increase
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="group">
                    <div className="relative bg-black/40 rounded-2xl p-4 border border-white/5 transition-all duration-300 group-hover:border-emerald-500/50">
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                      <span className="relative text-3xl font-bold text-white block text-center">{value}</span>
                    </div>
                    <span className="text-emerald-400 text-sm mt-2 block text-center uppercase tracking-wider">{unit}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between mb-8">
                <div>
                  <h3 className="text-emerald-400 mb-2 text-sm tracking-wider">Current Price</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-white">${currentMkiPrice}</p>
                    <span className="text-emerald-500">USDT</span>
                  </div>
                </div>
                <div className="text-right">
                  <h3 className="text-emerald-400 mb-2 text-sm tracking-wider">Next Price</h3>
                  <div className="flex items-baseline gap-2 justify-end">
                    <p className="text-3xl font-bold text-white">${nextMkiPrice}</p>
                    <span className="text-emerald-500">USDT</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-full rounded-full"
                  />
                </div>
                <div className="absolute -top-1 left-[75%] transform -translate-x-1/2">
                  <div className="w-5 h-5 bg-emerald-400 rounded-full border-4 border-black" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div 
            {...fadeInUp}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
              Purchase MKI Tokens
            </h2>
            
            <div className="flex gap-4 mb-8">
              {(['CARD', 'CRYPTO'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPaymentMode(mode)}
                  className={`
                    flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl transition-all duration-300
                    ${paymentMode === mode 
                      ? 'bg-emerald-500/20 border border-emerald-500 shadow-lg shadow-emerald-500/20' 
                      : 'bg-black/40 hover:bg-black/60 border border-white/5'}
                  `}
                >
                  <Image 
                    src={`/icons/${mode.toLowerCase()}.svg`}
                    alt={mode}
                    width={24}
                    height={24}
                    className="opacity-80"
                  />
                  <span className="text-white font-medium">{mode}</span>
                </button>
              ))}
            </div>

            <div className="space-y-6 mb-8">
              <div className="group bg-black/40 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all duration-300">
                <label className="text-sm text-gray-400 mb-2 block">Amount in USD</label>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 text-2xl">$</span>
                  <input
                    type="number"
                    value={usdAmount}
                    onChange={(e) => setUsdAmount(e.target.value)}
                    className="flex-1 bg-transparent text-white text-2xl font-bold outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">You will receive</span>
                  <div className="flex items-center gap-2">
                    <Image src="/icons/mki-token.svg" alt="MKI" width={20} height={20} />
                    <span className="text-sm text-emerald-400">MKI</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{mkiBalance}</p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-medium py-5 rounded-2xl mb-6 transition-all duration-300 shadow-lg shadow-emerald-500/20">
              Connect Wallet
            </button>

            {/* Updated Promo Code Section with smoother animation */}
            <div className="space-y-4 overflow-hidden">
              <AnimatePresence>
                {showPromoCode && (
                  <motion.div
                    initial={{ 
                      height: 0,
                      opacity: 0,
                      y: -20
                    }}
                    animate={{ 
                      height: 'auto',
                      opacity: 1,
                      y: 0
                    }}
                    exit={{ 
                      height: 0,
                      opacity: 0,
                      y: -20
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      opacity: { duration: 0.2 },
                      height: { duration: 0.3 }
                    }}
                    className="bg-black/40 p-4 rounded-xl border border-white/5"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter your promo code"
                          className="flex-1 bg-transparent text-white px-3 py-2 rounded-lg border border-white/10 focus:border-emerald-500 outline-none transition-colors"
                        />
                        <button 
                          onClick={() => {
                            // Handle promo code validation here
                            console.log('Validating promo code:', promoCode)
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                          Apply
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 justify-center">
                <span className="text-gray-400">Have a promo code?</span>
                <button 
                  onClick={() => setShowPromoCode(!showPromoCode)}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1"
                >
                  {showPromoCode ? 'Hide code' : 'Enter code'}
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{ rotate: showPromoCode ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </motion.svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Ico
