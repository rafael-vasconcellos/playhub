'use client'
import Images from './Images'
import Videos from './Videos'
import './style.css'


type MediaProps = {
    medias: any[],
    name?: string,
    imageType?: string
}

const Media: React.FC<MediaProps> = function( { name, medias, imageType } ) {

    return (
        <section className='media'>
                { name && <h1 className={`px-2 inline-block text-2xl font-bold`}>{  name  }</h1> }
                <div className='p-3 carrosel-itens flex items-center gap-3'>
                        <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                         onClick={(e:any) => {
                            let el = e.target.parentElement?.nextSibling
                            el.scrollBy(-el.offsetWidth, 0)
                        } }>
                            {"<"}
                        </button>

                        <div className='flex gap-5 items-start overflow-x-scroll scroll-smooth'>

                            {medias?.map(e => {
                                if (e.key) { return <Videos indice={e} key={e.key} /> }
                                else if (imageType) { return <Images indice={e} imageType={imageType} key={imageType+medias.indexOf(e)} /> }
                            } ) }

                        </div>

                        <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                         onClick={(e:any) => { 
                            let el = e.target.parentElement?.previousSibling
                            el.scrollBy(el.offsetWidth, 0)
                        } }>
                            {">"}
                        </button>
                </div>
        </section>
    )
}


export default Media