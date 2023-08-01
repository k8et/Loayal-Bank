import React, {useEffect} from 'react';

interface MessageModalProps {
    onClose: () => void;
    message: string | null;
}

const MessageModal: React.FC<MessageModalProps> = ({ onClose, message }) => {
    useEffect(() => {
        const timer =
            setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
            }}
        >
            <div
                style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    maxWidth: '90%',
                }}
            >
                <h2>{message}</h2>
            </div>
        </div>
    );
};

export default MessageModal;
