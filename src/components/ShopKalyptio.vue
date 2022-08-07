<template>
  <v-container>
    <v-row  justify="space-around" >
      <v-col 
      cols="12" 
      sm="6" 
      md="4"
      lg="3"  
      class="ml-5 flex-grow-1 d-flex align-stretch"
       v-for="(item, index) in items" :key="index">
        <v-card elevation="5" width="300px">
          <v-img 
          class="bordeimg"
          max-width="500px" 
          min-width="200px"
          max-height="400px"
          min-height="300px"
          aspect-ratio="1/16"
          :src="item.img">   
          </v-img>
          <v-card-title primary-title>
            {{item.name}}
          </v-card-title>
          <v-card-subtitle class="green--text">
            {{formatMoney(item.price)}}
          </v-card-subtitle>
          <v-card-text class="text-subtitle-1">
            {{item.description}}
          </v-card-text>
          <v-card-text class="text-body-1">
           Stock: {{item.stock}}
          </v-card-text>
            <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-col>
              <v-row  justify="space-around">
                <v-btn color="success" fab outlined @click="addItemCart(item)" small><v-icon>mdi-cart-plus</v-icon></v-btn>
                <div class="text-h5">{{getAmount(item.code)}}</div>
                <v-btn color="warning" fab outlined @click="deleteItemCart(item)" small ><v-icon>mdi-cart-minus</v-icon></v-btn>
              </v-row>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ShopKalyptio',
    props:{
      Cart: Array
    },
    mounted(){
     if(this.Cart.length > 0)
      this.cart.items = this.Cart
    },
    
    data: () => ({
      cart:{items:[]},
      items:[]
    }),
    created(){
      this.getItems()
    },

    methods: {
    // format Money to Mx currency
    formatMoney(number) {
      number = number/100
      return number.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
        })
    },
    addItemCart(item){ //add an item to cart
      if(this.getAmount(item.code) < item.stock){
        const index = this.cart.items.findIndex(elem => elem.code == item.code)
        if(index == -1)
          this.cart.items.push({code:item.code , count: 1 })
        else
          this.cart.items[index].count++
        this.updateBasket()
        this.$emit('items', this.cart.items)
      }
    },
    deleteItemCart(item){ //delete an item to cart
      const itemsCount = this.getAmount(item.code)
      if(itemsCount > 0){
        const index = this.cart.items.findIndex(elem => elem.code == item.code)
        this.cart.items[index].count--
      }
      this.updateBasket()
      this.$emit('items', this.cart.items)
     
    },
    getAmount(code){//return count of items by item Code
    const item = this.cart.items.find(elem => elem.code== code)
      return  item == undefined ? 0 : item.count 
    },
    getItems(){
      this.$axios({
        method: 'get',
        url: `/api/products/`,
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => this.items = response.data.data)
      .catch((error) =>  console.log(error))
    },
    updateBasket(){
      const basketId = localStorage.getItem('basketId')
      this.$axios({
            method: 'put',
            url: `/api/basket/insert`,
            data:{
              basketId:basketId,
              cart:this.cart,
              },
            headers: {'Content-Type': 'application/json'}
          })
          .then((response) => response.data)
          .catch((error) =>  console.log(error))
    }
  },
  }
</script>

<style>

</style>
