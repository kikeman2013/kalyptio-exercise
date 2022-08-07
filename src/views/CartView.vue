<template >
  <v-container >
    <v-col align="center" v-if="isEmptyCart()">
      <v-row
      class="d-flex justify-center "
      >
        <v-card elevation-5 min-width="200px" width="750px" max-width="900px" color="indigo dark--1">
          <v-row >
            <v-col class="mr-n5">
              <v-row 
              v-for="(item, index) in Cart" :key="index"
              class="mx-1 my-1"
              >
                <v-col v-if="item.count>0">
                  <v-card>
                    <v-row>
                      <v-col cols="5">
                        <v-card-title  class="text-body-2 text-sm-body-1 text-md-h5">
                          {{getName(item.code)}}
                        </v-card-title>
                      </v-col>
                      <v-col>
                        <v-row>
                          Count: {{item.count}}
                        </v-row>
                        <v-row>
                          Unit Price: <span class="green--text pl-1">{{formatMoney(getPrice(item.code))}}</span> 
                        </v-row>
                        <v-row>
                          Total Price: <span class="green--text pl-1">{{formatMoney(getTotalUnitOffer(item))}}</span> 
                        </v-row>
                        <v-row v-if="getOffer(item) > 0">
                          Offer: <span class="red--text pl-1">{{formatMoney(getOffer(item))}}</span> 
                        </v-row>
                      </v-col>
                      <v-col cols="3" class="mr-2" >
                        <v-avatar 
                        height="80px"
                        width="60px"
                        >
                          <v-img class="bordeimg " min-width="40px" max-width="60px" :src="getImg(item.code)"></v-img>
                        </v-avatar>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>   
              </v-row>
            </v-col>
            <v-col cols="12" sm="3" class="d-flex align-end justify-center mr-2">
              <v-card min-width="150px" min-height="150px" class="mb-2 mr-2">
                <v-card-text primary-title>
                  <v-col class="d-flex align-center justify-center font-weight-bold">
                    <v-row class="text-h6 mb-4 ">Total:</v-row>
                    <v-row class="orange--text ">{{formatMoney(total)}}</v-row>
                  </v-col>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="success" @click="buy()">Buy</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-col>
    <v-col v-else class="d-flex align-center justify-center font-weight-bold">
      <v-card>
        <v-card-title class="text-body-1 text-sm-h4  text-md-h2"> 
          you must first add items to the cart
        </v-card-title>
        <v-img src="https://media.istockphoto.com/photos/shopping-cart-buying-picture-id184621901?b=1&k=20&m=184621901&s=612x612&w=0&h=W5fPCEDkXT2WniY27HN2lJ_aq7-63QklLHnKre8jrzc="></v-img>
      </v-card>
    </v-col>
  </v-container>
</template>
<script>

export default {
  name: 'Cart',
  props:{
    Cart:[]
  },
   data: () => ({
    total:0,
    items:[],
   }),
   created() {

    this.getItems()
    this.getTotal()
   },
   methods:{
    getItems(){
      this.$axios({
        method: 'get',
        url: `/api/products/`,
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        this.items = response.data.data
      })
      .catch((error) =>  console.log(error))
    },
    isEmptyCart(){
      let count = 0
      this.Cart.forEach(item => count +=item.count)
      return count >0 ? true:false
    },
    getItem(code){return this.items.find(elem => elem.code== code)},
    getName(code){return  this.getItem(code).name},
    getImg(code){return  this.getItem(code).img},
    getPrice(code){return  this.getItem(code).price},

    formatMoney(number) {
      number = number/100
      return number.toLocaleString("en", {
        style: "currency",
        currency: "MXN"
        })
    },
    getTotalUnitOffer({code , count}){
      let price = 0
      let offer = 0 //variable usada para asignar la promocion
      const item = this.items.find(elem => elem.code== code)
      switch (item.code) {
        case 'PEN':
            offer = Math.trunc(count/3)
            price = (count-offer) * item.price
        break;
        case 'TSHIRT':
            offer = count >= 3 ? item.price*.75:item.price
            price = count * offer
        break;
        case 'MUG':
            price = count * item.price
        break;
      }
      return price
    },
    getOffer(item){
      const totalPrice = this.getPrice(item.code)*item.count
      return totalPrice-this.getTotalUnitOffer(item)
    },
    async getTotal(){
      const basketId = localStorage.getItem('basketId')
      await this.$axios({
        method: 'get',
        url: `/api/basket/total/${basketId}`,
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => this.total = response.data.data)
      .catch((error) =>  console.log(error))
    },
    buy(){
      window.alert('you have buy :D')
    }
   }
}
</script>
<style >
  
</style>