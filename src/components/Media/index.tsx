'use client'
import { Videos, Images } from './utils'
import './style.css'


type MediaProps = {
    medias: any[],
    name?: string,
    imageType?: string
}

const Media: React.FC<MediaProps> = function( { name, medias, imageType } ) {

    return (
        <section className='media'>
                {name && <h1 className={`px-2 inline-block text-2xl font-bold`}>{name}</h1>}
                <div className='carrosel-itens flex items-center' style={ {maxWidth: '98vw'} }>
                        <div className="cursor-pointer h-full px-1">
                            <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.nextSibling
                                el.scrollBy(-el.offsetWidth, 0)
                            } }>
                                {"<"}
                            </button>
                        </div>

                        <div className='flex gap-5 items-start px-3 py-4 overflow-x-scroll overflow-y-visible scroll-smooth'>

                            {medias?.map(e => {
                                if (e.key) { return <Videos indice={e} key={e.key} /> }
                                else if (imageType) { return <Images indice={e} imageType={imageType} key={imageType+medias.indexOf(e)} /> }
                            }
                            ) }

                        </div>

                        <div className="cursor-pointer h-full pl-3">
                            <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                             onClick={(e:any) => {
                                let el = e.target.parentElement?.previousSibling
                                el.scrollBy(el.offsetWidth, 0)
                            } }>
                                {">"}
                            </button>
                        </div>
                </div>
        </section>
    )
}


export default Media