import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import './css/index.scoped.css';

interface CheckboxProps {
    inline?: boolean,
    name: string,
    checked: boolean,
    id: any,
    label: string,
    onChange: any
}

const Checkbox: React.FunctionComponent<CheckboxProps> = (props) => {
    const {
        inline,
        name,
        checked,
        id,
        label,
        onChange: handleChange
    } = props
    return (
        <FormGroup
            check
            className='custom-checkbox'
            inline={inline}
        >
            <Input
                name={name}
                type="checkbox"
                checked={checked}
                id={id}
                onChange={handleChange}
            />
            {' '}
            <Label
                check
                for={id}
            >
                {label}
            </Label>
        </FormGroup>
    );
}

export default Checkbox;