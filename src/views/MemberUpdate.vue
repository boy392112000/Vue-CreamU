<template>
  <form @submit.prevent="handleSubmit" class="mt-5">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">姓名 :</label>
      <input v-model="formData.name" type="text" name="name" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email :</label>
      <input type="email" class="form-control" v-model="formData.email" name="email" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">地址 :</label>
      <input v-model="formData.address" type="text" name="address" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">電話 :</label>
      <input v-model="formData.telephone" type="text" name="telephone" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">照片 :</label>
      <input v-model="formData.image" type="text" name="image" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">生日 :</label>
      <input v-model="formData.birthday" type="date" name="birthday" class="form-control" />
    </div>
    <div class="mb-3 visually-hidden">
      <label for="exampleFormControlInput1" class="form-label">加入日期 :</label>
      <input v-model="formData.joinDate" type="date" name="joinDate" class="form-control" />
    </div>
    <div class="mb-3 visually-hidden">
      <label for="exampleFormControlInput1" class="form-label">memberId :</label>
      <input v-model="formData.memberId" type="text" name="memberId" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
      <textarea class="form-control" rows="3" v-model="formData.notes" name="notes"></textarea>
    </div>
    <button type="submit" class="btn btn-light">提交</button>
  </form>
</template>
  
  <script setup>
import { ref, reactive, toRefs } from "vue";

// 使用 reactive 創建表單數據的狀態
const formData = reactive({
  address: "",
  birthday: "",
  email: "",
  image: "",
  joinDate: "",
  level: "",
  memberId: "",
  name: "",
  notes: "",
  telephone: ""
});

const member = ref([]);
const Address = "https://localhost:7195";
const loadMember = async () => {
  const res = await fetch(`${Address}/api/Members/${7}`);
  const datas = await res.json();
  member.value = datas;
  // console.log(JSON.stringify(datas))
  console.log(member.value);

  formData.email = member.value.email;
  formData.name = member.value.name;
  formData.address = member.value.address;
  formData.image = member.value.image;
  formData.birthday = formattedDate(member.value.birthday);
  formData.joinDate = formattedDate(member.value.joinDate);
  formData.memberId = member.value.memberId;
  formData.notes = member.value.notes;
  formData.telephone = member.value.telephone;
};
loadMember();

// 格式化日期為年月日格式
function formattedDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${(
    date.getMonth() + 1
  ).toString()}月${date.getDate().toString()}日`;
}

// 提交表單的處理函式
async function handleSubmit() {
  console.log(formData);
  try {
    const response = await fetch(`${Address}/api/Members/${7}`, {
      method: "PUT",
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // 處理成功的回應
      console.log("請求成功");
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
</style>
  