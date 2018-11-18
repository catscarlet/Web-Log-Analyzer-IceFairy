<template>
<div>
    <el-container class="app1">
        <el-header height="72px">
            <div class="app-header">
                <div class="header-dom">
                    <input type="file" id="file-inputer" name="test" class="file-inputer" @change="loadFile">

                    <el-row class="button-row">
                        <label for="file-inputer">
                            <div class="input-file-button">
                                <span><i class="el-icon-upload"></i> Select a Web Log File</span>
                            </div>
                        </label>

                        <el-button type="primary" size="mini" @click="prepareAnalyze">Start Analyzing</el-button>
                        <!--<el-button type="primary" size="mini" @click="testFile">testFile</el-button>-->
                        <!--<el-button type="primary" size="mini" @click="debug1" :disabled="true">console.log analyzed_data</el-button>-->
                        <el-button type="warning" size="mini" @click="cleanAnalyzedData" :disabled="disable_clean_button">Clean Analyzed Data</el-button>

                        <!--
                        <el-button size="mini" type="primary">primary</el-button>
                        <el-button size="mini" type="success">success</el-button>
                        <el-button size="mini" type="info">info</el-button>
                        <el-button size="mini" type="warning">warning</el-button>
                        <el-button size="mini" type="danger">danger</el-button>
                        -->

                        <!--{{ analyzed_status }}-->
                    </el-row>

                    <div class="npg">
                        <span>Number per Page:</span>
                        <el-input-number size="mini" :min="5" :max="100" v-model="num_per_page"></el-input-number>
                        <el-button :disabled="!num_per_page_changed" type="primary" icon="el-icon-check" size="mini" @click="changeNumberPerPage"></el-button>
                    </div>

                </div>

                <div class="header-alert">
                    <div v-if="analyzed_status == 0">
                        <el-alert title="No Data" type="info" show-icon :closable="false"></el-alert>
                    </div>

                    <div v-else-if="analyzed_status == 1">
                        <el-alert title="Ready to Analyze:" type="warning" show-icon :closable="false"> {{ fileinfo.name }} </el-alert>
                    </div>

                    <div v-else-if="analyzed_status == 2">
                        <el-alert title="Analyzing" type="warning" show-icon :closable="false"></el-alert>
                    </div>

                    <div v-else-if="analyzed_status == 3">
                        <el-alert title="Successfully Analyzed" type="success" show-icon :closable="false"></el-alert>
                    </div>

                    <div v-else-if="analyzed_status == 4">
                        <el-alert title="Storaged Analyzed Data Loaded" type="success" show-icon :closable="false"></el-alert>
                    </div>

                    <div v-else>
                        <el-alert title="Status Failure" type="error" show-icon :closable="false"></el-alert>
                    </div>
                </div>
            </div>
        </el-header>

        <el-container class="downside">
            <el-aside class="asidebar">

                <el-menu class="menu-extra-style" :router="true" background-color="#12476C" text-color="#FAFFFF" active-text-color="#80dbd8">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>Home
                    </el-menu-item>

                    <el-submenu index="1">
                        <template slot="title"><span><i class="el-icon-time"></i>Traffic</span></template>
                        <el-menu-item-group>
                            <el-menu-item index="/ChartDataTraffic" :disabled="disable_menu">
                                - ChartDataTraffic
                            </el-menu-item>
                            <el-menu-item index="/ChartDataTimes" :disabled="disable_menu">
                                - ChartDataTimes
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-location"></i>IP</template>
                        <el-menu-item-group>
                            <el-menu-item index="/TopIPTimes" :disabled="disable_menu">
                                - TopIPTimes
                            </el-menu-item>
                            <el-menu-item index="/TopIPTraffic" :disabled="disable_menu">
                                - TopIPTraffic
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-view"></i>Page</template>
                        <el-menu-item-group>
                            <el-menu-item index="/TopUrlNoParamPageTimes" :disabled="disable_menu">
                                - TopUrlNoParamPageTimes
                            </el-menu-item>
                            <el-menu-item index="/TopUrlWithParamPageTimes" :disabled="disable_menu">
                                - TopUrlWithParamPageTimes
                            </el-menu-item>
                            <el-menu-item index="/TopUrlNoParamPageTraffic" :disabled="disable_menu">
                                - TopUrlNoParamPageTraffic
                            </el-menu-item>
                            <el-menu-item index="/TopUrlWithParamPageTraffic" :disabled="disable_menu">
                                - TopUrlWithParamPageTraffic
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-circle-check"></i>Status</template>
                        <el-menu-item-group>
                            <el-menu-item index="/StatusTimes" :disabled="disable_menu">
                                - StatusTimes
                            </el-menu-item>
                            <el-menu-item index="/StatusTraffic" :disabled="disable_menu">
                                - StatusTraffic
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-document"></i>Referrer</template>
                        <el-menu-item-group>
                            <el-menu-item index="/TopReferrerDomain" :disabled="disable_menu">
                                - TopReferrerDomain
                            </el-menu-item>
                            <el-menu-item index="/TopReferrerUrl" :disabled="disable_menu">
                                - TopReferrerUrl
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-aside>

            <el-main class="content-container">
                <router-view></router-view>
            </el-main>

        </el-container>

    </el-container>
</div>
</template>

<script>
import { WebLogAnalyzer } from  './common/core.js';

