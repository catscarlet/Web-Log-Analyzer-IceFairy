<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_withparam_page_traffic_array" :array_description="array_description"></data-table>
    </div>

</div>
</template>

<script>
import DataTable from '../subcomponents/DataTable.vue';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: JSON.parse(window.localStorage.getItem('AnalyzedData')),
            top_withparam_page_traffic_array: [],
            array_description: {
                data_name: 'TopUrlWithParamPageTraffic List',
                id_name: 'Url',
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
            console.log('TopReferrerUrl initPage');
            this.top_withparam_page_traffic_array = this.analyzed_data.top_withparam_page_traffic_array;
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
