"use client"
import { QueryClient, QueryClientProvider } from "react-query"
import { IProductionDetails } from "@/global"
import Item from "../Item"
import './style.css'



const queryClient = new QueryClient()

export default function SliderCategory(
    {data, type, children}: {data: IProductionDetails[] | null, type?: string, children?: React.ReactNode}
) { 

    const placeholderSchema = {title: '', name: '', backdrop_path: '', poster_path: '', id: undefined}
    const placeholder = Array(8).fill(placeholderSchema)
    data = data ?? placeholder

    return (
        <QueryClientProvider client={queryClient}>
            <section className='category'>
                    {children}
                    <div className='carrosel-itens flex items-center px-3' style={ {maxWidth: '98vw', transform: "translate(0, 0)"} }>
                            <div className="cursor-pointer h-full">
                                <button className="bg-zinc-700 rounded-full px-4 pb-3 pt-2 font-bold text-4xl"
                                onClick={(e:any) => {
                                    let el = e.target.parentElement?.nextSibling
                                    el.scrollBy(-el.offsetWidth, 0)
                                } }>
                                    {"<"}
                                </button>
                            </div>

                            <div className='flex gap-5 items-start px-3 py-4 overflow-x-scroll overflow-y-clip scroll-smooth'>

                                {data?.map( (e: IProductionDetails) => <Item title={e.title ?? e.name} pic={e.poster_path} id={e.id} type={type ?? e.media_type} key={`${e.id ?? Math.random()}`} />)}

                            </div>

                            <div className="cursor-pointer h-full">
                                <button className="bg-zinc-700 rounded-full px-4 pt-2 pb-3 font-bold text-4xl"
                                onClick={(e:any) => {
                                    let el = e.target.parentElement?.previousSibling
                                    el.scrollBy(el.offsetWidth, 0)
                                } }>
                                    {">"}
                                </button>
                            </div>
                    </div>
            </section>
        </QueryClientProvider>
    )
}


























/*const cache = queryClient.getQueryCache().getAll().find(query => query.queryKey === `discover shows ${type} ${categoryName} ${categoryId}`)
const data: any = cache?.state.data
console.log(data) ; console.log(data?.results?.length)*/