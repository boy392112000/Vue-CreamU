<template>
  <div class="row">
    <div class="col-12 mt-5">
      <h1>我的帳戶</h1>
      <div class="d-flex justify-content-end">
        <router-link type="button" class="btn btn-success" to="/MemberUpdate">修改會員資料</router-link>
        <router-link type="button" class="btn btn-danger mx-2" to="/MemberUpdate">刪除帳號</router-link>
      </div>
      <hr />
    </div>
    <div class="col-4">
      <MemberData :member="member"></MemberData>
    </div>
    <div class="col-8">
      <MemberTable :member="member"></MemberTable>
    </div>
  </div>
</template>
    
<script setup>
import MemberData from "../components/MemberData.vue";
import MemberTable from "../components/MemberTable.vue";

import { ref } from "vue";

const member = ref([]);
const Address = "https://localhost:7195";
const loadMember = async () => {
  const res = await fetch(`${Address}/api/Members/${4}`);
  const datas = await res.json();
  member.value = datas;
  // console.log(JSON.stringify(datas))
  console.log(member.value);
};
loadMember();
</script>
    
<style scoped>
</style>