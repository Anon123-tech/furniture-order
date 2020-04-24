import React, {Fragment} from 'react';
import defaultInput from './Input';
import './FormField.css'

export default React.forwardRef(FormField);

const unlabeledInputTypes = ['hidden', 'button'];

function FormField({inputComponent, labelClass, ...inputProps}, ref) {
    const InputComponent = inputComponent || defaultInput;
    const input = React.cloneElement(<InputComponent/>, {
        ...inputProps,
        ref,
    });
    const isLabeled = !unlabeledInputTypes.includes(inputProps.type);
    const isCheckbox = inputProps.type === 'checkbox';
    let formField;
    if (isLabeled) {
        if (isCheckbox) {
            formField =
                <Fragment>
                    <label
                        htmlFor={inputProps.name}
                        className='FormField-checkbox-label'>
                        <span>{inputProps.label}</span>
                    </label>
                    {input}
                </Fragment>
        } else {
            formField = <Fragment>
                <label
                    htmlFor={inputProps.name}
                    className='FormField-label'>
                    {inputProps.label}
                </label>
                {input}
            </Fragment>
        }
    } else {
        formField = '';
    }

    return (
        <div className='FormField'>
            {formField}
        </div>
    );
}

FormField.defaultProps = {
    required: true,
    autocomplete: 'off'
};