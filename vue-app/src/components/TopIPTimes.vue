<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_ip_times_array" :array_description="array_description"></data-table>
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
            top_ip_times_array: [],
            array_description: {
                data_name: 'TopIPTimes List',
                id_name: 'IP',
                unit_name: 'Times',
            },
            import_data: [],
        };
    },
    components: {
        DataTable,
    },
    methods: {
        initPage() {
            console.log('TopIPTimes initPage');
            this.top_ip_times_array = this.analyzed_data.top_ip_times_array;
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
