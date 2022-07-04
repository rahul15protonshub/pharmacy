import * as React from 'react';
import { useState, useEffect } from 'react';
import './assets/css/style.css';

interface ImageLoaderProps {
    src: any,
    [index: string]: any
}

export const ImageLoader: React.FunctionComponent<ImageLoaderProps> = (props) => {
    const [isLoaded, setLoaded] = useState(false);
    const { src, ...rest } = props
    useEffect(() => {
        setLoaded(false)
    }, [src])

    if (isLoaded) {
        return (
            <img
                src={src}
                {...rest}
                onLoad={() => setLoaded(true)}
                hidden={!isLoaded}
            />
        )
    }
    return (
        <div className='image-loader position-relative w-100 h-100 d-flex align-items-center justify-content-center'>
            <img
                src={src}
                {...rest}
                onLoad={() => setLoaded(true)}
                hidden={!isLoaded}
            />
            {!isLoaded && <div className="spinner-border position-absolute" role="status">
                <span className="sr-only"></span>
            </div>}
        </div>
    );
}