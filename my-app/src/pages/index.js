import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/App.module.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') {
      try {
        const response = await getResponseFromServer(userInput);
        handleResponse(response);
        setUserInput('');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const getResponseFromServer = async (userInput) => {
    try {
      const response = await axios.post('http://localhost:3001/get-response', {
        userInput: userInput,
      });
      return response.data.response;
    } catch (error) {
      console.error('Error:', error);
      return 'Error fetching response';
    }
  };

  const handleResponse = (response) => {
    setChatLog([...chatLog, { sender: 'FoodBot', message: response }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradient}>
        <div className={styles.contentcontainer}>
          <div className={styles.photobanner}>
            <img />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.textbox}>
              {chatLog.map((chat, index) => (
                <div key={index} className={styles['message-card']}>
                  <strong>{chat.sender}:</strong> {chat.message}
                </div>
              ))}
            </div>
            <div className={styles.textbox}>
              <textarea
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter text here"
              ></textarea>
            </div>
            <div className={styles.buttoncontainer}>
              <button type="submit" className={styles['button']}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;