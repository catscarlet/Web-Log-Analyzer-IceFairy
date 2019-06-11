<template>
<div>

    <div class="panel-header">
        <span>StatusTraffic List</span>

        <div class="page-button">
            <!--
            <el-button type="primary" size="mini" @click="test">test</el-button>
            -->
            <el-button-group>
            </el-button-group>

        </div>
    </div>

    <el-table :data="list" style="width: 100%">

        <el-table-column label="Status">
            <template slot-scope="scope">
                {{ scope.row.id }}
            </template>
        </el-table-column>
        <el-table-column label="Bytes">
            <template slot-scope="scope">
                {{ scope.row.value }}
            </template>
        </el-table-column>
    </el-table>


</div>
</template>

<script>
import {toThousands} from '../common/';
import {GlobalGetAnalyzedData} from '../common/';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: GlobalGetAnalyzedData(),
            items: [],
            list: [],
            page: 1,
            num_per_page: 10,
            number_of_pages: 1,
            is_first_page: true,
            is_last_page: true,
        };
    },
    methods: {
        initPage() {
            this.items = this.analyzed_data.status_traffic,

            this.showList();
        },
        showList() {
            let items = this.items;
            let list = [];
            for (let variable in items) {
                list.push({
                    id: variable,
                    value: toThousands(items[variable]),
                });
            }
            this.list = list;
        },
        test() {
            console.log(this.items);
            console.log(this.list);
            console.log('page: ' + this.page);
            console.log('num_per_page: ' + this.num_per_page);
            console.log('number_of_pages: ' + this.number_of_pages);
        },
    },
    beforeMount() {
        //this.loadData();
    },
    mounted() {
        this.initPage();
    },
    watch: {
        page: function(val, oldVal) {
            this.showList();
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
</style>
