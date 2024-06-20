"use client"
import { useEffect, useState } from "react"
import Media from "../Media"
import { IImage, IVideo } from "../Media/utils"
import { display } from "../utils"



export type IImages = {
    backdrop: IImage[],
    poster: IImage[],
    logos: IImage[],
    [key: string]: IImage[]
}

type IVideosObj = {
    videos?: IVideo[]
}

type CardProps = { 
    videos?: IVideo[], 
    imagesData?: IImages, 
    medias: IImages & IVideosObj
}


export default function CardMedias( {medias}: CardProps ) { 
    const [ tab, setTab ] = useState( Object.keys(medias)[0] )
    const glossary: {
        backdrops: string
        logos: string
        posters: string
        [key: string]: string
    } = {
        backdrops: 'Plano de fundo',
        logos: 'Logos',
        posters: 'Posters',
        videos: "Vídeos"
    }

    return (
        <section className="medias bg-zinc-800 text-white my-8 mx-2 py-2 rounded-xl">
            <div className="tabmedias h-fit flex gap-2 px-3">
                { Object.keys(medias).map( (mediaName, i) => { if (mediaName !== "id") { return ( 
                    <button key={'tab'+mediaName} onClick={() => setTab(mediaName)}>
                        <input className="hidden" type="radio" name="tabmedia" id={'tab-'+mediaName} defaultChecked={i==0? true : false} />
                        <label className="inline-block cursor-pointer p-3 rounded-full" htmlFor={'tab-'+mediaName}>
                            {glossary[mediaName]} <span className="text-zinc-400 italic" onClick={ e=>e.stopPropagation() }>{medias[mediaName]?.length}</span>
                        </label> 
                    </button>
                ) } } ) }
            </div>

            { tab && <Media medias={medias[tab]} imageType={tab} /> }
        </section>
    )
}


