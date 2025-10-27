import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const ChatPage = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id)) || {};
  const sellerName = product.sellerId || "Seller";
  const productName = product.title || "Item";

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { sender: "buyer", text: newMessage }]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Box sx={{ padding: 4, maxWidth: "600px", margin: "0 auto" }}>
      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, backgroundColor: "steelblue", "&:hover": { backgroundColor: "steelblue" } }}
      >
        Back
      </Button>

      <Typography variant="h5" gutterBottom>
        Chat with Seller ({sellerName}) - ({productName})
      </Typography>

      <Paper
        sx={{
          minHeight: "300px",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mb: 2,
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === "buyer" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "buyer" ? "steelblue" : "#e0e0e0",
              color: msg.sender === "buyer" ? "#fff" : "#000",
              padding: "8px 12px",
              borderRadius: 2,
              maxWidth: "70%",
            }}
          >
            {msg.text}
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Paper>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          sx={{ backgroundColor: "steelblue", "&:hover": { backgroundColor: "steelblue" } }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
