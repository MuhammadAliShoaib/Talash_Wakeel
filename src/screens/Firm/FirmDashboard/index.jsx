import React, { useState } from 'react'
import AddLawyerModal from '../../../components/Modal/AddLawyerModal'
import Header from '../../../components/Header'
import { lawyers } from '../../../utils/data'
import { LawyerCard } from '../../../components/Cards/LawyerCard'
import { Button } from '@mui/material'

export const FirmDashboard = () => {


  const [isOpen, setIsOpen] = useState(false)


  const handleChange = (inputField, e) => {
    console.log(inputField, e)
  }

  const handleAddLawyer = () => {
    console.log("Lawyer added")
  }

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <AddLawyerModal onSave={handleAddLawyer} open={isOpen} onClose={() => setIsOpen(false)} />
      <Header title="Dashboard" />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={toggleModal}
          href=""
          size="medium"
          variant="contained"
          sx={{ my: 1, mx: 1.5 }}
        >
          Add Lawyer
        </Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {lawyers.map((lawyer, index) => {
          return (
            <LawyerCard key={index} item={lawyer} />
          )
        })}
      </div>
    </div>
  )
}
