checkLogin()
renderUserName()
registerLogout()
getData()

// 薪资走势
function renderYearSalary(year) {
    const chartDom = document.querySelector('#line');
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '2023年全学科薪资走势',
            top: 15,
            left: 15,
        },
        tooltip: {
            show: true,
            // 触发方式
            trigger: 'axis',
        },
        grid: {
            show: true,
        },
        xAxis: {
            type: 'category',
            data: year.map(v => v.month),
            axisLine: {
                // show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#ccc',
                }
            }
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                }
            }
        },
        series: [
            {
                data: year.map(v => v.salary),
                type: 'line',
                smooth: true,
                // 小圆点大小
                symbolSize: 8,
                // 线的样式
                lineStyle: {
                    // 线宽
                    width: 6,
                    // 线的颜色
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            { offset: 0, color: '#6387FF' },   // 0% 处的颜色
                            { offset: 0.5, color: '#579FFF' }, // 50% 处的颜色
                            { offset: 1, color: '#51ABFF' },   // 100% 处的颜色
                        ]
                    }
                },
                // 区域填充样式
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#8CC3FC' },   // 0% 处的颜色
                            { offset: 0.5, color: '#F1FFFF' }, // 50% 处的颜色
                            { offset: 1, color: '#fff' },      // 100% 处的颜色
                        ],
                        global: false,
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

}

// 班级薪资分布
function renderSalary(salaryData) {
    const chartDom = document.getElementById('salary');
    const myChart = echarts.init(chartDom);
    const option = {
        title: {
            text: '班级薪资分布',
            top: 15,
            left: 15,
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '班级薪资分布',
                type: 'pie',
                // 数组的第一项是内半径  第二项是外半径
                radius: ['55%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    //半径
                    borderRadius: 10,
                    // 颜色
                    borderColor: '#fff',
                    // 粗细
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: salaryData.map(v => {
                    return {
                        value: v.g_count + v.b_count,
                        name: v.label
                    }
                })
                // data: [
                //     { value: 1048, name: 'Search Engine' },
                //     { value: 735, name: 'Direct' },
                //     { value: 580, name: 'Email' },
                //     { value: 484, name: 'Union Ads' },
                //     { value: 300, name: 'Video Ads' }
                // ]
            }
        ]
    };

    option && myChart.setOption(option);

}

// 班级每组薪资
function renderGroupSalary(groupData) {
    const chartDom = document.getElementById('lines');
    const myChart = echarts.init(chartDom);
    const option = {
        grid: {
            show: true
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: groupData[1].map(v => v.name),
            axisLine: {
                lineStyle: {
                    type: 'dashed',
                }
            },
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                }
            },
        },
        series: [
            {
                name: '期望薪资',
                data: groupData[1].map(v => v.hope_salary),
                type: 'bar',
                itemStyle: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#4DD9A7' },
                            { offset: 0.5, color: '#80E4C0' },
                            { offset: 1, color: '#B6F1DD' },
                        ],
                        global: false,
                    }
                }

            },
            {
                name: '实际薪资',
                data: groupData[1].map(v => v.salary),
                type: 'bar',
                itemStyle: {
                    color: {
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            { offset: 0, color: '#5EADF3' },
                            { offset: 0.5, color: '#98CAF6' },
                            { offset: 1, color: '#C4E0F9' },
                        ]
                    }
                }
            }
        ]
    };

    option && myChart.setOption(option);

    // 高亮切换
    const btns = document.querySelector('#btns')
    btns.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn')) {
            btns.querySelector('.btn-blue').classList.remove('btn-blue')
            e.target.classList.add('btn-blue')
            const index = e.target.innerText
            console.log(index);
            const data = groupData[index]
            option.xAxis.data = data.map(v => v.name)
            option.series[0].data = data.map(v => v.hope_salary)
            option.series[1].data = data.map(v => v.salary)

            // 重新渲染
            myChart.setOption(option)
        }
    })
}

