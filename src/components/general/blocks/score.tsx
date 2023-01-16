import React from 'react'

const determineScore = (score?: number) => {
  if (typeof score === 'undefined') {
    return 'N'
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
    <div
      className='text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium md:font-bold w-7 md:w-16'
      title={`Average ${score}`}
    >
      {determineScore(score)}
    </div>
  )
}
