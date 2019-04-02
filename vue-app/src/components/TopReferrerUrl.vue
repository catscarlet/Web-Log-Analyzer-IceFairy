<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_referrer_page_times_array" :array_description="array_description"></data-table>
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
            top_referrer_page_times_array: [],
            array_description: {
                data_name: 'TopReferrerUrl List',
                id_name: 'Url',
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
            console.log('TopReferrerUrl initPage');
            this.top_referrer_page_times_array = this.analyzed_data.top_referrer_page_times_array;
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
