<template>
  <div>
    <div v-if="show==1">
      <MyStoreLeftSideNav></MyStoreLeftSideNav>
    </div>
    <div v-if="show==2">
      <StoreInfoLeftSideNav></StoreInfoLeftSideNav>
    </div>
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


</style>
