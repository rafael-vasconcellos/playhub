"use client"
import { useState, useEffect, useTransition } from 'react'
import genres from '@/genres'
import Item from '../Item'
import { IDetailsResumed, IDiscover } from '@/global'
import './style.css'



async function fetchData(
    queryname: string | number, 
    type: string, 
    page?: number
): Promise<IDiscover> { 

    page = page ?? 1
    return await fetch(`/api/search?q=${queryname}&type=${type}&page=${page}`)
    .then(res => {
        if (res.status === 200) { return res.json() }
        else { return {} as any }
    } ) 
}

async function get_content(e:any) { 
    const contents: IDetailsResumed[] = []
    if (e.target.value === '') { return contents }


    const filmes = genres.movie.list.filter(indice => indice.name.toLowerCase().includes(e.target.value))
    const series = genres.tv.list.filter(indice => indice.name.toLowerCase().includes(e.target.value))

    filmes.forEach(async i => { 
        const response = await fetchData(i.id, i.type, 1)
        if ( (response?.results?.length ?? 0) > 0 ) { contents.push(...response.results) }
    } )

    series.forEach(async i => { 
        const response = await fetchData(i.id, i.type, 1)
        if ((response?.results?.length ?? 0) > 0) { contents.push(...response.results) }
    } )


    if (filmes.length === 0 || series.length === 0) {
        const [ tvResults, moviesResults ] = await Promise.all([ fetchData(e.target.value, 'tv'), fetchData(e.target.value, 'movie') ])
        if (tvResults.results?.length) { contents.push(...tvResults.results) }
        if (moviesResults.results?.length) { contents.push(...moviesResults.results) }
    }

    return contents
}



export default function Search() {
    const [ contents, setContents ] = useState([] as any[])
    const [ isLoading, startTransition ] = useTransition()


    useEffect( () => { 
        let search:any = document.querySelector('#search')
        search.onsearch = (e:any) => { 
            if (contents.length) { setContents( () => [] ) }
            startTransition(async() => { 
                const result = await get_content(e)
                setContents(result)
            } )
        }

        return () => { search = undefined }

    }, [] )


    return (
        <section className="w-full bg-zinc-950">
                <input type="search" className='bg-zinc-800' id="search" placeholder='Digite sua pesquisa...' />
                <div className='results flex flex-wrap justify-center items-start px-10 bg-zinc-950'>
                    {contents.map(e => <Item title={e.title ?? e.name} pic={e.backdrop_path ?? e.poster_path} id={e.id} type={e.type} key={contents.indexOf(e)} />)}
                </div>

                { isLoading && 
                    <div className={`flex justify-center`}>
                        <svg className={`m-auto`} shapeRendering="auto" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                        width="400px" height="400px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                            <path d="M45 50A5 5 0 0 0 55 50A5 5.5 0 0 1 45 50" fill="#ffffff" stroke="none">
                            <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.25;360 50 50.25"></animateTransform>
                            </path>
                        </svg>
                    </div>
                }
        </section>
    )
}






/*
    function handler(res: IDiscover) { console.log(res)

        const section = document.querySelector('section:has(.results)') as HTMLElement
        if ( res?.page === res?.total_pages && section ) {
            section.onscrollend = null
            setPage(1)
            console.log('Search done')

        } else { 
            setPage(res?.page ?? 0 + 1)
            if (section?.onscrollend) { 
                section.onscrollend = () => { 
                    const child = section.children[1] as HTMLInputElement
                    if ( child?.value !== '' && page && child ) { 
                        get_content({ target: child })
                        console.log("page: "+page)
                    } 
                }
            }

        }

        setContents(  prevState => [...prevState ?? [], ...res?.results ?? []].sort(() => {  
            return Math.round(Math.random()) > 0? -1 : 0
        } )  )

        //setLoading(false)
    }

    https://api.themoviedb.org/3/search/${type}?query=${e.target.value}&include_adult=true&language=pt-BR&page=1
*/


