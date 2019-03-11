<template>
  <div class="homeWrapper">
   <HomeLeftSideNav></HomeLeftSideNav>
  </div>
</template>

<script>

import HomeLeftSideNav from '@/components/common/HomeLeftSideNav';

export default {
  name: 'Home',
  components: {
    HomeLeftSideNav
  }

}
</script>

<style scoped>
.homeWrapper{
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
}

</style>
