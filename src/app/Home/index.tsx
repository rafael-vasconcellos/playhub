import { Suspense } from 'react'
import Banner from '../../components/Banner'
import Category from '../../components/Category'
import Navbar from '../../components/Navbar'
import genres from '../../genres'



function get_genres(type?: string) {
    if (type) {
        return genres[type].list.sort(getRandom)
    } else {
        let list = [
            ...genres.movie.list.sort(getRandom).slice(0, 9), 
            ...genres.tv.list.sort(getRandom).slice(0, 9)
        ]
        list = list.sort(getRandom)
        return list

    }

    function getRandom() {
        const number = Math.round(Math.random())
        return number > 0? number*-1 : number
    }
}


const Home: React.FC<{type?: 'tv' | 'movie'}> = function( {type} ) { 
    const content = get_genres(type)

    return (
        <>
            <Navbar />
            { !type && 
                <Suspense fallback={<p>Loading...</p>}>
                    <Banner />
                </Suspense>
            }
            <div className='h-8'></div>
            { content.map((e) => 
                <Suspense key={e.type+' '+e.id} fallback={
                    <Category categoryName='placeholder' />
                }>
                    <Category categoryId={e.id} type={e.type} categoryName={e.name} key={`discover shows ${e.type} ${e.name}`} /> 
                </Suspense>
            ) }
        </>
    )
}

export default Home