<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_referrer_domain_times_array" :array_description="array_description"></data-table>
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
            top_referrer_domain_times_array: [],
            array_description: {
                data_name: 'TopReferrerDomainTimes List',
                id_name: 'Domain',
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
            console.log('TopReferrerDomainTimes initPage');
            this.top_referrer_domain_times_array = this.analyzed_data.top_referrer_domain_times_array;
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
