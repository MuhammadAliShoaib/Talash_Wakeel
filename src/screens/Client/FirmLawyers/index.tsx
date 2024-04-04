import React from 'react'
import { useParams } from 'react-router'
import Header from '../../../components/Header';
import { lawyers } from '../../../utils/data';
import { LawyerCard } from '../../../components/Cards/LawyerCard'

export const FirmLawyers = () => {
    let params = useParams();
    return (
        <>
            <Header title="Szabist Firm" />
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {lawyers.map((lawyer, index) => {
                    return (
                        <LawyerCard key={index} item={lawyer} />
                    )
                })}
            </div>
        </>
    )
}
