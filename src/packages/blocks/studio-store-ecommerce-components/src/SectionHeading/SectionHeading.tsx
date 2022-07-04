import * as React from 'react';
import './assets/css/style.css';
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';
interface SectionHeadingProps {
    name: string,
    className?: string,
    underline?: boolean,
    separator?: boolean,
    link?: Function | string
}

export const SectionHeading: React.FunctionComponent<SectionHeadingProps> = (props) => {
    const { name, className, underline, separator, link } = props
    const underlineEnabled = props.hasOwnProperty('underline') && underline !== false
    const separatorEnabled = props.hasOwnProperty('separator') && separator !== false
    const linkTo = typeof link === 'string' ? link : '#';

    return (
        <div
            className={`${className} section-heading d-flex align-items-center ${separatorEnabled ? "section-heading__text--separator-enabled" : ""}`}
        >
            <h2 className={`section-heading__text  ${underlineEnabled ? "section-heading__text--underline-enabled" : ""}`}>
                {name}
            </h2>
            {
                separatorEnabled && (
                    <hr className="flex-grow-1" />
                )
            }
            {
                link && <Button
                style={{background:'transparent',border : 'none',padding:0}}
                className="section-heading__link text-decoration-none f-md f-s-sm"
                onClick={() => typeof link === 'function' && link()}
            >
                View all
            </Button>
            }
            
        </div>
    );
}

interface MinimalHeadingProps {
    name: string,
    className?: string,
    link?: Function | string
}

export const MinimalHeading: React.FunctionComponent<MinimalHeadingProps> = (props) => {
    const { name, className, link } = props;
    const linkTo = typeof link === 'string' ? link : '#';

    return (
        <div
            className={`${className} section-heading d-flex align-items-center`}
        >
            <h2 className={`section-heading__minimal-text`}>
                {name}
            </h2>
            <Button
                style={{background:'transparent',border : 'none',padding:0}}
                className="section-heading__link text-decoration-none f-md f-s-sm"
                onClick={() => typeof link === 'function' && link()}
            >
                View all
            </Button>
        </div>
    );
}