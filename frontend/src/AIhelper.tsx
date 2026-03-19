import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './App.scss';

interface Message {
  type: 'user' | 'bot';
  content: string;
  specialty?: string;
  link?: string;
}

interface BotResponse {
  text: string;
  specialty?: string;
  stage?: any;
  link?: string;
  state: string;
}

function AIhelper() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));

  // Генерируем ID пользователя при загрузке
  useEffect(() => {
    // Добавляем приветственное сообщение
    setMessages([{
      type: 'bot',
      content: 'Напишите, чем вам интересно заниматься, какими технологиями или что вы хотите изучать.'
    }]);
  }, []);

  // Скроллим к последнему сообщению
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Добавляем сообщение пользователя
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    
    setIsLoading(true);
    
    try {
      // Отправляем запрос к серверу
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          message: userMessage
        })
      });
      
      const data: BotResponse = await response.json();
      
      // Добавляем ответ бота
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: data.text,
        specialty: data.specialty,
        link: data.link
      }]);
      
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Извините, произошла ошибка при обращении к серверу.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSpecialtyClick = (link: string) => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <div className="App">
      <header>
        <button className="Headerbtn" onClick={() => navigate('/')}>На главную</button>
      </header>
      <div className="Chat">
        <div className="Chatexport">
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            gap: '1rem',
            padding: '1rem'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  backgroundColor: msg.type === 'user' ? '#2a2a2a' : '#1a1a1a', // Темно-серый для пользователя, почти черный для бота
                  color: '#f0f0f0', // Светло-серый текст
                  padding: '0.8rem 1.2rem',
                  borderRadius: '1rem',
                  borderBottomRightRadius: msg.type === 'user' ? '0.2rem' : '1rem',
                  borderBottomLeftRadius: msg.type === 'bot' ? '0.2rem' : '1rem',
                  whiteSpace: 'pre-wrap',
                  border: msg.type === 'bot' ? '1px solid #444' : 'none', // Легкая рамка для сообщений бота
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' // Легкая тень для объема
                }}
              >
                <div>{msg.content}</div>
                {msg.link && (
                  <button
                    onClick={() => handleSpecialtyClick(msg.link!)}
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.3rem 1rem',
                      backgroundColor: '#333', // Темно-серый фон
                      border: '1px solid #666', // Серая рамка
                      borderRadius: '0.5rem',
                      color: '#ccc', // Светло-серый текст
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#444';
                      e.currentTarget.style.borderColor = '#888';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#333';
                      e.currentTarget.style.borderColor = '#666';
                    }}
                  >
                    Посмотреть roadmap
                  </button>
                )}
              </div>
            ))}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                backgroundColor: '#1a1a1a',
                color: '#ccc',
                padding: '0.8rem 1.2rem',
                borderRadius: '1rem',
                borderBottomLeftRadius: '0.2rem',
                border: '1px solid #444',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
              }}>
                <span style={{ opacity: 0.7 }}>Бот печатает</span>
                <span style={{ 
                  animation: 'ellipsis 1.5s infinite',
                  display: 'inline-block',
                  width: '1.5rem',
                  textAlign: 'left'
                }}>...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <div className="Chatinput">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Введите запрос..."
            disabled={isLoading}
            style={{
              backgroundColor: '#1e1e1e',
              border: '2px solid #333',
              color: '#e0e0e0'
            }}
          />
          <button 
            className="Selectbtn" 
            onClick={handleSendMessage}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.5 : 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            <img src="/message-send.svg" alt="Отправить" style={{ filter: 'invert(0.8)' }}></img>
          </button>
        </div>
      </div>
      
      {/* Добавляем анимацию для точек загрузки */}
      <style>{`
        @keyframes ellipsis {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

export default AIhelper;