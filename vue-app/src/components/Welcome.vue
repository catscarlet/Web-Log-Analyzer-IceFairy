<template>
<div>
    <div>
        <el-card>
            <div slot="header">
                <span style="flex:1">Welcome to use Web Log Analyzer - v{{ version }}</span>
            </div>

            <p>To start, select a web log file, and press the <strong>Start Analyzing</strong> button.</p>
            <p>For more information, please refer to: <a href="https://github.com/catscarlet/Web-Log-Analyzer-IceFairy" target="_blank">https://github.com/catscarlet/Web-Log-Analyzer-IceFairy</a></p>

        </el-card>
    </div>
</div>
</template>

<script>
import config from '../../package.json';
const VERSION = config.version;

export default {
    props: [
    ],
    data() {
        return {
            version: VERSION,
        };
    },
    methods: {
        whoami() {
        },
    },
    beforeMount() {
    },
    mounted() {
    },
    watch: {
    },
};
</script>

<style>
</style>
