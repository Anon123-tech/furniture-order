// eslint-disable-next-line
import React, {useEffect, useState} from 'react';

export function useResidue(total, prepaymentInRub) {
    const [residue, setResidue] = useState(0);

    useEffect(() => {
        let difference = Math.round(total - prepaymentInRub);
        difference = difference > 0 ? difference : 0;
        setResidue(difference);
    }, [total, prepaymentInRub]);
    return residue;
}