<template>
<div>

    <div class="data-table-div">
        <data-table :import_data="top_referrer_page_traffic_array" :array_description="array_description"></data-table>
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
            top_referrer_page_traffic_array: [],
            array_description: {
                data_name: 'TopReferrerUrlTraffic List',
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
            console.log('TopReferrerUrlTraffic initPage');
            this.top_referrer_page_traffic_array = this.analyzed_data.top_referrer_page_traffic_array;
            console.log(this.analyzed_data.top_referrer_page_traffic_array);
            let tmp = [];
            for (let item of this.analyzed_data.top_referrer_page_traffic_array) {
                if (this.isValidURL(item.id)) {
                    tmp.push({
                        id: `${item.id} <a href="${item.id}" target="_blank" rel="noopener noreferrer"><i class="el-icon-link"></i></a>`,
                        value: item.value,
                    });
                } else {
                    tmp.push({
                        id: item.id,
                        value: item.value,
                    });
                }

            }
            console.log('tmp');
            console.log(tmp);
            this.top_referrer_page_traffic_array = tmp;
        },
        isValidURL(str) {
            var a  = document.createElement('a');
            a.href = str;
            return (a.host && a.host != window.location.host);
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
