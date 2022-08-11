import * as React from 'react';
import { Collapse } from 'reactstrap';
import './css/style.css';

interface AccordionProps {
    isOpen?: boolean,
    label: string,
    onHeaderClick?: () => void,
    content?: any,
    className?: string,
    isActive?: boolean
}

export const Accordion: React.FunctionComponent<AccordionProps> = (props) => {
    const { isOpen, label, onHeaderClick, isActive, content, className } = props
    return (
        <div className={`${className || ''} accordion custom-accordion`}>
            <div className="accordion-item custom-accordion__item" style={{
                backgroundColor: isActive ? 'var(--color-secondary-hover-4)' : undefined
            }}>
                <h2
                    className="accordion-header custom-accordion__header"
                    onClick={() => onHeaderClick?.()}
                >
                     {
                        content ? (
                            <button className={`accordion-button custom-accordion__header-btn ${isOpen ? 'collapsed' : ''}`}>
                                {label}
                            </button>
                        ) : (
                            <button className="custom-accordion__header-btn-no-collapse">
                                {label}
                            </button>
                        )
                    }
                </h2>
                {
                    content && <Collapse isOpen={isOpen}>{content}</Collapse>
                }
            </div>
        </div>
    );
}   