import React from 'react'
import { firms } from '../../../utils/data'
import { FirmCard } from '../../../components/Cards/FirmCard'

export const ClientDashboard = () => {
  return (
    <div>
      {firms.map((firm, index) => {
        return (
          <FirmCard key={index} item={firm} />
        )
      })}
    </div>
  )
}
