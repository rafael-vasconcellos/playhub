"use client"
import { useEffect } from "react"
import Media from "../Media"
import { display } from "../utils"
import { IImage, IVideo } from "../Media/utils"



export type IImages = {
    backdrop: IImage[],
    poster: IImage[],
    logos: IImage[],
    [key: string]: IImage[]
}

export default function SliderMedias( {videos, imagesData}: {videos?: IVideo[], imagesData: IImages} ) { 
    const glossary: {
        backdrops: string
        logos: string
        posters: string
        [key: string]: string
    } = {
        backdrops: 'Plano de fundo',
        logos: 'Logos',
        posters: 'Posters'
    }

    useEffect( () => { 
        document.querySelector('.tabcontent')?.children[0]?.classList.remove('hidden')
        document.querySelector('.tabmedias')?.children[0]?.classList.add('selected')
    }, [] )

    return (
        <section className="medias bg-zinc-800 text-white my-8 mx-2 rounded-xl">

            <div className="tabmedias flex gap-2 p-3">
                { videos && 
                    <button className="cursor-pointer p-3 rounded-full" onClick={(e:any) => { 
                        display(e.target, 'tabmedias', 'selected')  
                        display('contentvideos', 'tabcontent', 'hidden')
                    } }>
                        Videos <span className="text-zinc-400 italic" onClick={ e=>e.stopPropagation() }>{videos?.length}</span>
                    </button>
                }

                { Object.keys(imagesData).map(e => { if (e !== "id") { return (
                    <button className="cursor-pointer p-3 rounded-full" key={'tab'+e} onClick={ (event:any) => { 
                        display(event.target, 'tabmedias', 'selected')  
                        display('content'+e, 'tabcontent', 'hidden')
                    } }>
                        {glossary[e]} <span className="text-zinc-400 italic" onClick={ e=>e.stopPropagation() }>{imagesData[e]?.length}</span>
                    </button> 
                ) } } ) }
            </div>


            <div className="tabcontent">
                { videos && <div className="hidden contentvideos"><Media medias={videos} /></div> }
                { Object.keys(imagesData).map( e => { 
                    if (typeof imagesData[e] !== "number") { 
                        return <div className={`hidden content${e}`} key={'content'+e}><Media medias={imagesData[e]} imageType={e} /></div>
                    } 
                } ) }
            </div>

        </section>
    )
}