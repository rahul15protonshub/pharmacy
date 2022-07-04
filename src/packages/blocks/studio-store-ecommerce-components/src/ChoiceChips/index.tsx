import * as React from 'react';
import { Button } from 'reactstrap';
import './css/index.scoped.css';

interface ChoiceChipsProps {
    options: ChipItemProps[],
    value: any,
    onClick?: any
}

interface ChipItemProps {
    label: string,
    value: any,
    disabled?: boolean
}

const ChoiceChips: React.FunctionComponent<ChoiceChipsProps> = (props) => {
    const { options, value, onClick: handleClick } = props
    return (
        <div className='choice-container hstack gap-3 flex-wrap'>
            {
                options.map((data, key) => (
                    <Button
                        key={key}
                        className={`${data.value === value ?
                            'active ' :
                            data.disabled ?
                                'disabled' :
                                ""}`
                        }
                        onClick={() => handleClick && handleClick(data)}
                    >
                        {data.label}
                    </Button>
                ))
            }
        </div>
    );
}

export default ChoiceChips;