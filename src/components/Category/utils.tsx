"use client"
import React, { ReactNode } from "react"
import { MouseEventHandler } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { IProductionDetails } from "@/global"
import Item from "../Item"
import './style.css'



const queryClient = new QueryClient()

function placeholder() { 
    const placeholderSchema = {title: '', name: '', backdrop_path: '', poster_path: '', id: undefined}
    return Array(8).fill(placeholderSchema)
}


export default function CategorySlider(
    {data, type, children}: {data: IProductionDetails[] | null, type?: string, children?: React.ReactNode}
) { 

    data = data ?? placeholder()
    let ref = React.createRef<HTMLDivElement>()

    return (
        <QueryClientProvider client={queryClient}>
            <section className='category'>
                    {children}
                    <div className='carrosel-itens flex items-start gap-4 mb-2 relative'>
                            <SlideButton name="previous" onClick={ (e) => ref.current?.scrollBy(-ref.current.offsetWidth, 0) } />

                            <div ref={ref} className='flex items-start px-3 py-6 scroll-smooth'>
                                {data?.map( (e: IProductionDetails) => <Item title={e.title ?? e.name} pic={e.poster_path} id={e.id} type={type ?? e.media_type} key={`${e.id ?? Math.random()}`} />)}
                            </div>

                            <SlideButton name="next" className="absolute right-0" onClick={ () => ref.current?.scrollBy(ref.current.offsetWidth, 0) } />
                    </div>
            </section>
        </QueryClientProvider>
    )
}


function SlideButton( {name, onClick, className}: { name: "next" | "prev" | "previous" } & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> ) { 
    const angle = name==="next"? "" : "rotate-180"

    return (
        <button className={`h-[300px] min-w-14 my-2 bg-primary/40 cursor-pointer flex justify-center items-center ${className}`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
             className={`size-8 ${angle}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
    )
}



{/* <div className="cursor-pointer h-full">
                                <button className="bg-zinc-700 rounded-full px-4 pt-2 pb-3 font-bold text-4xl"
                                onClick={(e:any) => {
                                    let el = e.target.parentElement?.previousSibling
                                    el.scrollBy(el.offsetWidth, 0)
                                } }>
                                    {">"}
                                </button>
                            </div> */}


/*const cache = queryClient.getQueryCache().getAll().find(query => query.queryKey === `discover shows ${type} ${categoryName} ${categoryId}`)
const data: any = cache?.state.data
console.log(data) ; console.log(data?.results?.length)*/