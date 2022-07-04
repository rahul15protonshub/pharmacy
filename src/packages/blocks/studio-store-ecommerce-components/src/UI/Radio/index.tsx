import * as React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import './css/index.scoped.css';

interface RadioProps {
    inline?: boolean,
    name: string,
    checked: boolean,
    id: any,
    label: string | any,
    onChange: any,
    [key: string]: any
}

const Radio: React.FunctionComponent<RadioProps> = (props) => {
    const {
        inline,
        name,
        checked,
        id,
        label,
        onChange: handleChange,
        ...rest
    } = props
    return (
        <FormGroup
            check
            className='custom-radio'
            inline={inline}
        >
            <Input
                name={name}
                type="radio"
                checked={checked}
                id={id}
                onChange={handleChange}
                {...rest}
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

export default Radio;