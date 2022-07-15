import React, {useState} from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './css/style.css';

export interface NavItemProps {
    label: string,
    value: any,
    navItem: any,
}

interface SimpleVerticalNavProps {
    list: NavItemProps[],
    onClick?: (navItem: any, value: number) => void
}

export const SimpleVerticalNav: React.FunctionComponent<SimpleVerticalNavProps> = (props) => {
    const { list, onClick } = props
    const [activeItem, setActiveItem] = useState()
    return (
        <Nav vertical tabs className='simple-vertical-tab'>
            {
                list.map(item => (
                    <NavItem key={item.value} className="simple-vertical-tab__item">
                        <NavLink href='#' active={activeItem === item.value}
                            onClick={
                                (e) => {
                                    e.preventDefault();
                                    setActiveItem(item.value)
                                    onClick?.(item.navItem, item.value);
                                }
                            }
                            className="simple-vertical-tab__link"
                        >
                            {item?.label}
                        </NavLink>
                    </NavItem>
                ))
            }
        </Nav>
    );
}