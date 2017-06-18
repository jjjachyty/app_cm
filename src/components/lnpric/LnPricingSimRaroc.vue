<template>
<div>
<br>
         <chart  :options="Raroc" auto-resize ></chart>  
</div>

</div>
</template>

<script>

export default {
  data () {
      
    return {
     
   Raroc : {
    tooltip : {
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
        }
    },

    series: [
        {
            name: '底线利率',
            type: 'gauge',
            radius : '90%',
            center : ['20%', '45%'],    // 默认全局居中
            max:20,
            min:3,
            //endAngle: 0,
            splitNumber:7,
            detail: {
                show:true,

                textStyle:{
                    fontSize:16
                },
                formatter:'{value}%'
                },
            data: [{value: 0,name:'底线'}],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                    color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]

                }
            },           axisTick: {            // 坐标轴小标记
                show: true
            },axisLabel:{
                show:false
            } , pointer: {
                width:2
            },
        },
        {
            name: '利率',
            type: 'gauge',
            center : ['51%', '45%'],    // 默认全局居中
            radius : '90%',
            max:20,
            min:3,
            //endAngle: 50,
            detail: {textStyle:{
                    fontSize:16
                },formatter:'{value}%'},
            data: [{value: 0,name:'优惠'}],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                   color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]

                }
            },           axisTick: {            // 坐标轴小标记
                show: true
            },axisLabel:{
                show:false
            } , pointer: {
                width:2
            },
        },
        {
            name: '利率',
            type: 'gauge',
            center : ['80%', '45%'],    // 默认全局居中
            radius : '90%',
            max:18,
            min:3,
            
            detail: {textStyle:{
                    fontSize:16
                },
                formatter:'{value}%'},
            data: [{value: 0,name:'目标'}],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                    color:[[0.2, '#c23531'],[0.5, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
                }
            },  
             axisTick: {            // 坐标轴小标记
                show: true,
                lineStyle: { 
                                   
                }
            },axisLabel:{
                show:false
            } , pointer: {
                width:2
            },
        }
    ]}}}
}
</script>

<style scoped>

.echarts{
    height:100px;
}



</style>