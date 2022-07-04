import * as React from 'react';
import { Modal, ModalBody, Button, ModalFooter } from 'reactstrap'
import { closeBtn } from './assets';
import './css/index.scoped.css';

interface NotifyModalProps {
    show: boolean,
    toggle: Function,
    heading?: string,
    desc?: string
}

const NotifyModal: React.FunctionComponent<NotifyModalProps> = (props) => {
    const { show, toggle, heading, desc } = props
    return (
        <Modal
            isOpen={show}
            toggle={() => toggle()}
            modalClassName="notify-modal-container"
            centered
        >
            <ModalBody>
                <img
                    className='close-icon'
                    src={closeBtn}
                    onClick={() => toggle()}
                />
                <h4 className='heading mb-4'>
                    {heading}
                </h4>
                <p className='desc'>
                    {desc}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary-1"
                    onClick={() => toggle()}
                    block
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default NotifyModal;