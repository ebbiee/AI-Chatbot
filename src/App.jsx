import { useState } from 'react';
import './App.css';

import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;


function App() {

  async function handleFormSubmit(e) {
    e.preventDefault();
    handleSendApphend();
    await axios.post(
  'https://openrouter.ai/api/v1/chat/completions',
  {
    model: 'deepseek/deepseek-r1-distill-llama-70b:free',
    messages: [
      {
        role: 'user',
        content: message
      }
    ]
  },
  {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': '<YOUR_SITE_URL>',
      'X-Title': '<YOUR_SITE_NAME>',  
      'Content-Type': 'application/json'
    }
  }
).then(response => {
  const botMessage = response.data.choices[0].message
  setChat((prevChat) => [...prevChat, botMessage]);

}).catch(error => {
  console.error('Error:', error.response?.data || error.message);
});
  }



  function handleSendApphend(){
    if (!message.trim()) return;

    setChat((prevChat) => [
      ...prevChat,
      { role: 'user', content: message }
    ]);

    setMessage("")
  }
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([])

  return (
   <div className='ai-container'>
  <div className="chat-header">
    <h2>Little Smart Ebenezer</h2>
  </div>

  <div className="chatbot-body">
      {chat.map((message, i) => (<div key={i} className={`chatbot-message ${message.role === "user" ? "user" : "bot"}`}>{message.content}</div>))}
  </div>

  <div className="chat-input">
    <form action="" className='form' onSubmit={handleFormSubmit}  >
      <input type="text" placeholder="Type your message..."  value={message} onChange={(e)=>setMessage(e.target.value)}/>
    <button type='submit'>Send</button>
    </form>
  </div>
</div>

  );
}

export default App;
