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

    <!-- 縣市下拉選單 -->

    <!-- 區域下拉選單 -->
    <div class="row">
      <div class="col-2">
        <div class="mb-3">
          <label class="form-label">縣市 :</label>
          <select v-model="selectedCity" @change="handleCityChange" class="form-select">
            <option value>{{ city }}</option>
            <option v-for="citys in cities" :key="citys">{{ citys }}</option>
          </select>
        </div>
      </div>
      <div class="col-2">
        <div class="mb-3">
          <label class="form-label">區域 :</label>
          <select v-model="selectedDistrict" class="form-select">
            <option value>{{ region }}</option>
            <option v-for="district in cityDistricts[selectedCity]" :key="district">{{ district }}</option>
          </select>
        </div>
      </div>
      <div class="col-8">
        <div class="mb-3">
          <label class="form-label">地址 :</label>
          <input v-model="address" type="text" name="address" class="form-control" pattern="^[a-zA-Z0-9\u4e00-\u9fa5]+$"
            title="請輸入有效的地址格式!( 不能有特殊符號與空格 )" required />
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">電話 :</label>
      <input v-model="member.telephone" type="text" name="telephone" pattern="[0-9]+" title="請輸入數字" required
        class="form-control" />
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
      <label class="form-label">備註</label>
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
import { ref, watch } from "vue";
import router from "../router.js";
const selectedCity = ref(""); // 用於綁定選中的縣市
const selectedDistrict = ref(""); // 用於綁定選中的區域
const districts = ref([]); // 定義 districts 變數
let city = ref("");
let region = ref("");
let address = ref("");

const id = 10; // 暫時設定的變數
const Address = "https://localhost:7098";
const member = ref([]);

const loadMember = async () => {
  const res = await fetch(`${Address}/api/MembersAPI/${id}`);
  const data = await res.json();
  member.value = data; // 設置成物件而不是陣列

  member.value.joinDate = formattedDate(member.value.joinDate);
  member.value.birthday = formattedDate(member.value.birthday);
  // console.log(member.value);

  city.value = member.value.address.substring(0, 3);
  region.value = member.value.address.substring(
    3,
    member.value.address.lastIndexOf("區") + 1
  );
  address.value = member.value.address.substring(
    member.value.address.lastIndexOf("區") + 1
  );
  // console.log(city);
  // console.log(region);
  // console.log(address);
};
loadMember();