export default {
    data() {
        return {
            analyzed_status: 0, //0: no data; 1: ready_to_analyze; 2: analyzing; 3: analyzed; 4: has_data
            disable_menu: true,
            disable_clean_button: true,
            //reader: new FileReader(),
            reader_result: '',
            fileinfo: {
                name: '',
                size: 0,
            },
            num_per_page: 10,
            num_per_page_changed: false,
        };
    },
    mounted() {
        this.checkAnalyzedData();
    },
    beforeMount() {
        this.init();
        //this.getUserInfoTest();
    },
    methods: {
        init() {
            if (!window.localStorage.getItem('num_per_page') || Number.isInteger(window.localStorage.getItem('num_per_page'))) {
                window.localStorage.setItem('num_per_page', 10);
                this.num_per_page = 10;
            } else {
                this.num_per_page = window.localStorage.getItem('num_per_page');
            }
        },
        changeNumberPerPage() {
            window.localStorage.setItem('num_per_page', this.num_per_page);
            //console.log(this.$router.currentRoute.fullPath);
            this.$router.go(0);
        },
        loadFile(e) {
            let file = e.target.files[0];
            let reader = new FileReader();

            /*
            reader.onload = e => {
                this.$emit('load', e.target.result);

                let file = e.target.files[0];
                let reader = this.reader;
                let filecontent = reader.result.split('\n');
                let fileinfo = '文件: ' + file.name + '<br>' +
                                '大小: ' + file.size + '<br>' +
                                '修改: ' + file.lastModifiedDate + '<br>' +
                                '行数: ' + filecontent.length;
                console.log(fileinfo);
            };
            */

            reader.onload = e => {
                //console.log(this);
                //this.$emit('load', e.target.result);
                this.reader_result = reader.result;
                let filecontent = reader.result.split('\n');
                let fileinfo = {
                    name: file.name,
                    size: file.size,
                };
                console.log(fileinfo);
                this.fileinfo = fileinfo;
            };

            reader.readAsText(file);
            this.analyzed_status = 1;
        },
        testFile() {
            //let reader = new FileReader();
            console.log(this.reader_result);
        },
        prepareAnalyze() {
            if (this.reader_result == '') {
                this.$message({
                    message: 'File Not Ready',
                    type: 'error',
                });

                return false;
            }

            this.analyzed_status = 2;

            /*
            let that = this;
            this.$nextTick().then(function() {
                that.startAnalyze();
            });
            */

            //setTimeout(this.startAnalyze(), 1);

            this.startAnalyze();
        },
        startAnalyze() {
            let reader_result = this.reader_result;

            let analyzed_data = WebLogAnalyzer(reader_result);

            if (!analyzed_data) {
                this.$alert('File Not Supported!', 'Error', {
                    confirmButtonText: 'Close',
                    callback: action => {
                        this.checkAnalyzedData();
                    },
                });
                return false;
            }

            let analyzed_data_str = JSON.stringify(analyzed_data);
            console.log('going to save analyzed_data_str');
            console.log(analyzed_data_str);
            window.localStorage.setItem('AnalyzedData', analyzed_data_str);
            console.log('analyzed_data_str has been saved into:window.localStorage AnalyzedData');
            this.analyzed_status = 3;
            this.$router.push({
                path: '/ChartDataTraffic',
            });
        },
        checkAnalyzedData() {
            if (!window.localStorage.getItem('AnalyzedData')) {
                this.analyzed_status = 0;
            }else {
                this.analyzed_status = 4;
            };
        },
        debug1() {
            let analyzed_data = JSON.parse(window.localStorage.getItem('AnalyzedData'));
            console.log(analyzed_data);
        },
        cleanAnalyzedData() {
            if (this.analyzed_status != 0) {
                window.localStorage.removeItem('AnalyzedData');
                /*
                this.reader_result = '';
                this.analyzed_status = 0;
                this.$router.push({
                    path: '/',
                });
                */
                window.location.reload();
            }
        },
        saveToLocalStorage() {
            let analyzed_data = this.returnAnalyzedData();
            let analyzed_data_str = JSON.stringify(analyzed_data);
            window.localStorage.setItem('AnalyzedData', analyzed_data_str);
            //console.log('analyzed_data_str has been saved into:window.localStorage AnalyzedData');
        },
        returnAnalyzedData() {
            let analyzed_data = {};
            return analyzed_data;
        },

    },
    watch: {
        analyzed_status: function(new_val, old_val) {
            if (new_val >= 3) {
                console.log('new_val:' + new_val);
                this.disable_menu = false;
            } else {
                this.disable_menu = true;
            }

            if (new_val >= 1) {
                console.log('new_val:' + new_val);
                this.disable_clean_button = false;
            } else {
                this.disable_clean_button = true;
            }
        },
        num_per_page: function(new_val, old_val) {
            if (new_val != window.localStorage.getItem('num_per_page')) {
                this.num_per_page_changed = true;
            }
        },
    },
};
</script>

<style>
.app1 {
    background-color: #FAFFFF
}

.downside {
    height: calc(100vh - 88px);
}

.asidebar {
    width: 16em;
    height: calc(100vh - 88px);
    background: #eee;
}

.header-dom {
    display: flex;
    justify-content: space-between;
}

.npg {
    font-size: 14px;
}

.menu-extra-style {}

.menu-extra-style li {
    border-top: solid 1px #327093;
}

.menu-extra-style div {
    padding: 0px 0 0px 20px;
}

.content-container {
    background: #eee;
    max-width: calc(100vw - 233px);
    height: calc(100vh - 88px);
}

.file-inputer {
    display: none;
}

.button-row {
    margin-bottom: 3px;
}

.input-file-button {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin-right: 10px;
    transition: .1s;
    font-weight: 500;
    background-color: #12476C;
    color: white;
}

.input-file-button:focus, .input-file-button:hover {
    background: rgb(65, 108, 137);
    border-color: rgb(65, 108, 137);
    color: #fff
}

.input-file-button.is-active, .input-file-button:active {
    background: rgb(16, 64, 97);
    border-color: rgb(16, 64, 97);
    color: #fff
}

.input-file-button:active {
    outline: 0
}
</style>
