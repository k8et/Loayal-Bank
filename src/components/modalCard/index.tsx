import React, { FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

interface ModalProps {
    onClose: () => void;
    onCardSelection: (currency: string | undefined, cardType: string | undefined, cardColor: string) => void;
}

const Modal: FC<ModalProps> = ({ onClose, onCardSelection }) => {
    const [currency, setCurrency] = useState<string | undefined>(undefined);
    const [cardType, setCardType] = useState<string | undefined>(undefined);

    const handleCardSelection = (cardColor: string) => {
        onCardSelection(currency, cardType, cardColor);
        onClose();
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>
                {!currency && "Выберите валюту карты"}
                {currency && !cardType && "Выберите тип карты"}
                {currency && cardType && "Выберите цвет карты"}
            </DialogTitle>
            <DialogActions>
                {!currency && (
                    <>
                        <Button onClick={() => setCurrency("USD")}>Доллар</Button>
                        <Button onClick={() => setCurrency("UAH")}>Гривна</Button>
                    </>
                )}
                {currency && !cardType && (
                    <>
                        <Button onClick={() => setCardType("Visa")}>Visa</Button>
                        <Button onClick={() => setCardType("Mastercard")}>Mastercard</Button>
                    </>
                )}
                {currency && cardType && (
                    <>
                        <Button
                            onClick={() => handleCardSelection("Black")}
                            color="primary"
                        >
                            Черная карта
                        </Button>
                        <Button
                            onClick={() => handleCardSelection("White")}
                            color="secondary"
                        >
                            Белая карта
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Modal;
