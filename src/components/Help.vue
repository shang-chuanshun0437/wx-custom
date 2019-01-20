<template>
    <div class="help">
        <span >技术支持：</span>
      <div>联系电话：18753137390</div>
      <div>微信号：18753137390</div>
    </div>
</template>

<script>
  export default {
    name: 'Instructions',
    data() {
      return {
        currentDate: new Date(),
      };
    },
    mounted: function () {
    }
  }
</script>

<style scoped>
.help{
  position: relative;
  width: 100%;
  top: 100px;
  background-color: white;
}
</style>
