import React from 'react'

const determineScore = (score: number) => {
  if (score === 100) {
    return 'S'
  }
  if (score >= 95) {
    return 'A+'
  }
  if (score >= 90) {
    return 'A'
  }
  if (score >= 85) {
    return 'B+'
  }
  if (score >= 80) {
    return 'B'
  }
  if (score >= 75) {
    return 'C+'
  }
  if (score >= 70) {
    return 'C'
  }
  if (score >= 65) {
    return 'D+'
  }
  if (score >= 60) {
    return 'D'
  }
  return 'F'
}

export const Score = ({ score }: { score?: number }) => {
  return (
    <div className='text-lg md:text-2xl lg:text-3xl font-bold'>
      {determineScore(score || 0)}
    </div>
  )
}
