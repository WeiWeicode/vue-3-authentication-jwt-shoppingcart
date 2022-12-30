<template>
    <h1>產品列表</h1>
    <hr>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">產品編號</th>
                <th scope="col">產品名稱</th>
                <th scope="col">產品價格</th>
                <th scope="col">產品圖片</th>
                <th scope="col">產品描述</th>

                <th scope="col">產品是否上架</th>
                <th scope="col">產品更新日期</th>
                <th scope="col">產品建立日期</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td><img :src="path + item.image" class="card-img-top" alt=""></td>
                <!-- <img :src="path + item.image" class="card-img-top" alt=""> -->

                <td>{{ item.description }}</td>

                <td>{{ item.published }}</td>
                <td>{{ item.updatedAt }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                        @click="updataproducts(item)">
                        修改
                    </button>
                    <!-- 修改彈出視窗 引用Updataproducts.vue面板 -->
                </td>
            </tr>
        </tbody>
    </table>



    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <Updataproducts></Updataproducts>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>

</template>
    
<script>
import axios from 'axios';
import Updataproducts from './Updataproducts.vue';

export default {
    components: {
        Updataproducts,
    },
    data() {
        return {
            products: [],


            path: "http://192.168.68.60:8082/"

        }
    },

    mounted:
        function () {
            axios.get("http://192.168.68.60:8082/api/products/allProducts")
                .then((res) => {
                    this.products = res.data
                    console.log(this.products)
                })
                .catch((err) => {
                    console.log(err)
                })

        },

    methods: {
        // updataproducts:item寫入localStorage
        updataproducts(item) {
            localStorage.setItem('item', JSON.stringify(item));
        },
        
    },


    computed: {


    },



}

</script>