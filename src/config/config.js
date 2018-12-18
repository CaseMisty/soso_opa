

export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],

    proxy: {
        '/webapi': {
            target: 'http://opttest.soso-code.com',
            changeOrigin: true,
        },
    },

    routes: [{
        path: '/',
        component: '../layout',
        routes: [
            {
                path: '/',
                component: '/loginController',
            },
            {
                path: '/userlist',
                component: '/user/userListController'
            },
            {
                path: '/userinfo',
                component: '/user/userInfoController'
            },
            {
                path: '/authlist',
                component: '/auth/authListController'
            },
            {
                path: '/authinfo',
                component: '/auth/authInfoController'
            },
            {
                path: '/dashboard',
                routes: [
                    { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
                    { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
                    { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
                ]
            },
        ]
    }],
}