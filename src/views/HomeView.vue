<template>
  <ShopKalyptio @items="toAppbar" :Cart="Cart"/>
</template>

<script>
  import ShopKalyptio from '@/components/ShopKalyptio.vue'
  export default {
    name: 'Home',

    components: {
    ShopKalyptio,
    },
    props:{
      Cart:Array
    },
    data: () =>({

    }),
    methods:{
      toAppbar(items){
        this.$emit('items', items)
      }
    }
  }
</script>
