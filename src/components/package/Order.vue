<template>
  <h1>訂單</h1>
  <!-- 查詢 -->
  <input type="text" v-model="select">




  <hr>

  <table class="table table-bordered">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">訂單編號</th>
        <th scope="col">產品項目</th>
        <th scope="col">金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">物流狀態</th>
        <th scope="col">訂單日期</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in orders" :key="item.id">
        <!-- 取得陣列序號 -->
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item.ord_number }}</td>

        <td>
          <!-- 產品點擊顯示 資料在orders的orderproduct Json格式-->




          <table class="table table-borderless">

            <tbody>
              <tr v-for="(item, index) in item.orderproduct" :key="item.id">
                <td>{{ item.ord_product_title }}</td>
                <td>{{ item.ord_product_price }}</td>
              </tr>
            </tbody>
          </table>


        </td>

        <td>{{ item.ord_total }}</td>
        <td>{{ item.ord_state }}</td>
        <td>{{ item.ord_logistics }}</td>
        <td>{{ item.createdAt }}</td>
      </tr>
    </tbody>

  </table>

  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>



</template>

<script>
import axios from "axios";


export default {
  data() {
    return {
      ordersTemp: [],
      user_id: '',
      select: '',


    }
  },

  mounted: function () {
    // 取得本地端user的id
    let user = JSON.parse(localStorage.getItem('user'));
    this.user_id = user.id


    // axios取得訂單資料
    axios.get('http://192.168.68.60:8082/api/products/getOrderProductsUser/' + this.user_id)
      .then((res) => {
        this.ordersTemp = res.data
        console.log(this.orders)
      })
      .catch((err) => {
        console.log(err)
      })


  },

  computed: {
    orders() {
      return this.ordersTemp.filter
        (searchResult => searchResult.ord_number.includes(this.select));
    }
  },

}

</script>