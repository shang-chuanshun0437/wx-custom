<template>
    <div class="instruction">
        <span >使用说明</span>
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
.instruction{
  position: relative;
  top: 100px;
  background-color: white;
}
</style>
