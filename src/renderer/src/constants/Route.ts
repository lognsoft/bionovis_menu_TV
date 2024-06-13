import { IRoutes } from "@renderer/types/IRoutes";
import areasProdutivas from "@renderer/assets/images/icons/icon_areas_produtivas.svg";
import processosProdutivos from "@renderer/assets/images/icons/atomo.svg";
import ImgvideoInstitucional from "@renderer/assets/images/icons/icone_tv.svg";
import apresentacoesDiversas from "@renderer/assets/images/icons/icone_tubo1.svg";


import videoInstitucional from "@renderer/assets/videos/institucional.mp4";
import videoInstitucionalLegenda from "@renderer/assets/videos/institucional.mp4";
import videoInstitucionalEnglish from "@renderer/assets/videos/institucional-english.mp4";

interface RoutesLanguages{
    default:ReadonlyArray<IRoutes>;
    english:ReadonlyArray<IRoutes>;
};
const PortugueseRoutes:ReadonlyArray<IRoutes> = [
    {
        name: "Áreas Produtivas",
        image:areasProdutivas,
        color:"#0681ab",
        timer:900,
        routes:[
            {
                pathname:"Preparos",
                color: "#046282",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-preparations",
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-preparations",
                        pathname:"Gravação das Câmeras"
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
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Gravação das Câmeras"
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
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Gravação das Câmeras"
                    },
                ]
            },
            {
                pathname:"Área de Passagem",
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
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Gravação das Câmeras"
                    },
                ]
            },
            {
                pathname:"Embalagem Secundária",
                color: "#238eb7",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Câmeras ao Vivo"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Gravação das Câmeras"
                    },
                ]
            },
        {
            pathname:"Armazém Logística",
            color: "#4097be",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-logistica",
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-logistica",
                    pathname:"Gravação das Câmeras"
                },
            ]
        },
        {
            pathname:"Qualidade",
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
        }]
    },
    {
        name: "Processo Produtivo",
        image:processosProdutivos,
        color:"#00a7de",
        timer:300,
        routes:[
            {
                pathname:"Vídeo Completo",
                color: "#046282",
                video:videoInstitucional,
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
            pathname:"Inóculo",
            color: "#046282",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-inoculo",
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-inoculo",
                    pathname:"Gravação das Câmeras"
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
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-upstreams",
                    pathname:"Gravação das Câmeras"
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
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-downstreams",
                    pathname:"Gravação das Câmeras"
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
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-fill-and-finish",
                    pathname:"Gravação das Câmeras"
                },
            ]
        },
        {
            pathname:"Embalagem Secundária",
            color: "#238eb7",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-embalagem-secundaria",
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-embalagem-secundaria",
                    pathname:"Gravação das Câmeras"
                },
            ]
        },
        {
            pathname:"Logística",
            color: "#4097be",
            video:"",
            subRoutes:[
                {
                    path:"/cams/streams-logistica",
                    pathname:"Câmeras ao Vivo"
                },
                {
                    path:"/videos/videos-logistica",
                    pathname:"Gravação das Câmeras"
                },
            ]
        }]
    },
    {
        name: "Vídeo Institucional",
        image:ImgvideoInstitucional,
        color:"#595959",
        timer:300,
        video:videoInstitucional
        // routes:[{
        //     pathname:"Arquivos",
        //     color: "#008a94",
        //     video:"",
        //     subRoutes:[
        //         {
        //             path:"/arquivos/loremIpsum",
        //             pathname:"Documentos"
        //         },
        //         // {
        //         //     path:"/videos/videos-arquivos",
        //         //     pathname:"Gravação das Câmeras"
        //         // },
        //     ]
        // }]
    },
    {
        name: "Apresentações",
        image:apresentacoesDiversas,
        color:"#00757d",
        timer:300,
        routes:[
            {
                pathname:"Com Legenda",
                color: "#008a94",
                video:videoInstitucionalLegenda,
                // subRoutes:[
                    // {
                    //     path:"/arquivos/loremIpsum2",
                    //     pathname:"Documentos"
                    // },
                    // {
                    //     path:"/videos/videos-arquivos",
                    //     pathname:"Gravação das Câmeras"
                    // },
                // ]
            },
            {
                pathname:"Sem Legenda",
                color: "#008a94",
                video:videoInstitucional,
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
                video:videoInstitucional,
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
        video:videoInstitucionalEnglish,
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
                video:videoInstitucionalEnglish,
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
                video:videoInstitucionalEnglish,
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