import express from 'express';
const router = express.Router();
import { db } from '../models/index.js';

const getUpdatedSequence = async (sequenceName) => {
  const res = await db.Counter.findOneAndUpdate(
    {_id: sequenceName},
    {$inc: {seq: 1}},
    {new: true},
  );

  return res.seq;
}

router.post('/register', async (req, res) => {
 try {
  const { clientFirstName , clientLastName, clientEmail,  clientPhoneNumber, clientCity, clientPassword } = req.body;

  const clientExists = await db.Client.findOne({clientEmail});

  if(clientExists !== null) {
    res.status(409).json({message: "Client already exists"})
  } else {
    const sequenceValue = await getUpdatedSequence('client')

    await db.Client.create({
      clientID: sequenceValue,
      clientFirstName,
      clientLastName,
      clientEmail,
      clientPhoneNumber,
      clientCity,
      clientPassword,
      isDeleted: false,
    })

    res.status(201).json({ message: 'Client Registered' })
  }
 } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
 }
})

export default router;