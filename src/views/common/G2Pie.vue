/*
*饼状图
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
    created() {
      console.log("G2Pie created")
    },
    //mounted() {
      //this.drawChart();
    //},
    // 监听API接口传过来的数据  2018-08-21更新
    watch: {
      charData: function (val, oldVal) {    // 监听charData，当放生变化时，触发这个回调函数绘制图表
        console.log('new: %s, old: %s', val, oldVal);
        this.drawChart(val);
      }
    },
    methods: {
      drawChart() {
        this.chart && this.chart.destory()
        this.chart = new G2.Chart({
          container: this.id,
          width: 400,
          height: 400
        })
        this.chart.source(this.charData, {
          percent: {
            formatter: function formatter(val) {
              val = val * 100 + '%';
              return val;
            }
          }
        });
        console.log("G2Pie++++");
        console.log(this.charData);
        this.chart.coord('theta');
        this.chart.tooltip({
          showTitle: false
        });
        this.chart.intervalStack().position('percent').color('item').label('percent', {
          offset: -40,
          // autoRotate: false,
          textStyle: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)'
          }
        }).tooltip('item*percent', function(item, percent) {
          percent = percent * 100 + '%';
          return {
            name: item,
            value: percent
          };
        }).style({
          lineWidth: 2,
          stroke: '#fff'
        });
        this.chart.render();
      }
    }
  }
</script>
