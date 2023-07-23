<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="http://localhost:5173/">CreamU</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >Member</a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/Member">My Account</router-link>
              </li>
              <li>
                <a class="dropdown-item" href="#">Shopping Cart</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#">Order History</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- <router-link class="nav-link active" to="/Member">Member</router-link>
  </li>-->
</template>
    
<script setup>
</script>
    
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@1,300&family=Noto+Sans+HK:wght@700&display=swap");
nav {
  font-family: "Josefin Sans", sans-serif;
  font-family: "Noto Sans HK", sans-serif;
}
</style>