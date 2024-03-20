import React, { useState } from 'react'
import AddLawyerModal from '../../../components/Modal/AddLawyerModal'

export const FirmDashboard = () => {


  const [isOpen, setIsOpen] = useState(true)


  const handleChange = (inputField, e) => {
    console.log(inputField, e)
  }

  const handleAddLawyer = () => {
    console.log("Lawyer added")
  }

  return (
    <AddLawyerModal onSave={handleAddLawyer} open={isOpen} onClose={() => setIsOpen(false)} />
  )
}
