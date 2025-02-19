import { useState } from 'react'
import { PaymentMode } from '../types'

export const useTokenPurchase = (currentPrice: number) => {
  const [usdAmount, setUsdAmount] = useState<string>('0')
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('CARD')
  const [isProcessing, setIsProcessing] = useState(false)

  const calculateMkiAmount = (usdAmount: string): string => {
    if (!usdAmount || isNaN(Number(usdAmount))) return '0.0'
    return (Number(usdAmount) / currentPrice).toFixed(2)
  }

  const handlePurchase = async () => {
    try {
      setIsProcessing(true)
      // Implement purchase logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
    } catch (error) {
      console.error('Purchase failed:', error)
      throw error
    } finally {
      setIsProcessing(false)
    }
  }

  return {
    usdAmount,
    setUsdAmount,
    paymentMode,
    setPaymentMode,
    isProcessing,
    calculateMkiAmount,
    handlePurchase
  }
} 