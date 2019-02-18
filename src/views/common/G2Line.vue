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
    created() {
      console.log("created")
    },
    // 监听API接口传过来的数据  2018-08-21更新
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        console.log('new: %s, old: %s', val, oldVal);
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
        console.log("drawChart")
        console.log(this.charData)
        this.chart.scale('value', {
          min: 0
        })
        this.chart.scale('year', {
          range: [0, 1]
        })
        this.chart.tooltip({
          crosshairs: {
            type: 'line'
          }
        })
        this.chart.line().position('year*value')
        this.chart.point().position('year*value').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        })
        this.chart.render()
      }
    }
  }
</script>
