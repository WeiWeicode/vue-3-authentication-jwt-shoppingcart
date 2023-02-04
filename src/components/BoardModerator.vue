<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>

    </header>
  </div>
  <!-- content = 需要版主權限! 才顯示Addproducts-->
  <Addproducts v-if="content == '版主角色連線成功.'" ></Addproducts>

  <!-- <Addproducts></Addproducts> -->
  <Card></Card>
</template>
  
<script>
import UserService from "../services/user.service";
import Addproducts from "./moderatorpackage/Addproducts.vue";

export default {
  name: "Moderator",

  components: {
    Addproducts,
  },

  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getModeratorBoard().then(
      // userService.getModeratorBoard(): 取得/services/user.service getModeratorBoard的內容
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },


};
</script>