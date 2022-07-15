import * as React from 'react';
import { Collapse } from 'reactstrap';
import './css/style.css';

interface AccordionProps {
    isOpen: boolean,
    label: string,
    toggle: Function,
    content: any,
    className?: string
}

export const Accordion: React.FunctionComponent<AccordionProps> = (props) => {
    const { isOpen, label, toggle, content, className } = props
    return (
        <div className={`${className || ''} accordion custom-accordion`}>
            <div className="accordion-item custom-accordion__item">
                <h2
                    className="accordion-header custom-accordion__header"
                    onClick={() => toggle()}
                >
                    <button
                        className={`accordion-button custom-accordion__header-btn ${isOpen ? 'collapsed' : ''}`}
                    >
                        {label}
                    </button>
                </h2>
                <Collapse isOpen={isOpen}>
                    {content}
                </Collapse>
            </div>
        </div>
    );
}   