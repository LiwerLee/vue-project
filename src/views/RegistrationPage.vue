<script setup>
import { registrationApi } from '@/services/registrationApi';
import { reactive, ref } from 'vue';

// ----- 1. 響應式狀態定義 -----

// 使用 reactive 讓整個表單物件具備響應性，方便進行雙向綁定
const form = reactive({
  lastName: '',
  firstName: '',
  age: null,
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  address: '',
  notes: '',
});

// 建立一個表單的初始狀態副本，用於成功提交後重設表單
const initialFormState = JSON.parse(JSON.stringify(form));

// 專門存放驗證錯誤訊息的響應式物件
const errors = reactive({});

// 控制 UI 狀態 (是否正在讀取、API 回傳的訊息)
const isLoading = ref(false);
const apiMessage = ref('');
const apiSuccess = ref(false);


// ----- 2. 驗證邏輯 -----

// 執行所有欄位檢核的函式
const validate = () => {
  // 每次驗證前，先清空舊的錯誤訊息，保持 errors 物件的響應性
  Object.keys(errors).forEach(key => delete errors[key]);

  // 檢核規則 (與題目要求完全對應)
  if (!form.lastName) errors.lastName = '姓氏為必填。';
  else if (form.lastName.length > 20) errors.lastName = '姓氏長度不能超過 20 個字元。';

  if (!form.firstName) errors.firstName = '名字為必填。';
  else if (form.firstName.length > 20) errors.firstName = '名字長度不能超過 20 個字元。';
  
  if (form.age === null || form.age === '') errors.age = '年齡為必填。';
  else if (!Number.isInteger(form.age) || form.age < 0 || form.age > 120) errors.age = '請輸入 0 到 120 之間的整數。';

  if (!form.email) errors.email = '電子郵件為必填。';
  else if (form.email.length > 150) errors.email = '電子郵件長度不能超過 150 個字元。';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = '電子郵件格式不正確。';
  
  if (!form.phone) errors.phone = '電話號碼為必填。';
  else if (!/^\d{1,10}$/.test(form.phone)) errors.phone = '電話號碼僅限最多 10 位數字。';

  if (!form.password) errors.password = '密碼為必填。';
  else if (form.password.length < 6 || form.password.length > 20) errors.password = '密碼長度需為 6-20 個字元。';
  else if (!/^[A-Za-z0-9!@#$%^&*]+$/.test(form.password)) errors.password = '密碼只允許英文、數字和 !@#$%^&* 符號。';

  if (!form.confirmPassword) errors.confirmPassword = '確認密碼為必填。';
  else if (form.password && form.confirmPassword !== form.password) errors.confirmPassword = '兩次輸入的密碼不一致。';

  if (form.address && form.address.length > 150) errors.address = '住址長度不能超過 150 個字元。';
  if (form.notes && form.notes.length > 200) errors.notes = '備註長度不能超過 200 個字元。';
  
  // 如果 errors 物件是空的，代表驗證通過，回傳 true
  return Object.keys(errors).length === 0;
};


// ----- 3. 提交邏輯 -----

// 表單提交時觸發的函式
const handleSubmit = async () => {
  apiMessage.value = ''; // 清除上一次的 API 訊息
  
  // 先執行驗證，如果失敗 (回傳 false)，就直接中斷函式
  if (!validate()) {
    return;
  }
  
  // 開始 API 請求，顯示讀取狀態
  isLoading.value = true;
  apiSuccess.value = false;

  try {
    // 呼叫模擬 API
    const response = await registrationApi.register({ ...form });
    
    // 處理成功情況
    apiSuccess.value = true;
    apiMessage.value = response.message;
    
    // 重設表單回到初始狀態
    Object.assign(form, initialFormState);

  } catch (error) {
    // 處理失敗情況
    apiSuccess.value = false;
    apiMessage.value = error.message || '註冊失敗，請檢查您的輸入。';
    // 失敗時，資料會保留在表單上讓使用者修改
  } finally {
    // 無論成功或失敗，最後都結束讀取狀態
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="registration-container">
    <form @submit.prevent="handleSubmit" class="registration-form" novalidate>
      <h1>會員註冊</h1>

      <div class="form-row">
        <div class="form-group">
          <label for="lastName">姓氏</label>
          <input id="lastName" type="text" v-model.trim="form.lastName">
          <p v-if="errors.lastName" class="error-text">{{ errors.lastName }}</p>
        </div>
        <div class="form-group">
          <label for="firstName">名字</label>
          <input id="firstName" type="text" v-model.trim="form.firstName">
          <p v-if="errors.firstName" class="error-text">{{ errors.firstName }}</p>
        </div>
      </div>
      
      <div class="form-group">
        <label for="age">年齡</label>
        <input id="age" type="number" v-model.number="form.age">
        <p v-if="errors.age" class="error-text">{{ errors.age }}</p>
      </div>

      <div class="form-group">
        <label for="email">電子郵件</label>
        <input id="email" type="email" v-model.trim="form.email">
        <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
      </div>

      <div class="form-group">
        <label for="phone">電話號碼</label>
        <input id="phone" type="tel" v-model.trim="form.phone">
        <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
      </div>

      <div class="form-group">
        <label for="password">密碼</label>
        <input id="password" type="password" v-model="form.password">
        <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
      </div>

      <div class="form-group">
        <label for="confirmPassword">確認密碼</label>
        <input id="confirmPassword" type="password" v-model="form.confirmPassword">
        <p v-if="errors.confirmPassword" class="error-text">{{ errors.confirmPassword }}</p>
      </div>

      <div class="form-group">
        <label for="address">住址 (選填)</label>
        <input id="address" type="text" v-model.trim="form.address">
        <p v-if="errors.address" class="error-text">{{ errors.address }}</p>
      </div>
      
      <div class="form-group">
        <label for="notes">備註 (選填)</label>
        <textarea id="notes" v-model.trim="form.notes" rows="3"></textarea>
        <p v-if="errors.notes" class="error-text">{{ errors.notes }}</p>
      </div>

      <div v-if="apiMessage" :class="['api-message', { success: apiSuccess, error: !apiSuccess }]">
        {{ apiMessage }}
      </div>

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '註冊中...' : '註冊' }}
      </button>
    </form>
  </div>
</template>


<style scoped>
.registration-container {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
}
.registration-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;
}
.form-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap; /* 在小螢幕上會自動換行 */
}
.form-row .form-group {
  flex: 1;
  min-width: 150px; /* 確保在小螢幕上不會被過度擠壓 */
}
.form-group {
  margin-bottom: 1.2rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.error-text {
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: #dc3545;
  height: 1em; /* 給予固定高度，避免版面跳動 */
}
.api-message {
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  text-align: center;
}
.api-message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}
.api-message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
button {
  width: 100%;
  font-size: 1.1rem;
}
</style>