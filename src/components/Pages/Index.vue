<template>
  <div id="Index">
    <div class="main">
      <div class="store-info">店铺信息</div>
      <div class="store-card">
        <div class="store-img f-l">
          <img src="../../assets/images/store.png">
        </div>
        <div class="store-infos f-l">
          <p class="s-item">{{storeInfos.name}}</p>
          <p class="s-item pary"><i class="el-icon-phone"></i>{{storeInfos.phone}}</p>
          <p class="s-item pary"><i class="el-icon-location"></i>{{storeInfos.address}}</p>
        </div>
        <div class="changeStore">切换店铺</div>
      </div>
      <div class="store-data">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="item">
              <div class=""></div>
              <div class=""></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <div class=""></div>
              <div class=""></div>
            </div>
          </el-col>
        </el-row>
      </div>  
      <div class="chart-box">
        <div class="top">
          营业额度曲线图
          <div class="tags">
            <div 
              class="tag f-l" 
              v-for="(item,index) in types" 
              :class="{active: activeIndex == index}"
              @click="changeActive(index)"
              >
            {{item.name}}
          </div>
          </div>
        </div>
        <div class="chart">
          <div id="echart"></div>
        </div>
      </div>
      <div class="store-data bot-data">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="item">
              <div class="num green">123</div>
              <div class="name">商品种类</div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="item">
              <div class="num blue">323</div>
              <div class="name">商品数量</div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="item">
              <div class="num bluesky">34</div>
              <div class="name">会员数量</div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="item">
              <div class="num orange">6</div>
              <div class="name">供应商数量</div>
            </div>
          </el-col>
        </el-row>
      </div>  
    </div>
  </div>
</template>

<script>
  import api from './../../axios/index.js'
export default {
  data () {
    return {
      storeInfos: {
        name: '又来贸易便利店',
        phone: '1345678524',
        address: '所发生的防辐射的方法第三方'
      },
      types: [
        {type: 'd', name: '日'},
         {type: 'w', name: '周'},
          {type: 'm', name: '月'},
           {type: 'y', name: '年'}
      ],
      activeIndex: 0
    }
  },
  mounted(){
    this.getChartData();
  },
  methods: {
    changeActive(index){
      this.activeIndex = index;
    },
    getChartData(){
      api.$http('/news/indexChart', '')
      .then( res=> {
        let data = res.data;
        let data1 = [],
            data2 = [];
            data.forEach( item => {
              data1.push(item.date);
              data2.push(item.num)
            })
        this.setChart(data1,data2)
      })
      .catch(err=>{

      })
    },
    resizeCharts () {
      // let myChartbox = document.getElementById('myChart')
      // myChart.style.width = chartBox.style.width + 'px'
      // myChart.style.height = chartBox.style.height + 'px'
    },
    setChart(data1,data2){
      let myChart = this.$echarts.init(document.getElementById('echart'));
      myChart.setOption({
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     lineStyle: {
            //         color: '#ddd'
            //     }
            // },
            backgroundColor: 'rgba(255,255,255,1)',
            // padding: [5, 10],
            textStyle: {
                color: '#7588E4',
            },
            extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '10%',
        },
        xAxis: {
            type: 'category',
            data: data1,
            boundaryGap: false,
            // splitLine: {
            //     show: true,
            //     interval: 'auto',
            //     lineStyle: {
            //         color: ['#D4DFF5']
            //     }
            // },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        yAxis: {
          name: '单位/元',
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: ['#D4DFF5']
                }
            },
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#609ee9'
                }
            },
            axisLabel: {
                margin: 10,
                textStyle: {
                    fontSize: 14
                }
            }
        },
        series: [{
            name: '数值',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            // symbolSize: 6,
            data: data2,
            areaStyle: {
              color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                      offset: 0, color: '#fff' // 0% 处的颜色
                  }, {
                      offset: 1, color: 'rgba(162,231,237)' // 100% 处的颜色
                  }],
                  globalCoord: false // 缺省为 false
              }
            },
            itemStyle: {
                normal: {
                    color: '#58c8da'
                }
            },
            lineStyle: {
                normal: {
                    width: 3
                }
            }
        }]
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .f-l {
    float: left;
  }
  .f-r{
    float: right;
  }
  .top {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    background: #fff;
    .add {
      padding: 20px 0;
      height: 20px;
      line-height: 20px;
      color: #cbcbcb;
    }
  }
  .main {
    padding: 20px;
    .store-info {
      height: 20px;
      line-height: 20px;
      color: #cbcbcb;
    }
    .store-card {
      padding: 16px 20px;
      box-shadow: 0 0 1px 1px #cbcbcb;
      overflow: hidden;
      position: relative;
      .changeStore {
        position: absolute;
        top: 16px;
        right: 20px;
        height: 20px;
        line-height: 20px;
        color: #cbcbcb;
      }
      .store-img {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .store-infos {
        padding-left: 15px;
        .s-item {
          height: 24px;
          line-height: 24px;
        }
        .pary {
          color: #cbcbcb;
        }
      }
    }
    .store-data {
      margin-top: 35px;
      width: 100%;
      height: 124px;
      .item {
        height: 124px;
        background: #fff;
        box-shadow: 0 0 1px 1px #cbcbcb;
      }
    }
    .chart-box {
      padding: 10px;
      margin-top: 30px;
      box-shadow: 0 0 1px 1px #cbcbcb;
      background: #fff;
      .top {
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #bdbdbd;
        position: relative;
        .tags {
          position: absolute;
          right: 0;
          top: 0;
          height: 20px;
          border: 1px solid #cbcbcb;
          border-right: none;
          .tag {
            width: 40px;
            height: 20px;
            line-height: 20px;
            color: #cbcbcb;
            border-right: 1px solid #cbcbcb;
          }
          .active {
            background: #0eb089;
            color: #fff;
          }
        }
      }
      .chart {
        height: 260px;
        #echart {
          width: 100%;
          height: 260px;
        }
      }
    }
    .bot-data {
      .item {
        text-align: center;
        .num {
          font-size: 24px;
          padding-top: 37px;
        }
        .name {
          padding-top: 16px;
        }
        .green {
          color: #11b088;
        }
        .blue {
          color: #6c80f0;
        }
        .bluesky {
          color: #0eb8eb;
        }
        .orange {
          color: #fa8514;
        }
      }
    }
  }
</style>
