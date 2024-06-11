import {createRouter, createWebHistory} from "vue-router";
import productList from '@/pages/productList.vue';
import productChart from '@/pages/productChart.vue';

const routes = [
    {
        path: '/',
        component: productList,
        name: 'general',
    },
    {
        path: '/chart',
        component: productChart,
        name: 'chart',
    },
]


const router = createRouter({
    history: createWebHistory('/'),
    routes,
})

export default router;