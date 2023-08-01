import React, { ReactNode } from 'react';
import { Modal, Box, Button } from '@mui/material';
import styles from './style.module.css';

type ModalWindowProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
};

const ModalWindow = ({ open, handleClose, title, children }: ModalWindowProps) => {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalContainer}>
                <form className={styles.modalContent}>
                    <h2>{title}</h2>
                    {children}
                    <Button onClick={handleClose}>Close</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default ModalWindow;
