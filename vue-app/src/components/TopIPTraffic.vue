<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_ip_traffic_array" :array_description="array_description"></data-table>
    </div>

</div>
</template>

<script>
import {GlobalGetAnalyzedData} from '../common/';
import DataTable from '../subcomponents/DataTable.vue';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: GlobalGetAnalyzedData(),
            top_ip_traffic_array: [],
            array_description: {
                data_name: 'TopIPTraffic List',
                id_name: 'IP',
                unit_name: 'Bytes',
            },
            import_data: [],
        };
    },
    components: {
        DataTable,
    },
    methods: {
        initPage() {
            console.log('TopIPTraffic initPage');
            this.top_ip_traffic_array = this.analyzed_data.top_ip_traffic_array;
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
.data-table-div {
}
</style>
