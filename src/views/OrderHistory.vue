<template>
  <div>
    <br />
    <p id="title">歷史紀錄</p>
    <div class="row mb-5">
      <div class="col-3">
        <p class="pt-1 mt-1 mx-5 text-end" style="font-family: Noto Sans TC; sans-serif;">訂單成立日期 :</p>
      </div>
      <div class="col-4">
        <VueDatePicker v-model="staDate" :enable-time-picker="false" :format-locale="zhTW" :state="true"
          @update:model-value="handleDateChange" />
      </div>
      <div class="col-4">
        <VueDatePicker v-model="endDate" :min-date="staDate" :format-locale="zhTW" :enable-time-picker="false"
          :state="true" @update:model-value="handleDateChange" />
      </div>
    </div>
    <!-- 如果originalOrders是空陣列，則顯示查無資料的訊息 -->
    <div v-if="originalOrders.length === 0" class="text-center" style="margin-top: 150px;">
      <h1>查無資料!</h1>
    </div>

    <!-- 使用v-if條件判斷是否顯示手風琴 -->
    <div v-if="orders.length > 0" class="accordion accordion-flush" id="accordionFlushExample" :multiple="true">
      <!-- 使用v-for指令迭代loadOrder返回的資料，生成手風琴的項目 -->
      <div class="accordion-item" v-for="(order, index) in originalOrders" :key="order.orderId">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            :data-bs-target="`#flush-collapse${index}`" aria-expanded="false" :aria-controls="`flush-collapse${index}`"
            @click="loadOrderDetails(order.orderId)">{{ (index + 1) < 10 ? "&nbsp&nbsp" : '' }}{{ index + 1 }} -
              &nbsp;&nbsp;&nbsp;購買時間 : {{ formattedDate(order.orderDate) }} &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 總消費 :
              {{ order.totalAmount }} 元</button>
        </h2>
        <div :id="`flush-collapse${index}`" class="accordion-collapse collapse"
          :data-bs-parent="`#accordionFlushExample`">
          <div class="accordion-body">
            <div v-for="(ordersDetail, detailIndex) in ordersDetails" :key="ordersDetail.orderDetailId">
              <!-- 在這裡顯示每筆明細資料的相關內容 -->
              <div class="row">
                第 {{ detailIndex + 1 }} 筆
                <hr />
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <!-- <img :src="`https://localhost:7098/imgs/${ordersDetail.productImage}`" /> -->
                  <img :src="`https://localhost:7098/imgs/${ordersDetail.productImage}`" height="200"
                    :alt="ordersDetail.product + '.jpg'" />
                </div>
                <div class="col-6">
                  <p>產品名稱 : {{ ordersDetail.product }}</p>
                  <p>數量 : {{ ordersDetail.qty }}</p>
                  <p>單價 : {{ ordersDetail.subtotal }}</p>

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
    <div v-else class="text-center mt-5">
      <img src="https://memeprod.sgp1.digitaloceanspaces.com/user-wtf/1588336771719.jpg" />
    </div>
  </div>
</template>
    
<script setup>
import MemberData from "../components/MemberData.vue";
import { ref, onMounted } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import { zhTW } from "date-fns/locale";

const member = ref([]);
const originalOrders = ref([]); // 新增 originalOrders 變數用於保存一開始載入的所有訂單資料
const staDate = ref(new Date());
const endDate = ref(new Date());
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
  // 將 originalOrders 的值設置為初始的 orders 值
  originalOrders.value = orders.value;
};

// 載入明細資料
const loadOrderDetails = async orderId => {
  const res = await fetch(`${Address}/api/OrderDetailsAPI/${orderId}`);
  const data = await res.json();
  console.log(data);
  ordersDetails.value = data;
  console.log(new Date(staDate.value));
  console.log(new Date(endDate.value));

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

// 將 filterOrders 函數移至 handleDateChange 函數內部，以便正確呼叫
const handleDateChange = () => {
  // 將日期格式轉換為符合 orderDate 格式的字串
  const start = staDate.value.toISOString().slice(0, 10);
  const end = endDate.value.toISOString().slice(0, 10);

  // 在事件處理函數中執行重新篩選的處理
  const filteredOrders = filterOrders(start, end);

  // 如果使用者選擇了日期範圍，則將 orders 的值設置為 filteredOrders
  // 否則將 orders 的值設置為 originalOrders，這樣可以保證在選擇日期前顯示所有訂單，選擇日期後顯示篩選後的訂單
  originalOrders.value =
    filteredOrders.length > 0 ? filteredOrders : [];
  console.log(filteredOrders);
};

const filterOrders = (start, end) => {
  // 將篩選後的結果回傳
  return orders.value.filter(order => {
    const orderDate = new Date(order.orderDate);
    const formattedOrderDate = orderDate.toISOString().slice(0, 10);
    console.log(formattedOrderDate);
    return formattedOrderDate >= start && formattedOrderDate <= end;
  });
};
</script>
    
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap");

#title {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 50px;
  /* 設定<p>標籤的字型大小，根據需要調整數值 */
  text-align: center;
}
</style>