// 男女薪资分布
function renderGenderSalary(salaryData) {
    const chartDom = document.getElementById('gender');
    const myChart = echarts.init(chartDom);
    const option = {
        title: [{
            text: '男女薪资分布表',
            top: 15,
            left: 15
        },
        {
            text: "女生",
            left: 'center',
            top: '45%'
        },
        {
            text: "男生",
            left: 'center',
            top: '86%'
        },
        ],
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                type: 'pie',
                radius: ['20%', '30%'],
                center: ['50%', '30%'],
                labelLine: {
                    show: true
                },
                data: salaryData.map(v => {
                    return {
                        value: v.g_count,
                        name: v.label
                    }
                })
                // data: [
                //     { value: 1548, name: 'Search Engine' },
                //     { value: 775, name: 'Direct' },
                //     { value: 679, name: 'Marketing', }
                // ]
            },
            {
                type: 'pie',
                radius: ['20%', '30%'],
                center: ['50%', '70%'],
                labelLine: {
                    length: 30
                },
                data: salaryData.map(v => {
                    return {
                        value: v.b_count,
                        name: v.label
                    }
                })
                // data: [
                //     { value: 1048, name: 'Baidu' },
                //     { value: 335, name: 'Direct' },
                //     { value: 310, name: 'Email' },
                //     { value: 251, name: 'Google' },
                //     { value: 234, name: 'Union Ads' },
                //     { value: 147, name: 'Bing' },
                //     { value: 135, name: 'Video Ads' },
                //     { value: 102, name: 'Others' }
                // ]
            }
        ]
    };

    option && myChart.setOption(option);
}

// 籍贯分布
function renderProvince(provinceData) {
    const dataList = [
        { name: '北京', value: 0 },
        { name: '天津', value: 0 },
        { name: '上海', value: 0 },
        { name: '重庆', value: 0 },
        { name: '河北', value: 0 },
        { name: '河南', value: 0 },
        { name: '云南', value: 0 },
        { name: '辽宁', value: 0 },
        { name: '黑龙江', value: 0 },
        { name: '湖南', value: 0 },
        { name: '安徽', value: 0 },
        { name: '山东', value: 0 },
        { name: '新疆', value: 0 },
        { name: '江苏', value: 0 },
        { name: '浙江', value: 0 },
        { name: '江西', value: 0 },
        { name: '湖北', value: 0 },
        { name: '广西', value: 0 },
        { name: '甘肃', value: 0 },
        { name: '山西', value: 0 },
        { name: '内蒙古', value: 0 },
        { name: '陕西', value: 0 },
        { name: '吉林', value: 0 },
        { name: '福建', value: 0 },
        { name: '贵州', value: 0 },
        { name: '广东', value: 0 },
        { name: '青海', value: 0 },
        { name: '西藏', value: 0 },
        { name: '四川', value: 0 },
        { name: '宁夏', value: 0 },
        { name: '海南', value: 0 },
        { name: '台湾', value: 0 },
        { name: '香港', value: 0 },
        { name: '澳门', value: 0 },
    ]
    dataList.forEach(item => {
        const res = provinceData.find(v => {
            return v.name.includes(item.name)
        })
        if (res !== undefined) {
            item.value = res.value
        }
    })
    console.log(dataList)

    const dom = document.querySelector("#map")
    const myChart = echarts.init(dom)


    let option = {
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: false,
            orient: 'horizontal',
            inRange: {
                color: ['#e0ffff', '#006edd'],
                symbolSize: [30, 100]
            }
        },
        // tooltip: {
        //     padding:8,
        //     enterable: true,
        //     transitionDuration: 1,
        //     textStyle: {
        //         color: '#fff',
        //         decoration: 'none',
        //     }
        // },
        series: [{
            name: '接入医院数量',
            type: 'map',
            mapType: 'china',
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                },
                emphasis: {
                    label: {
                        show: true
                    }
                }
            },
            label: {
                normal: { //静态的时候展示样式
                    show: true, //是否显示地图省份得名称
                    textStyle: {
                        color: "#fff",
                        fontSize: 12
                    }
                },
                emphasis: { //动态展示的样式
                    color: '#f00',
                },
            },
            data: dataList

        },]
    }
    myChart.setOption(option)
}
