import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import * as React from 'react';
import './css/index.scoped.css';

interface BreadCrumbsProps {
    list: BreadCrumbItem[]
}

interface BreadCrumbItem {
    label: string,
    link: string
}

const BreadCrumbs: React.FunctionComponent<BreadCrumbsProps> = (props) => {
    const { list } = props
    let activeIndex = list.length - 1
    return (
        <Breadcrumb className='custom-breadcrumbs'>
            {
                list.map((item, i) => (
                    <BreadcrumbItem
                        key={i}
                        active={activeIndex === i}
                    >
                        {
                            activeIndex === i ?
                                item.label :
                                <Link to={item.link}>
                                    {item.label}
                                </Link>
                        }
                    </BreadcrumbItem>
                ))
            }
        </Breadcrumb>
    );
}

export default BreadCrumbs;