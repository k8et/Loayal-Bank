import * as React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import styles from './style.module.css'

interface Message {
    from: 'user' | 'bot';
    text: string;
}

const predefinedQuestions = [
    'Хочу оставить запрос (email)',
    'Хочу оставить запрос (телефон)',
];

const ChatBot: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [userInput, setUserInput] = useState<string>('');

    const handleClickOpen = () => {
        setOpen(true);
        setMessages([{ from: 'bot', text: 'Чем я могу вам помочь?' }]);
    };

    useEffect(() => {
        if (selectedOption === 'Хочу оставить запрос (email)') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: 'bot', text: 'Введите ваш email:' },
            ]);
            setSelectedOption('email-input');
        } else if (selectedOption === 'Хочу оставить запрос (телефон)') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: 'bot', text: 'Введите ваш номер телефона:' },
            ]);
            setSelectedOption('phone-input');
        }
        else if (selectedOption === 'запрос-ввод') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: 'bot', text: 'Введите ваш запрос.' },
            ]);
        }
        else if (selectedOption === 'финальный-запрос') {
            setMessages((prevMessages) => [
                ...prevMessages,
                { from: 'bot', text: 'Ваш запрос отправлен, мы свяжемся с вами по указанаму контакту.' },
            ]);
        }
    }, [selectedOption]);


    const handleClose = () => {
        setOpen(false);
        setMessages([]);
        setSelectedOption('');
        setUserInput('');
    };

    const handleUserMessage = () => {
        const newMessage: Message = { from: 'user', text: userInput };

        if (selectedOption === 'phone-input' || selectedOption === 'email-input') {
            setMessages((prevMessages) => [
                ...prevMessages,
                newMessage,
            ]);
            setSelectedOption('запрос-ввод');
            console.log('email')
        }
        if(selectedOption === 'запрос-ввод'){
            setMessages((prevMessages) => [
                ...prevMessages,
                newMessage,
            ]);
            setSelectedOption('финальный-запрос')
        }
        setUserInput('')
    };

    return (
        <div className={styles.chatBot}>
            <IconButton aria-label="chat" onClick={handleClickOpen}>
                <ChatIcon />
            </IconButton>
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
                <DialogTitle>ChatBot</DialogTitle>
                <DialogContent>
                    <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                        {messages.map((message, index) => (
                            <ListItem
                                key={index}
                                alignItems="flex-start"
                                sx={{
                                    justifyContent: message.from === 'bot' ? 'flex-start' : 'flex-end',
                                }}
                            >
                                <ListItemText
                                    primary={message.from === 'bot' ? 'Bot' : 'User'}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {message.text}
                                        </Typography>
                                    }
                                    sx={{
                                        backgroundColor: message.from === 'bot' ? '#e0e0e0' : '#1e88e5',
                                        borderRadius: '8px',
                                        p: 1,
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    {messages.length === 0 && (
                        <Typography align="center" color="textSecondary">
                            Откройте чат, чтобы начать разговор.
                        </Typography>
                    )}
                    {messages.length > 0 && selectedOption === '' && (
                        <Select
                            value=""
                            onChange={(event) => setSelectedOption(event.target.value as string)}
                            displayEmpty
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            <MenuItem disabled value="">
                                Выберите действие
                            </MenuItem>
                            {predefinedQuestions.map((question, index) => (
                                <MenuItem key={index} value={question}>
                                    {question}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                    {messages.length > 0 && selectedOption !== '' && (
                        <>
                            <TextField
                                type="text"
                                value={userInput}
                                onChange={(event) => setUserInput(event.target.value)}
                                fullWidth
                                sx={{ mt: 2 }}
                            />
                            <IconButton aria-label="send" onClick={handleUserMessage}>
                                <SendIcon />
                            </IconButton>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ChatBot;
