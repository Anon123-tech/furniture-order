import React, {useEffect, useRef} from 'react';

export default function ProductTableCell({ onChange, value, contentEditable, ...rest}) {
    const cellRef = useRef(null);
    
    useEffect(() => {
        cellRef.current.innerText = value // set initial values on the first render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    contentEditable = contentEditable === undefined ? true : contentEditable
    return (
        <td
            ref={cellRef}
            contentEditable={contentEditable}
            onInput={event => {
                onChange(event.target.innerText)
            }}
            {...rest}
            >
        </td>

    )
}