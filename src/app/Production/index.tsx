import { production_details, route_search, trending, IPageProps } from "../../global"
import './style.css'
import Category from "@/components/Category"
import Seasons from "@/components/Seasons"
import Medias from "@/components/Medias"
import Aside from "@/components/Aside"
import Reviews from "@/components/Reviews"
import Staff from "@/components/Staff"
import Navbar from "@/components/Navbar"
import { Show } from "@/components/utils"
import { ProductionCard } from "./utils"



const Production: React.FC<IPageProps & {type: string}> = async function( {type, params} ) { 
    const { production } = params
    const splited_name = typeof production === 'string'? production?.split('-') : undefined
    const params_id = splited_name?
        Number( splited_name[splited_name.length-1] )
            : undefined


    async function get_id() { 
        const queryname = typeof production === 'string'? 
            production?.replace(
                params_id? `${params_id}` : '', 
                ''
            ).replaceAll('-', ' ') : undefined

        if (!params_id && queryname) { return await route_search(type, queryname).then(res => res.id) } 
        else { return params_id }
    }

    const production_id = await get_id()
    const append = "&append_to_response=videos%2Cimages%2Crecommendations%2Csimilar%2Creviews%2Cseasons%2Ccredits"
    const data = await production_details(production_id, type, append, true)
    const trendings = await trending().then(res => res.results)
    

    return (
        <>
            <Navbar />
            <Show when={data?.id !== undefined && data?.id === production_id} fallback={<ProductionCard data={null} />}>
                <ProductionCard data={data} />
            </Show>

            <div className="relative">
                { trendings?.length > 0 && <Aside name={'Trending'} content={trendings?.slice(0, 7)} /> }
                <section className="w-4/5">
                    {data.seasons?.length > 0 && production_id === data.id && 
                        <Seasons seasons={data.seasons} id={data.id} /> }

                    <Show when={data?.credits && production_id === data.id} fallback={<Staff />}>
                        <Staff staff={data.credits} production_companies={data.production_companies} />
                    </Show>

                    {data.videos?.results?.length > 0 && production_id === data.id && 
                        <Medias id={data.id} videos={data.videos.results} /> }

                    <Show when={ (production_id === data.id) && production_id }  
                    fallback={
                        <>
                            <Category categoryName="Placeholder" />
                            <Category categoryName="Placeholder" />
                        </>
                    }>
                        { data.recommendations?.results?.length > 0 && <Category content={data.recommendations.results} categoryName="Recomendações" categoryId={data.id} /> }
                        { data.similar?.results?.length > 0 && <Category content={data.similar.results} categoryName="Similares" categoryId={data.id} type={type} /> }
                    </Show>

                    { data.reviews && production_id === data.id && <Reviews obj={data.reviews} /> }
                </section>
            </div>
        </>
    )

}

export default Production


// c.indicativa, 
// ano, duração, nomes alternativos, generos, status | score, total de votos, popularidade
// temporadas, recomendados, trending | mídia | reviews, sua avaliação, sua coleção, imdb id
// Account States: Get the rating, watchlist and favourite status.

// detalhes: Empresas de produção+staff, Elenco, Lançamentos, Países de origem
// Também conhecido como, Locações de filme, Data de lançamento, Idiomas, Centrais de atendimento oficiais (redes sociais)
// crítica, awards, bilheteria




/*
path: routing


100088
502356
super-mario-bros-o-filme
videos.results[0].key

backdrop_path: https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg
antigo: poster_path

*/