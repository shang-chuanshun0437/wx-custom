<template>
  <div id="content" class="app">
    <Top></Top>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

import Top from './components/common/Top'

export default {
  name: 'App',
  components: {
    Top,
  },
  created() {
    let user = JSON.parse(window.localStorage.getItem('access-user'));
    let result = {
      userPhone:user.userPhone,
      token:user.token
    };
    this.$store.dispatch("login/login",result);
  },
}
</script>

<style scoped>
  .app{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
</style>
