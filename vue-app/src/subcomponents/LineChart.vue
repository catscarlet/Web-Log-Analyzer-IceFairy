<script>
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: ['chart_data'],
    mounted() {
        console.log(this.chart_data);
        this.renderChart(this.chart_data, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    gridLines: {
                        display: true, // my new default options
                    },
                },],
                xAxes: [{
                    gridLines: {
                        display: false,
                    },
                },],
            },
        });
    },
};
</script>

<style>
</style>
