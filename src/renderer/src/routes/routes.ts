import { createRouter, createWebHashHistory } from "vue-router";

const route = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:"/",
            component: () => import("@renderer/page/Start.vue"),
        },
        {
            path:"/menu",
            component: () => import("@renderer/page/Controls.vue"),
            children:[
                {
                    name:'home',
                    path:"",
                    component: () => import("@renderer/page/controls/Home.vue")
                },
                {
                    path:"/cams/:nameMenu",
                    name:'cams',
                    component: () => import("@renderer/page/controls/Cams.vue"),
                    props:true
                },
                {
                    path:"/videos/:nameVideos",
                    name:"videos",
                    component: () => import("@renderer/page/controls/Videos.vue"),
                    props:true
                },
                {
                    path:"/files/:files",
                    name:"files",
                    component:() => import("@renderer/page/controls/Files.vue"),
                    props: true
                }
            ]
        },
        {
            path:"/streamers",
            component: () => import("@renderer/page/Streamer.vue"),
            children:[
                {
                    name:'stream',
                    path:"/stream/:port",
                    component: () => import("@renderer/page/Stream.vue"),
                    props:true
                },
                {
                    name:'video',
                    path:"/video/:videoName",
                    component: () => import("@renderer/page/Video.vue"),
                    props:true
                }
            ]
        }
        
    ]
});

export default route;