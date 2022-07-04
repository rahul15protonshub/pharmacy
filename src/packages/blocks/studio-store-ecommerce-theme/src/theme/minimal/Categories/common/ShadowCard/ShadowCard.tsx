import * as React from 'react';
import './assets/css/style.css';

interface ShadowCardProps {
    categoryName: string,
    image: any,
    onClick?: Function,
    size: 'sm' | 'md',
    noBorderRadius?: boolean
}

export const ShadowCard: React.FunctionComponent<ShadowCardProps> = (props) => {
    const { categoryName, image, onClick: handleClick, size } = props
    const removeBR = props.hasOwnProperty("noBorderRadius") && props.hasOwnProperty("noBorderRadius") !== false
    return (
        <div
            className={`category-minimal category-minimal--size-${size}`}
            onClick={() => handleClick && handleClick()}
        >
            <img
                className={`${removeBR ? "rounded-0" : ""} card-img-top category-minimal__img my-2`}
                src={image}
                alt="Card image cap"

            />
            <div className="mt-1 mt-lg-2">
                <p className="card-text category-minimal__text text-truncate">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}