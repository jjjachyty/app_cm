<template>
<div>
<br>
         <chart  :options="Rate" auto-resize ></chart>  
</div>

</div>
</template>

<script>

export default {
  data () {
      
    return {
     
    Rate: {
        barWidth:8,
    tooltip: {
        trigger: 'axis'
    },
        grid: {
            top:'3%',
        left: '3%',
        right: '4%',
         bottom: '3%',
        containLabel: true
    },
    title : {
        //text: '测算利率',
        left:"40%",
        bottom:'0%'
    },
    toolbox: {
        feature: {

        }
    },
    // legend: {
    //     data:['利率','较基准上浮']
    // },
    xAxis: [
        {
            type: 'category',
            data: ['底线利率','优惠利率','目标利率']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '利率%',
            min: 3,
            max: 30,
            interval: 5,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '基准上浮%',
            min: -10,
            max: 60,
            interval: 10,
            axisLabel: {
                formatter: '{value}'
            }
        }
    ],
    series: [
        {
            name:'利率',
            type:'bar',
            color: ['#009688'],
            data:[0, 0, 0],
            label:{
                normal:{
                    show:true,
                    formatter:'{c}%',
                    position:'outside',
                    textStyle:{
                      color:"#009688",
                      fontStyle:'normal',
                      fontSize:18
                    }
                }}
        },
        {
            name:'较基准上浮',
            type:'line',
            color: ['#009688'],
            yAxisIndex: 1,
            data:[0, 0, 0],
            lineStyle:{
              normal:{
                 color:"#ff5722"
              }  
            },
            label:{
                normal:{
                    show:true,
                    formatter:'{c}%',
                    position:'outside',
                    textStyle:{
                      color:"#ff5722",
                      fontStyle:'oblique',
                      fontSize:18
                    }
                }}
        }
    ]
}
    }

  }
}
</script>

<style scoped>

.echarts{
    height:170px;
}



</style>