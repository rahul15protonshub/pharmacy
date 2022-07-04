import * as React from 'react';
import { Card as CustomCard, CardBody } from 'reactstrap';
import './css/index.scoped.css';

interface CardProps {
    size?: 'lg' | 'md' | 'sm',
    className?: string
}

const Card: React.FunctionComponent<CardProps> = (props) => {
    const { children, size, className } = props
    return (
        <CustomCard className={`custom-card custom-card--size-${size} ${className}`}>
            {children}
        </CustomCard>
    );
}

Card.defaultProps = {
    size: 'lg'
}

export default Card;