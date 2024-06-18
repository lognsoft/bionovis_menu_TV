import { IRoutes } from "@renderer/types/IRoutes";
import areasProdutivas from "@renderer/assets/images/icons/icon_areas_produtivas.svg";
import processosProdutivos from "@renderer/assets/images/icons/atomo.svg";
import ImgvideoInstitucional from "@renderer/assets/images/icons/icone_tv.svg";
import apresentacoesDiversas from "@renderer/assets/images/icons/icone_tubo1.svg";


import videoInstitucional from "@renderer/assets/videos/Institucional_PT_Sem_Legenda.mp4";
import videoInstitucionalLegenda from "@renderer/assets/videos/Institucional_PT_Legendado.mp4";
import videoInstitucionalEnglish from "@renderer/assets/videos/Institucional_EN.mp4";

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
                video:videoInstitucional,
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
        routes:[
            {
                pathname:"Com Legenda",
                color: "#005278",
                video:videoInstitucionalLegenda,
            },
            {
                pathname:"Sem Legenda",
                color: "#003851",
                video:videoInstitucional,
            },
        ]
        // video:videoInstitucional
    },
    {
        name: "Apresentações",
        image:apresentacoesDiversas,
        color:"#005277",
        timer:300,
        routes:[
            
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
                        pathname:"Live Cameras",
                        color: "#046282"
                    },
                    {
                        path:"/videos/videos-preparations",
                        pathname:"Camera Recording",
                        color: "#046282"
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
                        pathname:"Live Cameras",
                        color:"#036d91"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Camera Recording",
                        color:"#036d91"
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
                        pathname:"Live Cameras",
                        color: "#06789f"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Camera Recording",
                        color: "#06789f"
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
                        pathname:"Câmeras ao Vivo",
                        color: "#06789f"
                    },
                    {
                        path:"/videos/videos-area-passagem",
                        pathname:"Gravação das Câmeras",
                        color: "#06789f"
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
                        pathname:"Live Cameras",
                        color: "#0e83ad"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Camera Recording",
                        color: "#0e83ad"
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
                        pathname:"Live Cameras",
                        color: "#238eb7"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Camera Recording",
                        color: "#238eb7"
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
                        pathname:"Live Cameras",
                        color: "#4097be"
                    },
                    {
                        path:"/videos/videos-logistica",
                        pathname:"Camera Recording",
                        color: "#4097be"
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
                        pathname:"Câmeras ao Vivo",
                        color: "#4097be"
                    },
                    {
                        path:"/videos/videos-qualidade",
                        pathname:"Gravação das Câmeras",
                        color: "#4097be"
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
                video:videoInstitucionalEnglish,
            },
            {
                pathname:"Inoculum",
                color: "#046282",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-inoculo",
                        pathname:"Live Cameras",
                        color:"#046282"
                    },
                    {
                        path:"/videos/videos-inoculo",
                        pathname:"Camera Recording",
                        color:"#046282"
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
                        pathname:"Live Cameras",
                        color: "#036d91"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Camera Recording",
                        color: "#036d91"
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
                        pathname:"Live Cameras",
                        color: "#06789f"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Camera Recording",
                        color: "#06789f"
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
                        pathname:"Live Cameras",
                        color: "#0e83ad"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Camera Recording",
                        color: "#0e83ad"
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
                        pathname:"Live Cameras",
                        color: "#238eb7"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Camera Recording",
                        color: "#238eb7"
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
                        pathname:"Live Cameras",
                        color: "#4097be"
                    },
                    {
                        path:"/videos/videos-logistica",
                        pathname:"Camera Recording",
                        color: "#4097be"
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
        routes:[
            {
                pathname:"Without Subtitles",
                color: "#595959",
                video:videoInstitucionalEnglish,
            },
        ]
    },
    {
        name: "Presentations",
        image:apresentacoesDiversas,
        color:"#00757d",
        timer:300,
        routes:[
        ]
    }
];


const Routes:RoutesLanguages = {
    default: PortugueseRoutes,
    english: EnglishRoutes,
}


export default Routes;