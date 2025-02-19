/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { IcoTimer } from './components/IcoTimer'
import { PurchaseForm } from './components/PurchaseForm'
import { useIcoTimer } from './hooks/useIcoTimer'
import { useTokenPurchase } from './hooks/useTokenPurchase'
import { DEFAULT_CONFIG } from './constants'
import type { IcoConfig } from './types'

const Ico = ({ config = DEFAULT_CONFIG }: { config?: Partial<IcoConfig> }) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config }
  const timeLeft = useIcoTimer(finalConfig.endDate)
  const {
    usdAmount,
    setUsdAmount,
    paymentMode,
    setPaymentMode,
    isProcessing,
    calculateMkiAmount,
    handlePurchase
  } = useTokenPurchase(finalConfig.initialPrice)

  const handlePromoCodeApply = async (code: string) => {
    // Implement promo code logic
    console.log('Applying promo code:', code)
  }

  return (
    <section className="relative w-full min-h-screen bg-black isolate">
      {/* Background avec effets */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-black to-black" />
        
        {/* Points lumineux statiques */}
        <div className="absolute inset-0">
          <div className="absolute h-2 w-2 bg-emerald-500/30 rounded-full top-1/4 left-1/4 blur-sm" />
          <div className="absolute h-2 w-2 bg-violet-500/30 rounded-full top-1/3 right-1/3 blur-sm" />
          <div className="absolute h-2 w-2 bg-emerald-500/30 rounded-full bottom-1/4 right-1/4 blur-sm" />
        </div>

        {/* Grille subtile */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]
                      opacity-[0.02]" />
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne de gauche */}
          <div className="space-y-6">
            {/* Timer en haut */}
            <div className="text-emerald-400 text-2xl font-light mb-4">
              Price Will Increase in:
            </div>
            <IcoTimer timeLeft={timeLeft} />

            {/* Partenaires */}
            <div className="mt-12">
              <h3 className="text-xl text-gray-400 mb-6">Nos partenaires</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-xl h-24 border border-emerald-500/20"></div>
                <div className="bg-black/40 rounded-xl h-24 border border-emerald-500/20"></div>
                <div className="bg-black/40 rounded-xl h-24 border border-emerald-500/20"></div>
              </div>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-6">
            {/* Status en haut */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-emerald-400">La Pré-vente est en direct :</div>
              <div className="text-emerald-400">COLLECTE: ${finalConfig.totalCollected.toLocaleString()}</div>
            </div>

            {/* Barre de progression */}
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: '75%' }}></div>
            </div>

            {/* Prix actuels */}
            <div className="text-sm text-gray-400">
              Prix de vente : 1 MKI ={finalConfig.initialPrice}$ | Listing price : 1 MKI : {finalConfig.nextPrice}$
            </div>

            {/* Token Price Info */}
            <div className="bg-black/40 rounded-xl p-6 border border-emerald-500/20">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-gray-400 text-sm">Prix de Référence</div>
                  <div className="text-xl text-white">{finalConfig.initialPrice}$</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 text-sm">Prochain Prix</div>
                  <div className="text-xl text-emerald-400">{finalConfig.nextPrice}$</div>
                  <div className="text-emerald-500 text-sm">(+33.20%)</div>
                </div>
              </div>
            </div>

            {/* Purchase Form */}
            <PurchaseForm
              currentPrice={finalConfig.initialPrice}
              onPurchase={handlePurchase}
              onPromoCodeApply={handlePromoCodeApply}
              usdAmount={usdAmount}
              setUsdAmount={setUsdAmount}
              paymentMode={paymentMode}
              setPaymentMode={setPaymentMode}
              isProcessing={isProcessing}
              calculateMkiAmount={calculateMkiAmount}
              minAmount={finalConfig.minPurchaseAmount}
              maxAmount={finalConfig.maxPurchaseAmount}
            />
          </div>
        </div>
      </div>

      {/* Bordure animée */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </section>
  )
}

export default Ico
