<template>
  <div class="stores-wrapper">
    <MyStoreLeftSideNav v-if="show==1"></MyStoreLeftSideNav>
    <StoreInfoLeftSideNav v-if="show==2"></StoreInfoLeftSideNav>
  </div>
</template>

<script>

  import MyStoreLeftSideNav from './MyStoreLeftSideNav';
  import StoreInfoLeftSideNav from './StoreInfoLeftSideNav';

  import { mapState } from "vuex";

  export default {
    name: 'Store',
    components: {
      MyStoreLeftSideNav,
      StoreInfoLeftSideNav,
    },
    data() {
      return {

      };
    },
    computed: {
      ...mapState("leftSideSelect", {
        show: state => state.show,
      }),
    },
    created() {
      let leftSideSelect = JSON.parse(window.localStorage.getItem('leftSideSelect'));
      this.$store.dispatch("leftSideSelect/list",leftSideSelect.show);
    },
  }
</script>

<style scoped>
  .stores-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
  }

</style>
