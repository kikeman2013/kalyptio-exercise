<template>
    <v-app-bar
      app
      color="white"
      dark
    >
      <div  class="d-flex align-center">
        <v-img
          alt="Kalyptio Logo"
          class="mr-2"
          max-height="50px"
          max-width="200px"
          contain
          src='@/assets/kalyptioLogo.png'
          transition="scale-transition"
          @click="toHome()"
        />
      </div>
    <v-chip outlined medium md-large label class=" text-body-1 text-md-h5 mr-2" color="indigo darken-1" @click="toHome()">Shop</v-chip>
      <v-spacer></v-spacer>
      <v-btn color="red"  small @click="deleteCart()" rounded > Delete Basket<v-icon medium color="white">mdi-cart-minus</v-icon></v-btn>
     <v-badge
        color="green"
        :value="countCart"
        :content="countCart"
        v-if="countCart"
        overlap
      >
      <v-btn color="warning"  class="ml-2"  small @click="toCart()"  rounded>Basket<v-icon medium color="white">mdi-cart-outline</v-icon></v-btn>
      </v-badge>
      <v-badge
        color="green"
        :value="count"
        :content="count"
        v-if="!countCart"
        overlap
      >
      <v-btn color="warning"  class="ml-2"  small @click="toCart()" rounded>Basket<v-icon medium color="white">mdi-cart-outline</v-icon></v-btn>
      </v-badge>
      
    </v-app-bar>
</template>
<script>
export default {
    name: 'AppBarComponent',
    props:{
      countCart: Number
    },
  data: () => ({
    count:0
  }),
  created(){
    this.getBascket()
  },
  methods: {
    getBascket(){
      let basketId = localStorage.getItem('basketId')
      this.$axios({
            method: 'get',
            url: `/api/basket/${basketId}`,
            headers: {'Content-Type': 'application/json'}
          })
          .then((response) => {
            let cart = response.data.data.items
           
            let auxcount = 0
             if(!this.countCart)
              for (const item of cart) auxcount = auxcount + item.count
              this.count = auxcount
          })
          .catch((error) =>  console.log(error))
    },
    toHome(){
      this.$router.push({ name: 'home' }).catch(()=>{});
    },
    toCart(){
      this.$router.push({ name: 'cart' }).catch(()=>{});
    },
    deleteCart(){
      
      let basketId = localStorage.getItem('basketId')
      this.$axios({
        method: 'delete',
        url: `/api/basket/delete/${basketId}`,
        headers: {'Content-Type': 'application/json'}
      })
      .then(() => {
        localStorage.removeItem('basketId')
        this.$router.go('/')
        })
      .catch((error) =>  console.log(error))
      
    }
    
  },
}
</script>
<style >
    
</style>