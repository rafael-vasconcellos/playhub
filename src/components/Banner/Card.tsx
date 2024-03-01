"use client"
import { useState, useEffect } from 'react'
import { IDiscover } from '@/global'
import genres from '@/genres'
import { path } from '../utils'



type IBannerProps = IDiscover & {
    pointer: number
}

export default function BannerCard( {data}: {data?: IBannerProps} ) { 
    const [ small_screen, setScreen ] = useState(false)
    const [ animate, setAnimate ] = useState('animate-pulse')
    const [ skeleton, setSkeleton ] = useState('text-zinc-500 bg-zinc-500')
    const [ display, setDisplay ] = useState( { 
        logo_url: '',
        banner: '',
        type: 'Tipo',
        title: 'Título',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora ipsum consequatur impedit nostrum officia a sint id pariatur veniam, natus quibusdam porro error commodi qui nam itaque quod iusto quo.',

    } )

    const banner_url = small_screen? 
        "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/" : 
        "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/"
    const elements_alignments = small_screen? "flex flex-col items-center" : ""


    function resetAnim(el: HTMLElement | null) { 
        if (el) {
            el.style.animation = 'none'
            el.offsetWidth
            el.style.animation = ''
        }
    }

    const item = data?.results[data?.pointer]



    useEffect(() => { 
        function update_screen() { 
            if (window.innerWidth < 900) { 
                setScreen(() => true)
            } else if (window.innerWidth >= 900) { 
                setScreen(() => false)
            } 
        }

        update_screen()
        window.onresize = update_screen
    }, [] )

    useEffect(() => {
        function func() {
            if (data) { 
                data.pointer = Math.round(Math.random()*data.results?.length)
                let item = data?.results[data?.pointer]
                if (item) { 
                    let obj = { 
                        logo_url: 'logo.png',
                        banner: banner_url+item.poster_path,
                        type: item.media_type === 'movie'? 'Filme': 'Série',
                        title: item.title ?? item.name,
                        description: item.overview
                    }
                    document.querySelector('.b-elements')?.classList.add('animate-emerge')
                    resetAnim( document.querySelector('.banner') )
                    resetAnim( document.querySelector('.b-elements') )
                    setDisplay(() => obj )
                    if (skeleton && animate==='animate-pulse') {
                        setSkeleton(() => '')
                        setAnimate(() => 'animate-display')
                    }
                }
            }
        }

        func()
        const interval = setInterval(func, 7000 )

        return () => {
            clearInterval(interval)
        }

    }, [data] )


    return (
        <section className={`banner w-screen h-screen bg-zinc-950 bg-cover bg-no-repeat overflow-hidden ${animate} mb-6`} style={{backgroundImage: `url(${display.banner})`}} >
            <div className={`w-full h-full bg-zinc-950/[0.4] flex flex-col justify-end`}>
                <div className={`b-elements px-10 py-20 ${elements_alignments}`}>
                        <div className='py-3 flex items-center gap-2'>
                            <div className='w-9 h-9 bg-contain' style={ {backgroundImage: `url(${display.logo_url})`} } />
                            <p className={`w-fit text-xl text-slate-300 ${skeleton}`}>{display.type}</p>
                        </div>

                        <div className='flex flex-col gap-10'>
                            <h1 className={`text-6xl font-bold w-fit text-center ${skeleton}`}>{display.title}</h1>
                            {!small_screen && <p className={`w-2/3 ${skeleton}`}>{display.description}</p>}
                        </div>

                        { small_screen && 
                            <div className='w-fit py-8'>                            
                                { item?.genre_ids?.map(
                                        id => genres[item?.media_type ?? '']?.list?.find(e => e.id === id)?.name
                                ).map(name => <span className='px-2' key={"banner-tagname:"+name}>{name}</span>)   }
                            </div>
                        }

                        { display.banner !== '' && 
                            <div className='flex items-center gap-2 py-4'>
                                    <a className='bg-zinc-50 text-zinc-950 p-3 flex items-center rounded-2xl'
                                    href={ path(item?.media_type, item?.id, item?.title ?? item?.name, item?.original_title ?? item?.original_name) }
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                        </svg>
                                        <b>Assistir</b>
                                    </a>
                                    <button className='text-zinc-50 px-3 flex flex-col items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        My List
                                    </button>
                                    <button className='text-zinc-50 p-3 flex flex-col items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                        </svg>
                                        Info
                                    </button>
                            </div>
                        }
                </div>
            </div>
        </section>
    )

}


/*

https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rXTqhpkpj6E0YilQ49PK1SSqLhm.jpg
https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/h8gHn0OzBoaefsYseUByqsmEDMY.jpg

*/