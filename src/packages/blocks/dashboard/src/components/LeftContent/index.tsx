import * as React from 'react';
import { useState } from 'react';
//@ts-ignore
import { Card, CardBody } from 'reactstrap';
import Accordion from '../../../../studio-store-ecommerce-components/src/Accordion';
import PromotionBanner from '../../../../studio-store-ecommerce-components/src/PromotionBanner';
import { potraitHand } from '../../assets';
import { Scrollbars } from 'react-custom-scrollbars';

import SimpleVerticalNav from '../../../../studio-store-ecommerce-components/src/Navs/SimpleVerticalNav';

interface LeftContentProps {
    data: any[]
    onSelectSubCategory?: (category: any, id: number) => void
    banners: any[]
}

const LeftContent: React.FunctionComponent<LeftContentProps> = ({ data, onSelectSubCategory, banners }) => {
    
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
                                {
                                    data.map(category => (
                                        <Accordion
                                            key={category.attributes.id}
                                            isOpen={activeCategory === category.attributes.id}
                                            label={category.attributes.name}
                                            toggle={() => {
                                                setActiveCategory(activeCategory === category.attributes.id ? null : category.attributes.id)
                                            }}
                                            className="mb-4"
                                            content={
                                                <SimpleVerticalNav
                                                    list={category.attributes.sub_categories.map((subcat: any) => ({
                                                        label: subcat.name,
                                                        value: subcat.id,
                                                        navItem: subcat
                                                    }))}
                                                    onClick={(item, id) => onSelectSubCategory?.(item, id)}
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