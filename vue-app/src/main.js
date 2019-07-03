import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './elementstyle/button.css';
import './elementstyle/alert.css';
Vue.use(VueRouter);
Vue.use(ElementUI);

import Root from './Root.vue';
import App from './App.vue';
import Welcome from './components/Welcome.vue';
import TopIPTimes from './components/TopIPTimes.vue';
import TopIPTraffic from './components/TopIPTraffic.vue';
import TopUrlNoParamPageTimes from './components/TopUrlNoParamPageTimes.vue';
import TopUrlWithParamPageTimes from './components/TopUrlWithParamPageTimes.vue';
import TopUrlNoParamPageTraffic from './components/TopUrlNoParamPageTraffic.vue';
import TopUrlWithParamPageTraffic from './components/TopUrlWithParamPageTraffic.vue';

import StatusTimes from './components/StatusTimes.vue';
import StatusTraffic from './components/StatusTraffic.vue';
import TopReferrerDomainTimes from './components/TopReferrerDomainTimes.vue';
import TopReferrerUrlTimes from './components/TopReferrerUrlTimes.vue';
import TopReferrerDomainTraffice from './components/TopReferrerDomainTraffice.vue';
import TopReferrerUrlTraffic from './components/TopReferrerUrlTraffic.vue';

import ChartDataTraffic from './components/ChartDataTraffic.vue';
import ChartDataTimes from './components/ChartDataTimes.vue';

const router = new VueRouter({
    routes: [{
        path: '/', component: App, children: [
            {path: '', name: 'root', component: Welcome},
            {path: '/ChartDataTraffic', name: 'ChartDataTraffic', component: ChartDataTraffic},
            {path: '/ChartDataTimes', name: 'ChartDataTimes', component: ChartDataTimes},
            {path: '/TopIPTimes', name: 'TopIPTimes', component: TopIPTimes},
            {path: '/TopIPTraffic', name: 'TopIPTraffic', component: TopIPTraffic},
            {path: '/TopUrlNoParamPageTimes', name: 'TopUrlNoParamPageTimes', component: TopUrlNoParamPageTimes},
            {path: '/TopUrlNoParamPageTraffic', name: 'TopUrlNoParamPageTraffic', component: TopUrlNoParamPageTraffic},
            {path: '/TopUrlWithParamPageTimes', name: 'TopUrlWithParamPageTimes', component: TopUrlWithParamPageTimes},
            {path: '/TopUrlWithParamPageTraffic', name: 'TopUrlWithParamPageTraffic', component: TopUrlWithParamPageTraffic},
            {path: '/StatusTimes', name: 'StatusTimes', component: StatusTimes},
            {path: '/StatusTraffic', name: 'StatusTraffic', component: StatusTraffic},
            {path: '/TopReferrerDomainTimes', name: 'TopReferrerDomainTimes', component: TopReferrerDomainTimes},
            {path: '/TopReferrerUrlTimes', name: 'TopReferrerUrlTimes', component: TopReferrerUrlTimes},
            {path: '/TopReferrerDomainTraffice', name: 'TopReferrerDomainTraffice', component: TopReferrerDomainTraffice},
            {path: '/TopReferrerUrlTraffic', name: 'TopReferrerUrlTraffic', component: TopReferrerUrlTraffic},
            {path: '/Welcome', name: 'Welcome', component: Welcome},
        ],},
    ],
});

router.beforeEach((to, from, next) => {
    if (to.path != '/') {
        if (!window.localStorage.getItem('AnalyzedDataStorage')) {
            Vue.prototype.$message({
                message: 'No Analyzed Data',
                type: 'warning',
            });
            router.replace({
                path: '/',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

const root = new Vue({
    router,
    render: h => h(Root),
}).$mount('#app');
