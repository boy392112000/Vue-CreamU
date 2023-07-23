<template>
  <div class="mt-5">
    <button type="button" class="btn btn-outline-warning position-relative">
      ~ VIP ~
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        Level{{member.level}}
        <span class="visually-hidden">unread messages</span>
      </span>
    </button>
    <div class="image-container">
      <img
        :src="`https://localhost:7098/imgs/${member.image}`"
        width="400"
        height="400"
        @click="openUploadModal"
      />
      <div class="hover-image">
        <img
          type="button"
          src="https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-camera-icon-png-image_1576543.jpg"
          width="400"
          height="400"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@getbootstrap"
          @click="openUploadModal"
        />
      </div>
    </div>
    <label>
      <h2>{{member.name}}</h2>
    </label>
    <!-- 上傳照片視窗 -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">新增照片</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <!-- 照片預覽 -->
                <div class="preview-container" v-if="previewImage">
                  <img :src="previewImage" class="preview-image" />
                </div>
                <label for="formFile" class="form-label">請選擇照片</label>
                <input class="form-control" type="file" ref="fileInput" @change="validatePhoto" />
                <!-- 顯示錯誤訊息 -->
                <p
                  v-if="errorMessage"
                  class="alert alert-danger mt-3"
                  role="alert"
                >{{ errorMessage }}</p>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="errorMessage !== ''"
              @click="uploadPhoto"
              data-bs-dismiss="modal"
            >確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

 <script setup>
import { ref } from "vue";
const id = 10;
const showUploadModal = ref(false);
const fileInput = ref(null);
const Address = `https://localhost:7098`;
const errorMessage = ref("");
const previewImage = ref(null);

const prop = defineProps({
  member: Object
});
const uploadPhoto = async () => {
  if (fileInput.value && fileInput.value.files.length > 0) {
    const file = fileInput.value.files[0];
    const PhotoImage = new FormData();
    PhotoImage.append("photo", file);
    // const files = PhotoImage.get("photo"); // 驗證檔案室否有值
    // console.log(files); // 驗證檔案室否有值
    // console.log(PhotoImage);
    try {
      const res = await fetch(`${Address}/api/MembersAPI/${id}/upload`, {
        method: "POST",
        body: PhotoImage
      });

      if (res.ok) {
        const data = await res.text();
        console.log(data);
        prop.member.image = data;
      } else {
        const errorText = await res.text();
        errorMessage.value = errorText;
      }
    } catch (error) {
      console.error("上傳照片時發生錯誤：", error);
      errorMessage.value = "上傳照片時發生錯誤";
    }
  }
};
// 照片驗證格式
const validatePhoto = () => {
  const file = fileInput.value.files[0];
  const allowedFormats = [".jpg", ".jpeg", ".png", ".gif", ".tif", ".bmp"];
  const fileExtension = file.name
    .substring(file.name.lastIndexOf("."))
    .toLowerCase();
  if (!allowedFormats.includes(fileExtension)) {
    errorMessage.value =
      "上傳格式錯誤，請選擇支援的照片格式（.jpg、.jpeg、.png、.gif、.tif、.bmp）";
    previewImage.value.value = null;
  } else {
    // 檔案格式正確，顯示預覽照片
    const reader = new FileReader();
    reader.onload = event => {
      previewImage.value = event.target.result;
    };
    reader.readAsDataURL(file);
    errorMessage.value = ""; // 清空錯誤訊息
  }
};
const openUploadModal = () => {
  previewImage.value = null;
  fileInput.value.value = null;
  errorMessage.value = "";
  showUploadModal.value = true;
  console.log(showUploadModal.value);
};
</script> 
<script>
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

.hover-image {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .hover-image {
  opacity: 40%;
}

img {
  border-radius: 50%;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;
  background-color: #eee;
  color: #888;
}

label {
  display: flex;
  justify-content: center;
  align-items: left;
  margin-top: 25px;
}
.preview-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* 設定預覽容器的高度 */
}

.preview-image {
  max-width: 100%; /* 限制預覽圖片的最大寬度 */
  max-height: 100%; /* 限制預覽圖片的最大高度 */
}
</style>
