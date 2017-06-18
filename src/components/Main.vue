<template>
    <div>
    <router-view></router-view>
    <BottomNavigation></BottomNavigation>
</div>
</template>


<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import BottomNavigation from 'components/BottomNavigation'
  export default {
    components: {
BottomNavigation
    },
    data() {
      return {
       
  }
    }
  }
</script>
<style>

</style>