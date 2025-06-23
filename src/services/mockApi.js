// 模擬的商品資料
const products = [
  {
    id: 1,
    name: '高效能筆記型電腦',
    price: 35000,
    description: '搭載最新款處理器，16GB 記憶體和 1TB SSD，適合專業人士使用。',
    image: 'https://placehold.co/600x400/59C3C3/FFFFFF?text=Laptop',
  },
  {
    id: 2,
    name: '人體工學滑鼠',
    price: 1200,
    description: '垂直設計，減少手腕壓力，長時間工作的最佳選擇。',
    image: 'https://placehold.co/600x400/F2668B/FFFFFF?text=Mouse',
  },
  {
    id: 3,
    name: '機械式鍵盤',
    price: 3200,
    description: '青軸設計，提供清脆的打字回饋感，附帶 RGB 背光。',
    image: 'https://placehold.co/600x400/AC83E6/FFFFFF?text=Keyboard',
  },
  {
    id: 4,
    name: '4K 高解析度螢幕',
    price: 15000,
    description: '27吋 IPS 面板，提供 99% sRGB 色域，色彩精準。',
    image: 'https://placehold.co/600x400/E89448/FFFFFF?text=Monitor',
  },
];

// 模擬 API 呼叫，回傳 Promise
export const fetchProducts = () => {
  return new Promise((resolve) => {
    // 模擬 500ms 的網路延遲
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};