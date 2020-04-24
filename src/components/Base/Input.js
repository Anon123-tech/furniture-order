import React from 'react';
import PropTypes from 'prop-types';

export default React.forwardRef(Input)

function Input(props, ref) {
    return (
        <input
            ref={ref}
            id={props.name}
            required
            {...props}
        />
    )
}

Input.defaultProps = {
    required: true
};
