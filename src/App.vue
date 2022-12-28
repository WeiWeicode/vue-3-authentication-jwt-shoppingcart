<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">專案測試</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>





      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>


      <div class="btn-group">
        <!-- <div v-if="currentUser" class="navbar-nav ml-auto "> -->
        <div v-if="currentUser" class="navbar-nav ml-auto ">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            個人資訊
          </router-link>
          </li>

          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" data-display="static"
            aria-expanded="false" >
            選單
          </button>
          <div class="dropdown-menu dropdown-menu-lg-right" style="background-color:#595959;padding:10px;margin-bottom:5px;">
            <button class="dropdown-item nav-link" type="button" @click="myOrder">訂單查詢</button>
            <button class="dropdown-item nav-link" type="button" @click.prevent="logOut">LogOut</button>
          </div>


          <!-- <button class="dropdown-item" type="button">Action</button> -->

        </div>
      </div>




      <!-- <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div> -->



    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
      //currentUser: 取得目前使用者的資料 
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }
      // showAdminBoard: 如果目前使用者有「ROLE_ADMIN」的權限，則顯示「Admin Board」 
      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }
      // showModeratorBoard: 如果目前使用者有「ROLE_MODERATOR」的權限，則顯示「Moderator Board」
      return false;
    },

    myOrder() {
      this.$router.push('/myorder');
    }

  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
    // logOut: 登出
  }
};
</script>