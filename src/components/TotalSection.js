import './TotalSection.css'

import React from 'react';

export default function TotalSection(props) {
    return (
        <div className='TotalSection'>
            <span>Итого <strong>{props.total}</strong></span>
            <span>Сумма предоплаты <strong>{props.prepaymentInRub}</strong></span>
            <span>Сумма остатка <strong>{props.residue}</strong></span>
        </div>
    )
}