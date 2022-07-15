import * as React from 'react';
import './css/style.css';

interface PromotionBannerProps {
    src: any,
    className?: string,
    label: string
}

export const PromotionBanner: React.FunctionComponent<PromotionBannerProps> = (props) => {
    const { className, src, label } = props
    return (
        <div className={`${className} promotion-banner`}>
            <h4 className='mb-0 promotion-banner__text'>
                {label}
            </h4>
            <img
                className='promotion-banner__image'
                src={src}
                alt="promotion-banner"
            />
        </div>
    );
}