// 格式化日期為年月日格式
const formattedDate = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const cities = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣"
]; // 這裡放置縣市的資料，你可以自行擴充或從 API 取得
const cityDistricts = {
  台北市: [
    "中正區",
    "大同區",
    "中山區",
    "松山區",
    "大安區",
    "萬華區",
    "信義區",
    "士林區",
    "北投區",
    "內湖區",
    "南港區",
    "文山區"
  ],
  新北市: [
    "板橋區",
    "三峽區",
    "淡水區",
    "金山區",
    "萬里區",
    "汐止區",
    "瑞芳區",
    "貢寮區",
    "平溪區",
    "雙溪區",
    "新店區",
    "深坑區"
  ],
  桃園市: [
    "桃園區",
    "中壢區",
    "平鎮區",
    "八德區",
    "楊梅區",
    "蘆竹區",
    "龜山區",
    "龍潭區",
    "復興區",
    "大溪區",
    "大園區",
    "觀音區",
    "新屋區"
  ],
  台中市: [
    "中區",
    "東區",
    "南區",
    "西區",
    "北區",
    "北屯區",
    "西屯區",
    "南屯區",
    "太平區",
    "大里區",
    "霧峰區",
    "烏日區",
    "豐原區",
    "后里區",
    "石岡區",
    "東勢區",
    "和平區",
    "新社區",
    "潭子區",
    "大雅區",
    "神岡區",
    "大肚區",
    "沙鹿區",
    "龍井區",
    "梧棲區",
    "清水區",
    "大甲區",
    "外埔區",
    "大安區"
  ],
  台南市: [
    "中西區",
    "東區",
    "南區",
    "北區",
    "安平區",
    "安南區",
    "永康區",
    "歸仁區",
    "新化區",
    "左鎮區",
    "玉井區",
    "楠西區",
    "南化區",
    "仁德區",
    "關廟區",
    "龍崎區",
    "官田區",
    "麻豆區",
    "佳里區",
    "西港區",
    "七股區",
    "將軍區",
    "學甲區",
    "北門區",
    "新營區",
    "後壁區",
    "白河區",
    "東山區",
    "六甲區",
    "下營區",
    "柳營區",
    "鹽水區",
    "善化區",
    "大內區",
    "山上區",
    "新市區",
    "安定區"
  ],
  高雄市: [
    "鹽埕區",
    "鼓山區",
    "左營區",
    "楠梓區",
    "三民區",
    "新興區",
    "前金區",
    "苓雅區",
    "那瑪夏區",
    "前鎮區",
    "旗津區",
    "小港區",
    "鳳山區",
    "大寮區",
    "鳥松區",
    "林園區",
    "仁武區",
    "大樹區",
    "大社區",
    "岡山區",
    "路竹區",
    "橋頭區",
    "梓官區",
    "彌陀區",
    "永安區",
    "燕巢區",
    "田寮區",
    "阿蓮區",
    "茄萣區",
    "湖內區",
    "旗山區",
    "美濃區",
    "內門區",
    "杉林區",
    "甲仙區",
    "六龜區",
    "茂林區",
    "桃源區"
  ],
  基隆市: [
    "仁愛區",
    "信義區",
    "中正區",
    "中山區",
    "安樂區",
    "暖暖區",
    "七堵區"
  ],
  新竹市: ["東區", "北區", "香山區"],
  嘉義市: ["東區", "西區"],
  新竹縣: [
    "竹北市",
    "竹東鎮",
    "新埔鎮",
    "關西鎮",
    "湖口鄉",
    "新豐鄉",
    "芎林鄉",
    "橫山鄉",
    "北埔鄉",
    "寶山鄉",
    "峨眉鄉",
    "尖石鄉",
    "五峰鄉"
  ],
  苗栗縣: [
    "苗栗市",
    "通霄鎮",
    "苑裡鎮",
    "竹南鎮",
    "頭份市",
    "後龍鎮",
    "卓蘭鎮",
    "西湖鄉",
    "公館鄉",
    "銅鑼鄉",
    "南庄鄉",
    "頭屋鄉",
    "三義鄉",
    "造橋鄉",
    "三灣鄉",
    "獅潭鄉",
    "泰安鄉"
  ],
  彰化縣: [
    "彰化市",
    "員林市",
    "和美鎮",
    "鹿港鎮",
    "溪湖鎮",
    "二林鎮",
    "田中鎮",
    "北斗鎮",
    "埔鹽鄉",
    "埔心鄉",
    "大村鄉",
    "芳苑鄉",
    "竹塘鄉",
    "社頭鄉",
    "二水鄉",
    "田尾鄉",
    "埤頭鄉",
    "溪州鄉",
    "竹山鎮",
    "鹿草鄉",
    "水林鄉",
    "太保市",
    "中埔鄉",
    "竹崎鄉",
    "新港鄉",
    "民雄鄉",
    "大城鄉",
    "東勢鄉",
    "南投市",
    "後壁鄉",
    "造橋鄉",
    "潭子鄉",
    "北港鎮",
    "東區",
    "西區"
  ],
  南投縣: [
    "南投市",
    "埔里鎮",
    "草屯鎮",
    "竹山鎮",
    "集集鎮",
    "名間鄉",
    "鹿谷鄉",
    "中寮鄉",
    "魚池鄉",
    "國姓鄉",
    "水里鄉",
    "信義鄉",
    "仁愛鄉"
  ],
  雲林縣: [
    "斗六市",
    "斗南鎮",
    "虎尾鎮",
    "西螺鎮",
    "土庫鎮",
    "北港鎮",
    "莿桐鄉",
    "林內鄉",
    "古坑鄉",
    "大埤鄉",
    "崙背鄉",
    "二崙鄉",
    "麥寮鄉",
    "臺西鄉",
    "東勢鄉",
    "褒忠鄉",
    "四湖鄉",
    "口湖鄉",
    "水林鄉",
    "元長鄉"
  ],
  嘉義縣: [
    "太保市",
    "朴子市",
    "布袋鎮",
    "大林鎮",
    "民雄鄉",
    "溪口鄉",
    "新港鄉",
    "六腳鄉",
    "東石鄉",
    "義竹鄉",
    "鹿草鄉",
    "水上鄉",
    "中埔鄉",
    "竹崎鄉",
    "梅山鄉",
    "番路鄉",
    "大埔鄉",
    "阿里山鄉"
  ],
  屏東縣: [
    "屏東市",
    "潮州鎮",
    "東港鎮",
    "恆春鎮",
    "萬丹鄉",
    "長治鄉",
    "麟洛鄉",
    "九如鄉",
    "里港鄉",
    "鹽埔鄉",
    "高樹鄉",
    "萬巒鄉",
    "內埔鄉",
    "竹田鄉",
    "新埤鄉",
    "枋寮鄉",
    "新園鄉",
    "崁頂鄉",
    "林邊鄉",
    "南州鄉",
    "佳冬鄉",
    "琉球鄉",
    "車城鄉",
    "滿州鄉",
    "枋山鄉",
    "霧台鄉",
    "瑪家鄉",
    "泰武鄉",
    "來義鄉",
    "春日鄉",
    "獅子鄉",
    "牡丹鄉"
  ],
  宜蘭縣: [
    "宜蘭市",
    "羅東鎮",
    "蘇澳鎮",
    "頭城鎮",
    "礁溪鄉",
    "壯圍鄉",
    "員山鄉",
    "冬山鄉",
    "五結鄉",
    "三星鄉",
    "大同鄉",
    "南澳鄉"
  ],
  花蓮縣: [
    "花蓮市",
    "鳳林鎮",
    "玉里鎮",
    "新城鄉",
    "吉安鄉",
    "壽豐鄉",
    "光復鄉",
    "豐濱鄉",
    "瑞穗鄉",
    "富里鄉",
    "秀林鄉",
    "萬榮鄉",
    "卓溪鄉"
  ],
  台東縣: [
    "台東市",
    "成功鎮",
    "關山鎮",
    "長濱鄉",
    "池上鄉",
    "東河鄉",
    "鹿野鄉",
    "卑南鄉",
    "大武鄉",
    "綠島鄉",
    "太麻里鄉",
    "金峰鄉",
    "蘭嶼鄉",
    "延平鄉",
    "海端鄉",
    "達仁鄉"
  ],
  澎湖縣: ["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
  金門縣: ["金城鎮", "金湖鎮", "金沙鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
  連江縣: ["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"]
};

// 監聽選中的縣市，動態產生區域下拉選單的選項
watch(selectedCity, newCity => {
  selectedDistrict.value = ""; // 每次縣市變更時，清空選中的區域
  if (newCity) {
    districts.value = cityDistricts[newCity]; // 設置對應的區域資料到 districts 變數
  } else {
    districts.value = []; // 若未選擇縣市，清空區域下拉選單的選項
  }
});

// 提交表單的處理函式
async function handleSubmit() {
  try {
    const diet = {
      memberId: member.value.memberId,
      name: member.value.name,
      telephone: member.value.telephone,
      email: member.value.email,
      address: selectedCity.value + selectedDistrict.value + address.value,
      birthday: member.value.birthday,
      level: member.value.level,
      joinDate: member.value.joinDate,
      image: member.value.image,
      notes: member.value.notes
    };

    if (selectedCity.value === "" || selectedDistrict.value === "") {
      selectedCity.value = city.value;
      selectedDistrict.value = region.value;
      diet.address =
        selectedCity.value + selectedDistrict.value + address.value;
    }

    const response = await fetch(`${Address}/api/MembersAPI/${id}`, {
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
  