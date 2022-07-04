import * as React from 'react';
import {
    Button,
    Input,
    InputGroup
} from "reactstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import './css/index.scoped.css'

interface AddOrRemoveQuantityProps {
    value: number | string,
    onChange: any,
    max?: number,
    disabled?: boolean
}

const AddOrRemoveQuantity: React.FunctionComponent<AddOrRemoveQuantityProps> = (props) => {
    const { value, onChange, max, disabled } = props
    return (
        <InputGroup size="sm" className='product-quantity-container'>
            <Button
                className='minus'
                color="dark-grey-1"
                onClick={
                    () => onChange && onChange((+value) - 1,"DecreaseQuantity")
                }
                disabled={disabled || (+value === 1 || !value)}
            >
                <FaMinus />
            </Button>
            <Input
                type="number"
                value={value}
            />
            <Button
                className='plus'
                onClick={
                    () => onChange && onChange((+value) + 1,"IncreaseQuantity")
                }
                disabled={disabled || (max !== undefined && (+value >= max))}
            >
                <FaPlus />
            </Button>
        </InputGroup >
    );
}

export default AddOrRemoveQuantity;