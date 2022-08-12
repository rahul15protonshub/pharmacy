import React, {useState, useEffect} from 'react';
//@ts-ignore
import { Card, CardBody } from 'reactstrap';
import Accordion from '../../../../studio-store-ecommerce-components/src/Accordion';
import PromotionBanner from '../../../../studio-store-ecommerce-components/src/PromotionBanner';
import { Scrollbars } from 'react-custom-scrollbars';

import SimpleVerticalNav from '../../../../studio-store-ecommerce-components/src/Navs/SimpleVerticalNav';

interface LeftContentProps {
    data: any[]
    onSelectSubCategory?: (category: any, id: number) => void
    onSelectCategory?: (id: number) => void
    banners: any[]
}

const LeftContent: React.FunctionComponent<LeftContentProps> = ({ data, onSelectSubCategory, banners, onSelectCategory }) => {
    
    const [activeSubCategory, setActiveSubCategory] = useState<number|null>(0)
    const [activeCategory, setActiveCategory] = useState<number|null>(0)


    return (
        <aside className='h-100 d-flex flex-column'>
            <Card className='home-category'>
                <CardBody className='px-3 home-category__card h-100 d-flex flex-column'>
                    <div className='home-category__heading d-flex'>
                        <span>Our Products</span>
                        <hr className='flex-grow-1 ms-3 home-category__heading-line' />
                    </div>
                    <div className='flex-grow-1 overflow-hidden'>
                        <Scrollbars autoHide>
                            <div className='home-category__category_list pe-4'>
                            <Accordion
                                label="New Arrivals"
                                onHeaderClick={() => {
                                    setActiveCategory(0)
                                    setActiveSubCategory(null)
                                    onSelectCategory?.(0)
                                }}
                                className="mb-2"
                                isActive={activeCategory === 0}
                            />
                                {
                                    data.map(category => (
                                        <Accordion
                                            key={category.attributes.id}
                                            isOpen={activeSubCategory === category.attributes.id}
                                            label={category.attributes.name}
                                            onHeaderClick={() => {
                                                setActiveSubCategory(activeSubCategory === category.attributes.id ? null : category.attributes.id)
                                            }}
                                            className="mb-2"
                                            content={
                                                <SimpleVerticalNav
                                                    list={category.attributes.sub_categories.map((subcat: any) => ({
                                                        label: subcat.name,
                                                        value: subcat.id,
                                                        navItem: subcat
                                                    }))}
                                                    onClick={(item, id) => {
                                                        setActiveCategory(category.attributes.id)
                                                        onSelectSubCategory?.(item, id)
                                                    }}
                                                />
                                            }
                                        />
                                    ))
                                }
                            </div>
                        </Scrollbars>
                    </div>
                </CardBody>
            </Card>
            <div className='home-promotion-banner'>
                {
                    banners?.length > 0 && <PromotionBanner
                    src={banners[0].attributes?.url}
                    label="Promotion"
                />
                }
            </div>
        </aside>
    );
}

export default LeftContent;