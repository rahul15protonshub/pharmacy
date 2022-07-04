import * as React from 'react';
import './assets/css/BoldCategoryCard.css';

interface CategoryCardProps {
    categoryName: string,
    image: any,
    onClick?: Function,
    noBorderRadius?: boolean
}

const CategoryCard: React.FunctionComponent<CategoryCardProps> = (props) => {
    const { categoryName, image, onClick: handleClick } = props
    const removeBR = props.hasOwnProperty("noBorderRadius") && props.hasOwnProperty("noBorderRadius") !== false
    return (
        <div
            className={`category-bold category-bold--size`}
            onClick={() => handleClick && handleClick()}
        >
            <div className='category-bold__img-container'>
                <img
                    className={`${removeBR ? "rounded-0" : ""} card-img-top category-bold__img `}
                    src={image}
                    alt="Card image cap"

                />
            </div>
            <div className="card-text category-bold__text-container">
                <p className="card-text category-bold__text text-truncate">
                    {categoryName}
                </p>
            </div>
        </div>
    );
}

export default CategoryCard