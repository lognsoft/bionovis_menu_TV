import { IRoutes } from "@renderer/types/IRoutes";
import areasProdutivas from "@renderer/assets/images/icons/icon_areas_produtivas.svg";
import processosProdutivos from "@renderer/assets/images/icons/atomo.svg";
import ImgvideoInstitucional from "@renderer/assets/images/icons/icone_tv.svg";
import apresentacoesDiversas from "@renderer/assets/images/icons/icone_tubo1.svg";


// import videoInstitucional from "@renderer/assets/videos/institucional.mp4";
// import videoInstitucionalLegenda from "@renderer/assets/videos/institucional.mp4";
// import videoInstitucionalEnglish from "@renderer/assets/videos/institucional-english.mp4";

interface RoutesLanguages{
    default:ReadonlyArray<IRoutes>;
    english:ReadonlyArray<IRoutes>;
};
const PortugueseRoutes:ReadonlyArray<IRoutes> = [
    {
        name: "Áreas Produtivas",
        image:areasProdutivas,
        color:"#00a5db",
        timer:900,
        routes:[
            {
                pathname:"Preparos",
                color: "#008ecd",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-preparations",
                        pathname:"Câmeras ao Vivo",
                        color:"#006c9d"
                    },
                    {
                        path:"/videos/videos-preparations",
                        pathname:"Gravação das Câmeras",
                        color:"#005278"
                    },
                ]
            },
            {
                pathname:"Upstream",
                color: "#006c9d",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-upstreams",
                        pathname:"Câmeras ao Vivo",
                        color:"#005278"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Gravação das Câmeras",
                        color:"#003851"
                    },
                ]
            },
            {
                pathname:"Downstream",
                color: "#005278",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-downstreams",
                        pathname:"Câmeras ao Vivo",
                        color:"#003851"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Gravação das Câmeras",
                        color:"#5f6d16"
                    },
                ]
            },
            {
                pathname:"Área de Passagem",
                color: "#003851",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-area-passagem",
                        pathname:"Câmeras ao Vivo",
                        color:"#5f6d16"
                    },
                    {
                        path:"/videos/videos-area-passagem",
                        pathname:"Gravação das Câmeras",
                        color:"#a3b73a"
                    },
                ]
            },
            {
                pathname:"Fill and Finish",
                // subText:"(Formulação e Envase)",
                color: "#5f6d16",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-fill-and-finish",
                        pathname:"Câmeras ao Vivo",
                        color:"#a3b73a"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Gravação das Câmeras",
                        color:"#bbd62f"
                    },
                ]
            },
            {
                pathname:"Embalagem Secundária",
                color: "#a3b73a",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Câmeras ao Vivo",
                        color:"#bbd62f"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Gravação das Câmeras",
                        color:"#95d4db"
                    },
                ]
            },
        {
            pathname:"Armazém Logística",
            color: "#bbd62f",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-logistica",
                    pathname:"Câmeras ao Vivo",
                    color:"#95d4db"
                },
                {
                    path:"/videos/videos-logistica",
                    pathname:"Gravação das Câmeras",
                    color:"#79adab"
                },
            ]
        },
        {
            pathname:"Qualidade",
            color: "#95d4db",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-qualidade",
                    pathname:"Câmeras ao Vivo",
                    color:"#79adab"
                },
                {
                    path:"/videos/videos-qualidade",
                    pathname:"Gravação das Câmeras",
                    color:"#27747c"
                },
            ]
        }]
    },
    {
        name: "Processo Produtivo",
        image:processosProdutivos,
        color:"#008dcf",
        timer:300,
        routes:[
            {
                pathname:"Vídeo Completo",
                color: "#006c9d",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucional,
            },
            {
            pathname:"Inóculo",
            color: "#005278",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-inoculo",
                    pathname:"Câmeras ao Vivo",
                    color:"#003851"
                },
                {
                    path:"/videos/videos-inoculo",
                    pathname:"Gravação das Câmeras",
                    color:"#5f6d16"
                },
            ]
        },
        {
            pathname:"Upstream",
            color: "#003851",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-upstreams",
                    pathname:"Câmeras ao Vivo",
                    color:"#5f6d16"
                },
                {
                    path:"/videos/videos-upstreams",
                    pathname:"Gravação das Câmeras",
                    color:"#a3b73a"
                },
            ]
        },
        {
            pathname:"Downstream",
            color: "#5f6d16",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-downstreams",
                    pathname:"Câmeras ao Vivo",
                    color:"#a3b73a"
                },
                {
                    path:"/videos/videos-downstreams",
                    pathname:"Gravação das Câmeras",
                    color:"#bbd627"
                },
            ]
        },
        {
            pathname:"Fill and Finish",
            subText:"(Formulação e Envase)",
            color: "#a3b73a",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-fill-and-finish",
                    pathname:"Câmeras ao Vivo",
                    color:"#bbd627"
                },
                {
                    path:"/videos/videos-fill-and-finish",
                    pathname:"Gravação das Câmeras",
                    color:"#79adab"
                },
            ]
        },
        {
            pathname:"Embalagem Secundária",
            color: "#bbd627",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-embalagem-secundaria",
                    pathname:"Câmeras ao Vivo",
                    color:"#79adab"
                },
                {
                    path:"/videos/videos-embalagem-secundaria",
                    pathname:"Gravação das Câmeras",
                    color:"#27747c"
                },
            ]
        },
        {
            pathname:"Logística",
            color: "#79adab",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-logistica",
                    pathname:"Câmeras ao Vivo",
                    color:"#27747c"
                },
                {
                    path:"/videos/videos-logistica",
                    pathname:"Gravação das Câmeras",
                    color:"#1d4e53"
                },
            ]
        }]
    },
    {
        name: "Vídeo Institucional",
        image:ImgvideoInstitucional,
        color:"#006c9d",
        timer:300,
        video:"https://player.vimeo.com/video/958364640?h=66f387e677"
    },
    {
        name: "Apresentações",
        image:apresentacoesDiversas,
        color:"#005277",
        timer:300,
        routes:[
            {
                pathname:"Com Legenda",
                color: "#005278",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucionalLegenda,
            },
            {
                pathname:"Sem Legenda",
                color: "#003851",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucional,
            },
        ]
    }
];
const EnglishRoutes:ReadonlyArray<IRoutes> = [
    {
        name: "Productive Areas",
        image:areasProdutivas,
        color:"#0681ab",
        timer:900,
        routes:[
            {
                pathname:"Preparations",
                color: "#046282",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-preparations",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-preparations",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Upstream",
                color: "#036d91",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-upstreams",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Downstream",
                color: "#06789f",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-downstreams",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Passage Area",
                color: "#06789f",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-area-passagem",
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-area-passagem",
                        pathname:"Gravação das Câmeras"
                    },
                ]
            },
            {
                pathname:"Fill and Finish",
                // subText:"(Formulação e Envase)",
                color: "#0e83ad",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-fill-and-finish",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Secondary packaging",
                color: "#238eb7",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Logistics Warehouse",
                color: "#4097be",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-logistica",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-logistica",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Quality",
                color: "#4097be",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-qualidade",
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-qualidade",
                        pathname:"Gravação das Câmeras"
                    },
                ]
            }
        ]
    },
    {
        name: "Productive Process",
        image:processosProdutivos,
        color:"#00a7de",
        timer:300,
        routes:[
            {
                pathname:"Complete Video",
                color: "#046282",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucional,
                // subRoutes:[
                //     {
                //         path:"/cams/streams-inoculo",
                //         pathname:"Live Cameras"
                //     },
                //     {
                //         path:"/videos/videos-inoculo",
                //         pathname:"Camera Recording"
                //     },
                // ]
            },
            {
                pathname:"Inoculum",
                color: "#046282",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-inoculo",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-inoculo",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Upstream",
                color: "#036d91",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-upstreams",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Downstream",
                color: "#06789f",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-downstreams",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"Fill and Finish",
                subText:"(Formulação e Envase)",
                color: "#0e83ad",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-fill-and-finish",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"secondary packaging",
                color: "#238eb7",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Camera Recording"
                    },
                ]
            },
            {
                pathname:"logistics",
                color: "#4097be",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-logistica",
                        pathname:"Live Cameras"
                    },
                    {
                        path:"/videos/videos-logistica",
                        pathname:"Camera Recording"
                    },
                ]
            }
        ]
    },
    {
        name: "Institutional Video",
        image:ImgvideoInstitucional,
        color:"#595959",
        timer:300,
        video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucionalEnglish,
        // routes:[{
        //     pathname:"Files",
        //     color: "#008a94",
        //     video:"",
        //     subRoutes:[
        //         {
        //             path:"/arquivos/loremIpsum",
        //             pathname:"Documents"
        //         },
        //         // {
        //         //     path:"/videos/videos-arquivos",
        //         //     pathname:"Gravação das Câmeras"
        //         // },
        //     ]
        // }]
    },
    {
        name: "Presentations",
        image:apresentacoesDiversas,
        color:"#00757d",
        timer:300,
        routes:[
            {
                pathname:"With Subtitles",
                color: "#008a94",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucionalEnglish,
                // subRoutes:[
                    // {
                    //     path:"/arquivos/loremIpsum2",
                    //     pathname:"Documentos"
                    // },
                //     // {
                //     //     path:"/videos/videos-arquivos",
                //     //     pathname:"Gravação das Câmeras"
                //     // },
                // ]
            },
            {
                pathname:"Without Subtitles",
                color: "#008a94",
                video:"https://player.vimeo.com/video/958364640?h=66f387e677"//videoInstitucionalEnglish,
                // subRoutes:[
                //     {
                //         path:"/arquivos/loremIpsum2",
                //         pathname:"Documentos"
                //     },
                //     // {
                //     //     path:"/videos/videos-arquivos",
                //     //     pathname:"Gravação das Câmeras"
                //     // },
                // ]
            },
        ]
    }
];


const Routes:RoutesLanguages = {
    default: PortugueseRoutes,
    english: EnglishRoutes,
}


export default Routes;