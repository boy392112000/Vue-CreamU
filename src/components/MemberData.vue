<template>
  <div class="mt-5">
    <button type="button" class="btn btn-primary position-relative">
      ~ VIP ~
      <span
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        Level{{member.level}}
        <span class="visually-hidden">unread messages</span>
      </span>
    </button>
    <div class="image-container">
      <img :src="`https://localhost:7098/imgs/${member.image}`" width="400" height="400" />
      <div class="hover-image">
        <img
          src="https://png.pngtree.com/png-vector/20190725/ourmid/pngtree-vector-camera-icon-png-image_1576543.jpg"
          width="400"
          height="400"
        />
      </div>
    </div>
    <label>
      <h2>{{member.name}}</h2>
    </label>
  </div>
</template>

 <script setup>
const prop = defineProps({
  member: Object
});
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
  opacity: 50%;
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
</style>
