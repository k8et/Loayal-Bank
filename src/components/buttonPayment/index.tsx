import React from "react";
import Button from '@mui/material/Button';

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    children: React.ReactNode;
}

const ButtonPayment: React.FC<ButtonProps> = ({ type, onClick, children }) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            sx={{
                backgroundColor: '#0070f3',
                color: '#fff',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#0056b3',
                },
            }}
        >
            {children}
        </Button>
    );
};

export default ButtonPayment;
