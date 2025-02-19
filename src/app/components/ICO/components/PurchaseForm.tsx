/* eslint-disable @typescript-eslint/no-unused-vars */
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import type { PurchaseFormProps, PaymentMode } from '../types'

interface ExtendedPurchaseFormProps extends Omit<PurchaseFormProps, 'minAmount' | 'maxAmount'> {
  usdAmount: string
  setUsdAmount: (amount: string) => void
  paymentMode: PaymentMode
  setPaymentMode: (mode: PaymentMode) => void
  isProcessing: boolean
  calculateMkiAmount: (amount: string) => string
  minAmount?: number
  maxAmount?: number
}

const PaymentModeSelector = ({ paymentMode, setPaymentMode }: { paymentMode: PaymentMode, setPaymentMode: (mode: PaymentMode) => void }) => (
  <div className="flex gap-4">
    {(['CARD', 'CRYPTO'] as const).map((mode) => (
      <button
        key={mode}
        onClick={() => setPaymentMode(mode)}
        className={`
          flex-1 py-3 px-4 rounded-lg
          ${paymentMode === mode 
            ? 'bg-emerald-500/20 border-emerald-500' 
            : 'bg-black/40 border-emerald-500/20'}
          border transition-all duration-300
        `}
      >
        <span className="text-white">{mode}</span>
      </button>
    ))}
  </div>
)

const AmountInput = ({ 
  usdAmount, 
  setUsdAmount,
  minAmount,
  maxAmount 
}: { 
  usdAmount: string
  setUsdAmount: (amount: string) => void
  minAmount?: number
  maxAmount?: number 
}) => (
  <div className="bg-black/40 rounded-lg p-4 border border-emerald-500/20">
    <div className="flex items-center">
      <span className="text-emerald-400 text-xl">$</span>
      <input
        type="number"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        className="flex-1 bg-transparent text-white text-xl outline-none ml-2"
        placeholder="0"
        min={minAmount}
        max={maxAmount}
      />
    </div>
  </div>
)

const MkiAmount = ({ usdAmount, calculateMkiAmount }: { usdAmount: string, calculateMkiAmount: (amount: string) => string }) => (
  <div className="bg-black/40 rounded-lg p-4 border border-emerald-500/20">
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image 
          src="/icons/mki-token.svg" 
          alt="MKI" 
          width={24} 
          height={24}
          className="w-6 h-6" 
        />
        <span className="text-emerald-400 ml-2">Solde MKI :</span>
      </div>
      <span className="text-emerald-400">{calculateMkiAmount(usdAmount)} MKI</span>
    </div>
  </div>
)

const AuthenticationOptions = () => (
  <button className="w-full bg-black/40 text-white py-3 rounded-lg border border-emerald-500 flex items-center justify-center gap-2">
    <Image 
      src="/icons/google.svg" 
      alt="Google" 
      width={20} 
      height={20}
      className="w-5 h-5" 
    />
    Login with Google
  </button>
)

const PromoCodeSection = ({ promoCode, setPromoCode, onApply }: { promoCode: string, setPromoCode: (code: string) => void, onApply: (code: string) => void }) => (
  <div className="flex items-center gap-2">
    <input
      type="text"
      placeholder="Have a code promo"
      className="flex-1 bg-black/40 rounded-lg px-4 py-2 border border-emerald-500 text-white"
      value={promoCode}
      onChange={(e) => setPromoCode(e.target.value)}
    />
    <a href="#" className="text-emerald-400 text-sm">Learn more about code promo</a>
  </div>
)

const PurchaseButton = ({ 
  isProcessing, 
  onPurchase,
  paymentMode 
}: { 
  isProcessing: boolean
  onPurchase: (amount: number, mode: PaymentMode) => Promise<void>
  paymentMode: PaymentMode
}) => (
  <button 
    onClick={() => onPurchase(0, paymentMode)}
    disabled={isProcessing}
    className="w-full bg-gray-700 text-white py-3 rounded-lg disabled:opacity-50"
  >
    {isProcessing ? 'Processing...' : 'Comment acheter'}
  </button>
)

export const PurchaseForm = ({ ...props }: ExtendedPurchaseFormProps) => {
  const [showPromoCode, setShowPromoCode] = useState(false)
  const [promoCode, setPromoCode] = useState('')

  return (
    <div className="space-y-4">
      <PaymentModeSelector 
        paymentMode={props.paymentMode} 
        setPaymentMode={props.setPaymentMode} 
      />
      <AmountInput 
        usdAmount={props.usdAmount} 
        setUsdAmount={props.setUsdAmount}
        minAmount={props.minAmount}
        maxAmount={props.maxAmount}
      />
      <MkiAmount 
        usdAmount={props.usdAmount} 
        calculateMkiAmount={props.calculateMkiAmount} 
      />
      <AuthenticationOptions />
      <PromoCodeSection 
        promoCode={promoCode} 
        setPromoCode={setPromoCode} 
        onApply={props.onPromoCodeApply} 
      />
      <PurchaseButton 
        isProcessing={props.isProcessing} 
        onPurchase={props.onPurchase}
        paymentMode={props.paymentMode}
      />
    </div>
  )
}