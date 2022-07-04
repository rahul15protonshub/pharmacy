import * as React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { IoMdClose } from 'react-icons/io';
import Carousel from "react-elastic-carousel";

interface ProductImageCarouselModalProps {
    images: any,
    isOpen: boolean,
    toggle: React.MouseEventHandler
}

const ProductImageCarouselModal: React.FunctionComponent<ProductImageCarouselModalProps> = (props) => {
    const { images, isOpen, toggle } = props;
    return (
        <Modal
            isOpen={isOpen}
            className="product-image-small-device-carousel"
        >
            <ModalHeader tag="span" >
                <IoMdClose onClick={toggle} />
            </ModalHeader>
            <ModalBody>
                <Carousel
                    isRTL={false}
                    showArrows={false}
                >
                    {
                        images.map(
                            (item: any, idx: any) => {
                                return <>
                                    <img
                                        src={item.attributes.url}
                                        alt={"img " + idx}
                                        className="img-fluid"
                                    />
                                </>
                            }
                        )
                    }
                </Carousel>
            </ModalBody>
        </Modal>
    );
}

export default ProductImageCarouselModal;