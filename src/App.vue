<template>
  <v-app>
    <AppBar :countCart="countCart"/>
    <v-main>
      <router-view @items="toAppbar" :Cart="cart"/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar.vue';
import Footer from '@/components/Footer.vue';
export default {
  name: 'App',
  components: {
    AppBar,
    Footer,

},
  data: () => ({
    countCart : 0,
    cart: [],
    validate:false
  }),
  created(){
    let basketId = localStorage.getItem('basketId') || undefined
    if(basketId){
      this.validateBasket(basketId)
      if(this.validate)this.getBascket()
    } 
    else
     this.createbasket()
  },
  mounted(){
    this.getBascket()
  },
  methods:{
    getBascket(){
      let basketId = localStorage.getItem('basketId')
      this.$axios({
            method: 'get',
            url: `/api/basket/${basketId}`,
            headers: {'Content-Type': 'application/json'}
          })
          .then((response) => this.cart = response.data.data.items)
          .catch((error) =>  console.log(error))
    },
    toAppbar(items){
      let count= 0
      for (const item of items) count = count + item.count
      this.countCart = count
      this.cart = items
      },
    async createbasket(){
      await this.$axios({
            method: 'post',
            url: `/api/basket/create`,
            data:{cart: {items:[]}},
            headers: {'Content-Type': 'application/json'}
          })
          .then((response) => localStorage.setItem('basketId', response.data.data.basketId))
          .catch((error) =>  console.log(error))
    },
    validateBasket(basketId){
      this.$axios({
        method: 'get',
        url: `/api/basket/exist/${basketId}`,
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => this.validate = response.data)
      .catch((error) =>  console.log(error))
    }
  }
};
</script>

<style>
.bordeimg{
    border: 1px solid rgb(81, 59, 246);
}
</style>
