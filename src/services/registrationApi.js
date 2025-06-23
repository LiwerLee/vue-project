// 模擬已存在的電子郵件
const existingEmails = ['admin@example.com', 'user@example.com'];

export const registrationApi = {
  async register(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 模擬 email 已被註冊的錯誤
        if (existingEmails.includes(userData.email)) {
          return reject({
            success: false,
            message: '此電子郵件已被註冊。',
          });
        }
        
        // 模擬隨機的伺服器錯誤 (10% 機率)
        if (Math.random() < 0.9) {
          return reject({
            success: false,
            message: '伺服器發生未知錯誤，請稍後再試。',
          });
        }
        
        console.log('註冊資料已送出:', userData);
        resolve({
          success: true,
          message: '註冊成功！歡迎加入我們。',
        });
      }, 1000); // 模擬 1 秒的網路延遲
    });
  }
};