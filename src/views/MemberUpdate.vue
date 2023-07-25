<template>
  <form @submit.prevent="handleSubmit" class="mt-5">
    <div class="mb-3">
      <label class="form-label">姓名 :</label>
      <input v-model="member.name" type="text" name="name" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Email :</label>
      <input type="email" class="form-control" v-model="member.email" name="email" required />
    </div>
    <div class="mb-3">
      <label class="form-label">地址 :</label>
      <input v-model="member.address" type="text" name="address" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">電話 :</label>
      <input
        v-model="member.telephone"
        type="text"
        name="telephone"
        pattern="[0-9]+"
        title="請輸入數字"
        required
        class="form-control"
      />
    </div>
    <div class="mb-3 visually-hidden">
      <label class="form-label">照片 :</label>
      <input v-model="member.image" type="text" name="image" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">生日 :</label>
      <input v-model="member.birthday" type="date" name="birthday" class="form-control" required />
    </div>
    <div class="mb-3 visually-hidden">
      <label class="form-label">加入日期 :</label>
      <input v-model="member.joinDate" type="date" name="joinDate" class="form-control" required />
    </div>
    <div class="mb-3 visually-hidden">
      <label class="form-label">memberId :</label>
      <input v-model="member.memberId" type="text" name="memberId" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Example textarea</label>
      <textarea class="form-control" rows="3" v-model="member.notes" name="notes"></textarea>
    </div>
    <div class="mb-3 visually-hidden">
      <label class="form-label">Level</label>
      <input v-model="member.level" type="text" name="level" class="form-control" required />
    </div>
    <button type="submit" class="btn btn-light">提交</button>
  </form>
</template>
  
  <script setup>
import { ref } from "vue";
import router from "../router.js";

const id = 10; // 暫時設定的變數
const Address = "https://localhost:7098";
const member = ref([]);

const loadMember = async () => {
  const res = await fetch(`${Address}/api/MembersAPI/${id}`);
  const data = await res.json();
  member.value = data; // 設置成物件而不是陣列

  member.value.joinDate = formattedDate(member.value.joinDate);
  member.value.birthday = formattedDate(member.value.birthday);
  console.log(member.value);
};
loadMember();

// 格式化日期為年月日格式
function formattedDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 提交表單的處理函式
async function handleSubmit() {
  try {
    const diet = {
      memberId: member.value.memberId,
      name: member.value.name,
      telephone: member.value.telephone,
      email: member.value.email,
      address: member.value.address,
      birthday: member.value.birthday,
      level: member.value.level,
      joinDate: member.value.joinDate,
      image: member.value.image,
      notes: member.value.notes
    };

    const response = await fetch(`${Address}/api/Members/${1}`, {
      method: "PUT",

      body: JSON.stringify(diet),
      headers: {
        "content-type": "application/json"
      }
    });

    if (response.ok) {
      // 處理成功的回應
      console.log("請求成功");
      router.push({
        path: "/Member"
      });
    } else {
      // 處理失敗的回應
      console.log("請求失敗");
    }
  } catch (error) {
    console.error("請求錯誤", error);
  }
}
</script>
  
  <style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@700&display=swap");
form {
  font-family: "Noto Sans HK", sans-serif;
}
</style>
  