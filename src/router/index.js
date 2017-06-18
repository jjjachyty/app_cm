import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from 'components/Hello';
import Login from 'components/Login';
import Main from 'components/Main';
import MyCust from 'components/MyCust';
import MyList from 'components/MyList';
import Home from 'components/Home';
import Seting from 'components/Seting';


import CustBrief from 'components/cust/CustBrief';
import CustPricList from 'components/cust/CustPricList';
import LnPricSht from 'components/lnpric/LnPricSht';


import LnPricing from 'components/lnpric/LnPricing';
import LnPricingBase from 'components/lnpric/LnPricingBase';
import LnPricingMort from 'components/lnpric/LnPricingMort';
import LnPricingRst from 'components/lnpric/LnPricingRst';
import LnPricingScene from 'components/lnpric/LnPricingScene';


import LnPricingSim from 'components/lnpric/LnPricingSim';
import DpPricingSim from 'components/dppric/DpPricingSim';

Vue.use(VueRouter);

const routes = [{
        path: '/',
        component: Main,
        children: [
            { path: '/', name: 'home', component: Home },

            { path: '/custs', name: 'custs', component: MyCust },



            { path: '/list', name: 'list', component: CustPricList },

            { path: '/seting', name: 'seting', component: Seting },

        ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/cust/brief/:custCode', name: 'custbrief', component: CustBrief },
    { path: '/cust/priclist/:custCode', name: 'custpriclist', component: CustPricList },
    { path: '/cust/lnpricdetail/:businessCode', name: 'lnpricdetail', component: LnPricSht },

    // {
    //     path: '/lnpricinfo',
    //     // name: 'lnpricinfo',
    //     component: LnPricing,
    //     children: [
    { path: '/lnpricinfo/custcode/:custCode', name: 'lnpricinfo', component: LnPricingBase },
    { path: '/editlnpricinfo/custcode/:custCode/businesscode/:businessCode', name: 'editlnpricinfo', component: LnPricingBase },
    { path: '/lnpricmort/custcode/:custCode/businesscode/:businessCode', name: 'lnpricmort', component: LnPricingMort },
    { path: '/lnpricrst/custcode/:custCode/businesscode/:businessCode', name: 'lnpricrst', component: LnPricingRst },
    { path: '/lnpricsene/custcode/:custCode/businesscode/:businessCode', name: 'lnpricingscene', component: LnPricingScene },

    //     ]
    // }, 
    { path: '/lnpricsim', name: 'lnpricsim', component: LnPricingSim }, { path: '/dppricsim', name: 'dppricsim', component: DpPricingSim }

];



const router = new VueRouter({
    mode: 'history', //这样url就没有/#/XXX,而是常见的url形式
    routes: routes, // short for routes: routes
    linkActiveClass: 'active', //router-link的选中状态的class，也有一个默认的值
    history: true
});




export default router