export interface IcoTimerProps {
  endDate: string | Date
}

export interface IcoStatusProps {
  isLive: boolean
  totalRaised: number
}

export interface TokenPriceProps {
  currentPrice: number
  nextPrice: number
  progressPercentage: number
}

export interface PurchaseFormProps {
  currentPrice: number
  onPurchase: (amount: number, mode: PaymentMode) => Promise<void>
  onPromoCodeApply: (code: string) => Promise<void>
  usdAmount: string
  setUsdAmount: (amount: string) => void
  paymentMode: PaymentMode
  setPaymentMode: (mode: PaymentMode) => void
  isProcessing: boolean
  calculateMkiAmount: (amount: string) => string
  minAmount: number
  maxAmount: number
}

export type PaymentMode = 'CARD' | 'CRYPTO'

export interface IcoConfig {
  endDate: string | Date
  initialPrice: number
  nextPrice: number
  totalCollected: number
  isLive: boolean
  minPurchaseAmount: number
  maxPurchaseAmount: number
} 