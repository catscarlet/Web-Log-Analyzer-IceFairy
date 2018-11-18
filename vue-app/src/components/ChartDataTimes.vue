<template>
<div>

    <div class="panel-header">
        <span>ChartDataTime</span>

        <div class="page-button">
            <!--
            <el-button type="primary" size="mini" @click="test">test</el-button>
            -->
            <el-button-group>
            </el-button-group>

        </div>
    </div>

    <div class="chart1">
        <line-chart :chart_data="chart_data" :styles="{height: 'calc(100vh - 136px)', position: 'relative'}"></line-chart>
    </div>

</div>
</template>

<script>
import LineChart from '../subcomponents/LineChart.vue';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: JSON.parse(window.localStorage.getItem('AnalyzedData')),
            items: [],
            list: [],
            chart_data: {},
        };
    },
    components: {
        LineChart,
    },
    methods: {
        initPage() {
            this.items = this.analyzed_data.chart_data_time,
            this.showChart();
        },
        showChart() {
            let items = this.items;

            let labels = [];
            let data = [];

            for (let variable in items) {
                labels.push(variable);
                data.push({
                    x: variable,
                    y: items[variable],
                });
            }
            let label = 'ChartDataTimes';
            let chart_data = {

                labels: labels,
                datasets: [
                    {
                        label: label,
                        backgroundColor: '#495a9b',
                        data: data,
                    },
                ],
            };
            console.log(chart_data);
            this.chart_data = chart_data;
        },
        /*
        test() {
            console.log(this.items);
            console.log(this.chart_data);
        },
        */
    },
    beforeMount() {
        this.initPage();
    },
    mounted() {

    },
    watch: {
        page: function(val, oldVal) {
            this.showChart();
        },
    },
};
</script>

<style>
.panel-header {
    display: flex;
    justify-content: space-between;
}

.panel-title {
    align-items: center;
    display: flex;
}

.page-button {
    align-content: center;
    display: flex;
}

.page-span {
    align-content: center;
    display: flex;
}

.chart1 {
    height: calc(100vh - 168px);
}

.chart2 {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>
