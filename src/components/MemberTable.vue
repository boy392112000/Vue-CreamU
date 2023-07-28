<template>
  <div class="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >電子郵件 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
        <div class="accordion-body">{{member.email}}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >地址 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse show">
        <div class="accordion-body">{{member.address}}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >生日 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse show">
        <div class="accordion-body">{{formattedDate(member.birthday)}}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >加入日期 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse show">
        <div class="accordion-body">{{formattedDate(member.joinDate)}}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >電話 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse show">
        <div class="accordion-body">{{member.telephone}}</div>
      </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="false"
          data-bs-target="#panelsStayOpen-collapseOne"
          aria-expanded="true"
          aria-controls="panelsStayOpen-collapseOne"
        >備註 :</button>
      </h2>
      <div id="panelsStayOpen-collapseOne" class="accordion-collapse show">
        <div class="accordion-body">{{member.notes}}</div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { ref, defineProps } from "vue";
const porps = defineProps({
  member: Object
});
// 格式化日期為年月日格式
function formattedDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}年${(
    date.getMonth() + 1
  ).toString()}月${date.getDate().toString()}日`;
}
</script>
    
<style scoped>
table {
  margin-top: 10%;
  width: 100%;
  border-collapse: collapse; /* 合併邊框 */
}
table thead th,
table tbody th,
table tbody td {
  height: 50px; /* 調整表格行高 */
  text-align: center; /* 將文字水平置中 */
  vertical-align: middle; /* 將文字垂直置中 */
  padding: 10px; /* 添加內邊距 */
}
/* 隱藏 accordion-button 旁邊的箭頭符號 */
.accordion-button::after {
  display: none;
}
</style>