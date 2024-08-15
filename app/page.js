'use client'

import { Box, Button, Stack, TextField, CircularProgress, Typography, Divider } from '@mui/material'
import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [chats, setChats] = useState({
    General: [{ role: 'assistant', content: `Hi! This is the General chat. How can I help you?` }],
    Support: [{ role: 'assistant', content: `Hi! This is the Support chat. How can I assist you?` }],
  })
  
  const [selectedChat, setSelectedChat] = useState('General') 
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [newChatName, setNewChatName] = useState('')

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return

    setIsLoading(true)

    setChats((prevChats) => ({
      ...prevChats,
      [selectedChat]: [
        ...prevChats[selectedChat],
        { role: 'user', content: message },
        { role: 'assistant', content: '' },
      ],
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: message }),
      })

      const result = await response.json()
      const text = result.message || 'Sorry, there was an error processing your request.'

      setChats((prevChats) => ({
        ...prevChats,
        [selectedChat]: prevChats[selectedChat].map((msg, index) =>
          index === prevChats[selectedChat].length - 1
            ? { role: 'assistant', content: text }
            : msg
        ),
      }))
    } catch (error) {
      console.error('Error sending message:', error)
      setChats((prevChats) => ({
        ...prevChats,
        [selectedChat]: [...prevChats[selectedChat], { role: 'assistant', content: 'Sorry, there was an error processing your request.' }],
      }))
    } finally {
      setIsLoading(false)
      setMessage('')
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats[selectedChat]])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleAddChat = () => {
    if (!newChatName.trim() || chats[newChatName]) return

    setChats((prevChats) => ({
      ...prevChats,
      [newChatName]: [{ role: 'assistant', content: `Hi! This is the ${newChatName} chat. How can I help you?` }],
    }))
    setSelectedChat(newChatName)
    setNewChatName('')
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
    >
    
      <Box
        width="30%"
        bgcolor="background.paper"
        borderRight="1px solid #ccc"
        p={2}
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h6" component="div" mb={2} align="center" bgcolor="#766faf" color="white" p={1}>
          AI Virtual Assistant
        </Typography>
        <Divider />
        <Stack spacing={2} mt={2}>
          {Object.keys(chats).map((chatName) => (
            <Button
              key={chatName}
              variant={selectedChat === chatName ? 'contained' : 'outlined'}
              onClick={() => setSelectedChat(chatName)}
            >
              {chatName} Chat
            </Button>
          ))}
          <TextField
            label="New Chat"
            fullWidth
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddChat()}
            placeholder="Enter chat name"
          />
          <Button
            variant="outlined"
            onClick={handleAddChat}
          >
            Add Chat
          </Button>
        </Stack>
      </Box>

     
      <Box
        width="70%"
        display="flex"
        flexDirection="column"
        p={2}
      >
       
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <Typography variant="h6" component="div" align="center">
            {selectedChat} Chat
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Hello, this is a virtual assistant bot! Feel free to ask it any questions you may have and it will do its best to respond! 
            Suggestions: skincare tips, book recommendations, recipes to make, make a study guide, etc.
          </Typography>
        </Stack>

        <Stack
          direction={'column'}
          width="100%"
          height="calc(100vh - 180px)"  
          border="1px solid black"
          p={2}
          spacing={3}
          overflow="auto"
        >
          {chats[selectedChat].map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
              >
                {message.content}
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>

      
        <Stack direction={'row'} spacing={2} mt={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Send'}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}