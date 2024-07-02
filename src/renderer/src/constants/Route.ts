import type { IRoutes } from "@renderer/types/IRoutes";
import type ILanguage from "@renderer/types/ILanguage";
import areasProdutivas from "@renderer/assets/images/icons/icon_areas_produtivas.svg";
import processosProdutivos from "@renderer/assets/images/icons/atomo.svg";
import ImgvideoInstitucional from "@renderer/assets/images/icons/icone_tv.svg";
import apresentacoesDiversas from "@renderer/assets/images/icons/icone_tubo1.svg";

const PortugueseRoutes:ReadonlyArray<IRoutes> = [
    {
        name: "Áreas Produtivas",
        image:areasProdutivas,
        color:"#00a5db",
        timer:900,
        video:"",
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
                        path:"/videos/videos-Preparos",
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
                        path:"/videos/videos-Upstream",
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
                        path:"/videos/videos-Downstream",
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
                        path:"/videos/videos-Área_de_Passagem",
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
                        path:"/videos/videos-Fill_and_Finish",
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
                        path:"/videos/videos-Embalagem_Secundária",
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
                    path:"/videos/videos-Armazém_Logística",
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
                    path:"/videos/videos-Qualidade",
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
        video:"",
        routes:[
            {
                pathname:"Vídeo Completo",
                color: "#006c9d",
                video:"nameVideo",
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
        video:"",
        color:"#006c9d",
        timer:300,
        routes:[
            {
                pathname:"Com Legenda",
                color: "#005278",
                video:"institucional_legendado.mp4",
            },
            {
                pathname:"Sem Legenda",
                color: "#003851",
                video:"institucional.mp4",
            },
        ]
        // video:videoInstitucional
    },
    {
        name: "Apresentações",
        image:apresentacoesDiversas,
        color:"#005277",
        timer:300,
        video:"",
        routes:[
            
        ]
    }
];


const EnglishRoutes:ReadonlyArray<IRoutes> = [
    {
        name: "Productive Areas",
        image:areasProdutivas,
        color:"#00a5db",
        timer:900,
        video:"",
        routes:[
            {
                pathname:"Preparations",
                color: "#008ecd",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-preparations",
                        pathname:"Live Cameras",
                        color: "#006c9d"
                    },
                    {
                        path:"/videos/videos-Preparations",
                        pathname:"Camera Recording",
                        color: "#005278"
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
                        pathname:"Live Cameras",
                        color:"#005278"
                    },
                    {
                        path:"/videos/videos-Upstream",
                        pathname:"Camera Recording",
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
                        pathname:"Live Cameras",
                        color: "#003851"
                    },
                    {
                        path:"/videos/videos-Downstream",
                        pathname:"Camera Recording",
                        color: "#5f6d16"
                    },
                ]
            },
            {
                pathname:"Passage Area",
                color: "#003851",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-area-passagem",
                        pathname:"Câmeras ao Vivo",
                        color: "#5f6d16"
                    },
                    {
                        path:"/videos/videos-Passage_Area",
                        pathname:"Gravação das Câmeras",
                        color: "#a3b73a"
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
                        pathname:"Live Cameras",
                        color: "#a3b73a"
                    },
                    {
                        path:"/videos/videos-Fill_and_Finish",
                        pathname:"Camera Recording",
                        color: "#bbd62f"
                    },
                ]
            },
            {
                pathname:"Secondary packaging",
                color: "#a3b73a",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Live Cameras",
                        color: "#bbd62f"
                    },
                    {
                        path:"/videos/videos-Secondary_Packaging",
                        pathname:"Camera Recording",
                        color: "#95d4db"
                    },
                ]
            },
            {
                pathname:"Logistics Warehouse",
                color: "#bbd62f",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-logistica",
                        pathname:"Live Cameras",
                        color: "#95d4db"
                    },
                    {
                        path:"/videos/videos-Logistics_Warehouse",
                        pathname:"Camera Recording",
                        color: "#79adab"
                    },
                ]
            },
            {
                pathname:"Quality",
                color: "#95d4db",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-qualidade",
                        pathname:"Câmeras ao Vivo",
                        color: "#79adab"
                    },
                    {
                        path:"/videos/videos-Quality",
                        pathname:"Gravação das Câmeras",
                        color: "#27747c"
                    },
                ]
            }
        ]
    },
    {
        name: "Productive Process",
        image:processosProdutivos,
        color:"#008dcf",
        timer:300,
        video:"",
        routes:[
            {
                pathname:"Complete Video",
                color: "#006c9d",
                video:"institutional.mp4",
            },
            {
                pathname:"Inoculum",
                color: "#005278",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-inoculo",
                        pathname:"Live Cameras",
                        color:"#003851"
                    },
                    {
                        path:"/videos/videos-inoculo",
                        pathname:"Camera Recording",
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
                        pathname:"Live Cameras",
                        color: "#5f6d16"
                    },
                    {
                        path:"/videos/videos-upstreams",
                        pathname:"Camera Recording",
                        color: "#a3b73a"
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
                        pathname:"Live Cameras",
                        color:"#a3b73a"
                    },
                    {
                        path:"/videos/videos-downstreams",
                        pathname:"Camera Recording",
                        color:"#bbd627"
                    },
                ]
            },
            {
                pathname:"Fill and Finish",
                subText:"(Formulation and Filling)",
                color: "#a3b73a",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-fill-and-finish",
                        pathname:"Live Cameras",
                        color:"#bbd627"
                    },
                    {
                        path:"/videos/videos-fill-and-finish",
                        pathname:"Camera Recording",
                        color:"#79adab"
                    },
                ]
            },
            {
                pathname:"Secondary Packaging",
                color: "#bbd627",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-embalagem-secundaria",
                        pathname:"Live Cameras",
                        color:"#79adab"
                    },
                    {
                        path:"/videos/videos-embalagem-secundaria",
                        pathname:"Camera Recording",
                        color:"#27747c"
                    },
                ]
            },
            {
                pathname:"Logistics",
                color: "#79adab",
                video:"",
                subRoutes:[
                    {
                        path:"/cams/streams-logistica",
                        pathname:"Live Cameras",
                        color: "#27747c"
                    },
                    {
                        path:"/videos/videos-logistica",
                        pathname:"Camera Recording",
                        color: "#1d4e53"
                    },
                ]
            }
        ]
    },
    {
        name: "Institutional Video",
        image:ImgvideoInstitucional,
        color:"#006c9d",
        timer:300,
        video:"",
        routes:[
            {
                pathname:"Without Subtitles",
                color: "#005278",
                video:"institutional.mp4",
            },
        ]
    },
    {
        name: "Presentations",
        image:apresentacoesDiversas,
        color:"#005277",
        timer:300,
        video:"",
        routes:[
        ]
    }
];


const Routes:ILanguage<ReadonlyArray<IRoutes>> = {
    default: PortugueseRoutes,
    english: EnglishRoutes,
}


export default Routes;