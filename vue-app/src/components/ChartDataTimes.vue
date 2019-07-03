<template>
<div>

    <div class="panel-header">
        <span>ChartDataTime</span>
        <span>Total: {{ total_data_time }}</span>

        <div class="page-button">
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
import {GlobalGetAnalyzedData} from '../common/';
import LineChart from '../subcomponents/LineChart.vue';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: GlobalGetAnalyzedData(),
            items: [],
            list: [],
            chart_data: {},
            total_data_time: 0,
        };
    },
    components: {
        LineChart,
    },
    methods: {
        initPage() {
            this.items = this.analyzed_data.chart_data_time,
            this.total_data_time = this.analyzed_data.total_data_time;

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
    },
    beforeMount() {
        this.initPage();
    },
    mounted() {
    },
    watch: {
    },
};
</script>

<style>
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2px;
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
</style>
