/*
*柱状图
*/
<template>
  <div :id="id"></div>
</template>

<script>
  import G2 from '@antv/g2';
  export default {
    data () {
      return {
        chart: null
      }
    },
    props: {
      charData: {
        type: Array,
        default: function () {
          return {
            data: []
          }
        }
      },
      id: String
    },
    // 监听API接口传过来的数据  2018-08-21更新
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        this.drawChart(val);
      }
    },
    methods: {
      drawChart: function () {
        this.chart && this.chart.destory()
        this.chart = new G2.Chart({
          container: this.id,
          width: 400,
          height: 400
        })
        this.chart.source(this.charData)
        this.chart.scale('value', {
          tickInterval: 20
        });
        this.chart.interval().position('year*value');
        this.chart.render();
      }
    }
  }
</script>
