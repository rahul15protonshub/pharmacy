import * as React from 'react';
import './assets/css/simple-card.css';

interface SimpleCardProps {
    image?: string,
    content: any,
    onClick?: Function
    // size:'lg'|'md'
}

const SimpleCard: React.FunctionComponent<SimpleCardProps> = (props) => {
    const { image, content, onClick: handleClick } = props
    return (
        <div
            className='simple-card simple-card--hover simple-card--size-lg'
            onClick={() => typeof handleClick === 'function' && handleClick()}
        >
            <img
                className='simple-card__image img-fluid'
                src={image}
                alt="product"
            />
            <div className='simple-card__overlay bd-gray-200'>
                {content}
            </div>
        </div>
    );
}

export default SimpleCard;