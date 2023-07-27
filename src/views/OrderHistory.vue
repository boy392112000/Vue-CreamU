<template>
  <div>
    <br />
    <p id="title">歷史紀錄</p>
    <!-- 使用v-if條件判斷是否顯示手風琴 -->
    <div v-if="orders.length > 0" class="accordion accordion-flush" id="accordionFlushExample">
      <!-- 使用v-for指令迭代loadOrder返回的資料，生成手風琴的項目 -->
      <div class="accordion-item" v-for="(order, index) in orders" :key="order.orderId">
        <h2 class="accordion-header">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${index}`"
            aria-expanded="false"
            :aria-controls="`flush-collapse${index}`"
            @click="loadOrderDetails(order.orderId)"
          >{{ (index+1) < 10 ? "&nbsp&nbsp" : '' }}{{ index+1 }} - &nbsp;&nbsp;&nbsp;購買時間 : {{formattedDate(order.orderDate)}} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 總消費 : {{ order.totalAmount }} 元</button>
        </h2>
        <div
          :id="`flush-collapse${index}`"
          class="accordion-collapse collapse"
          :data-bs-parent="`#accordionFlushExample`"
        >
          <div class="accordion-body">
            <div
              v-for="(ordersDetail, detailIndex) in ordersDetails"
              :key="ordersDetail.orderDetailId"
            >
              <!-- 在這裡顯示每筆明細資料的相關內容 -->
              <div class="row">
                第 {{ detailIndex +1}} 筆
                <hr />
                <div class="col-4">
                  <!-- <img :src="`https://localhost:7098/imgs/${ordersDetail.productImage}`" /> -->
                  <img src="../imgs/小小兵.jpg" alt srcset />
                </div>
                <div class="col-6">
                  <p>產品名稱 : {{ ordersDetail.product }}</p>
                  <p>數量 : {{ ordersDetail.qty }}</p>
                  <p>單價 : {{ordersDetail.subtotal}}</p>

                  <!-- 其他明細資料的相關內容... -->
                </div>
                <div class="col-2">
                  <p>小計 : {{ ordersDetail.unitPrice }}</p>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 如果orders陣列為空，則顯示尚未購買東西的訊息 -->
    <div v-else class="text-center">
      <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1588336771719.jpg" />
    </div>
  </div>
</template>
    
<script setup>
import MemberData from "../components/MemberData.vue";
import { ref, onMounted } from "vue";

const member = ref([]);
const Address = "https://localhost:7098";
const id = 1;
const orders = ref([]);
const ordersDetails = ref([]);

// 載入會員資料
const loadMember = async () => {
  const res = await fetch(`${Address}/api/MembersAPI/${id}`);
  const data = await res.json();
  member.value = data;
};
loadMember();

// 載入訂單資料
const loadOrder = async () => {
  const res = await fetch(`${Address}/api/OrdersAPI/${id}`);
  const data = await res.json();
  console.log(data);
  orders.value = data; // 將取得的資料賦值給orders變數
};

// 載入明細資料
const loadOrderDetails = async orderId => {
  const res = await fetch(`${Address}/api/OrderDetailsAPI/${orderId}`);
  const data = await res.json();
  console.log(data);
  ordersDetails.value = data;

  // 迭代ordersDetails陣列，為每筆明細資料添加產品資料
  for (const orderDetail of ordersDetails.value) {
    const productId = orderDetail.productId;
    const productData = await getProductDetails(productId);
    // console.log(productData);
    orderDetail.product = productData.productName;
    orderDetail.productImage = productData.productImage;
    // console.log(orderDetail.productImage);
  }
};

// 格式化日期為年月日格式
function formattedDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${year}年${month}月${day}日`;
}

// 尋找產品的 API
const getProductDetails = async productId => {
  const res = await fetch(`${Address}/api/ProductsAPI/${productId}`);
  const data = await res.json();
  return data;
};
// 使用onMounted函數在組件掛載後執行loadOrder，確保取得資料後再動態生成手風琴內容
onMounted(async () => {
  await loadOrder();
});
</script>
    
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap");

#title {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 50px; /* 設定<p>標籤的字型大小，根據需要調整數值 */
  text-align: center;
}
</style>
