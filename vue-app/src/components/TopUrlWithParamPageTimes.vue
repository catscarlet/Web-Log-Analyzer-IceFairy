<template>
<div>

    <div class="panel-header">
        <span>TopUrlWithParamPageTimes List</span>

        <span class="page-span">{{ page }} / {{ number_of_pages }}</span>

        <div class="">
            <el-input placeholder="Exclude" v-model="filter_input" class="filter-input" size="small" :clearable="true" @keyup.enter.native="filterConfirmButton">

            </el-input>
            <el-button type="primary" size="small" icon="el-icon-check" @click="filterConfirmButton" :disabled="filter_confirmed"></el-button>
        </div>

        <div class="page-button">
            <!--
            <el-button type="primary" size="mini" @click="test">test</el-button>
            -->

            <el-button-group>
                <el-button type="primary" size="small" icon="el-icon-d-arrow-left" @click="goToFirstPage" :disabled="is_first_page">First</el-button>
                <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="goToPrevPage" :disabled="is_first_page">Prev</el-button>
                <el-button type="primary" size="small" @click="goToNextPage" :disabled="is_last_page">Next<i class="el-icon-arrow-right el-icon-right"></i></el-button>
                <el-button type="primary" size="small" @click="goToLastPage" :disabled="is_last_page">Last<i class="el-icon-d-arrow-right"></i></el-button>
            </el-button-group>

        </div>
    </div>

    <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="id">
        </el-table-column>

        <el-table-column label="IP">
            <template slot-scope="scope">
                {{ scope.row.id }}
            </template>
        </el-table-column>

        <el-table-column label="Times">
            <template slot-scope="scope">
                {{ scope.row.value }}
            </template>
        </el-table-column>
    </el-table>


</div>
</template>

<script>
import {loadNumberPerPage} from '../common/';
import {excludeByIdFilter} from '../common/';

export default {
    props: [
    ],
    data() {
        return {
            analyzed_data: JSON.parse(window.localStorage.getItem('AnalyzedData')),
            items: [],
            list: [],
            page: 1,
            num_per_page: 10,
            number_of_pages: 1,
            is_first_page: true,
            is_last_page: true,
            filter_input: '',
            filter_input_confirmed: '',
            filter_confirmed: true,
        };
    },
    methods: {
        initPage() {
            this.num_per_page = loadNumberPerPage();
            this.items = this.analyzed_data.top_withparam_page_times_array,
            this.getNumberOfPages();
            this.showList();
        },
        getNumberOfPages() {
            this.number_of_pages = Math.ceil(this.items.length / this.num_per_page);
        },
        goToFirstPage() {
            this.page = 1;
        },
        goToLastPage() {
            this.page = this.number_of_pages;
        },
        goToNextPage() {
            if (this.page + 1 <= this.number_of_pages) {
                this.page++;
            }
        },
        goToPrevPage() {
            if (this.page - 1 >= 1) {
                this.page--;
            }
        },
        showList() {
            let begin = (this.page  - 1) * this.num_per_page;
            let end = this.page * this.num_per_page;
            this.list = this.items.slice(begin, end);
            this.changeButtonStatus();
        },
        changeButtonStatus() {
            if (this.page == 1) {
                this.is_first_page = true;
            } else {
                this.is_first_page = false;
            }
            if (this.page == this.number_of_pages) {
                this.is_last_page = true;
            } else {
                this.is_last_page = false;
            }
        },
        filterConfirmButton() {
            let result;
            if (this.filter_input != '') {
                result = this.analyzed_data.top_withparam_page_times_array.filter(this.excludeFilter);
            } else {
                result = this.analyzed_data.top_withparam_page_times_array;
            }

            this.items = result;

            this.filter_input_confirmed = this.filter_input;
            this.filter_confirmed = true;

            if (this.page == 1) {
                this.showList();
            } else {
                this.page = 1;
            }
        },
        excludeFilter(item) {
            let exclude = this.filter_input;
            return excludeByIdFilter(item, exclude);
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
        filter_input: function(val, oldVal) {
            if (val != this.filter_input_confirmed) {
                this.filter_confirmed = false;
            } else {
                this.filter_confirmed = true;
            };
        },
    },
};
</script>

<style>
.panel-header {
    display: flex;
    justify-content: space-between;
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

.filter-input {
    max-width: 200px;
}
</style>
