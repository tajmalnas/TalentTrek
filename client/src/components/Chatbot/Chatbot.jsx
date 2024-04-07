import React, { useState } from 'react';
import { AiChat } from '@nlux/react';
import '@nlux/themes/nova.css';
import { streamAdapter } from './Adapter';
import personas from './Personas';
import chatbotImage from './Chatbot-symbol.png'

const ChatbotButton = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false);
  };

  return (
    <div>
      <div role='button' onClick={toggleChatbot} className='fixed bottom-4 right-4 w-28'>
        <img src={chatbotImage} />
      </div>
      {isChatbotOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button onClick={closeChatbot} className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-900">&times;</button>
            <AiChat
              adapter={streamAdapter}
              personaOptions={personas}
              layoutOptions={{
                height: 320,
                maxWidth: 600
              }}
            />
            <button onClick={closeChatbot} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotButton;
