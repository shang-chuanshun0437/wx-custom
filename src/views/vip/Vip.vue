<template>
    <div class="vip-wrapper">
      <VipLeftSideNav></VipLeftSideNav>
    </div>
</template>

<script>

import VipLeftSideNav from './VipLeftSideNav';

export default {
  name: 'Vip',
  components: {
    VipLeftSideNav,
  },
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
}
</script>

<style scoped>
  .vip-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
  }

</style>
