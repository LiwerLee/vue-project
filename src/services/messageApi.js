// 使用 localStorage 模擬後端資料庫
const getMessagesFromStorage = () => {
  const messages = localStorage.getItem('messages_db');
  return messages ? JSON.parse(messages) : [];
};

const saveMessagesToStorage = (messages) => {
  localStorage.setItem('messages_db', JSON.stringify(messages));
};

// 初始化一些假資料
if (!localStorage.getItem('messages_db')) {
  const initialMessages = [
    { id: 1, author: '小明', content: '大家好，這是我的第一則留言！', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 2, author: '小華', content: '歡迎來到這個留言板～', timestamp: new Date().toISOString() },
  ];
  saveMessagesToStorage(initialMessages);
}

export const messageApi = {
  // GET /api/messages
  async getMessages() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getMessagesFromStorage());
      }, 300);
    });
  },

  // POST /api/messages
  async postMessage({ author, content }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!author || !content) {
          return reject({ status: 400, message: 'Author and content are required.' });
        }
        
        const messages = getMessagesFromStorage();
        const newMessage = {
          id: Date.now(),
          author,
          content,
          timestamp: new Date().toISOString(),
        };
        messages.push(newMessage);
        saveMessagesToStorage(messages);
        
        resolve(newMessage);
      }, 300);
    });
  }
};