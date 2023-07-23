<template>
  <div class="row">
    <div class="col-12 mt-5">
      <h1>我的帳戶</h1>
      <div class="d-flex justify-content-end">
        <div>
          <router-link type="button" class="btn btn-success" to="/MemberUpdate">修改會員資料</router-link>
        </div>
        <div class="mx-2">
          <!-- 這邊是彈跳視窗的開始 -->
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >刪除帳號</button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">這是個令人遺憾的決定!</h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">你真的要刪除嗎?</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">按我</button>
                  <button type="button" class="btn btn-danger" @click="Memberdelete">別按</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 這邊是彈跳視窗的結束 -->
        </div>
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

const id = 10;
const member = ref([]);
const Address = "https://localhost:7098";
const loadMember = async () => {
  const res = await fetch(`${Address}/api/MembersAPI/${id}`);
  const datas = await res.json();
  member.value = datas;
  console.log(JSON.stringify(datas));
  console.log(member.value);
};
loadMember();

const deleteMember = async () => {
  const res = await fetch(`${Address}/api/MembersAPI/${id}`, {
    method: "DELETE",
    body: id
  });
};

function Memberdelete() {
  if (confirm("你可以不刪我嗎?")) {
    deleteMember();
  }
}
</script>
    
<style scoped>
</style>