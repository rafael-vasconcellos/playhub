import star from '../../assets/star.png'

export type IReview = { 
    "author": string
    "author_details": {
        "name": string
        "username": string
        "avatar_path": string
        "rating": number
    },

    "content": string
    "created_at": string
    "id": string
    "updated_at": string
    "url": string

}

type ReviewsProps = {
    obj: {results: IReview[]}, 
    id?: number, 
    type?: string
    // pode ser necessário buscar mais reviews
}


const Reviews: React.FC<ReviewsProps> = function( {obj} ) { 
    const data = obj.results

    return (
        <section className="p-4 w-5/6">
            <h1 className="font-bold text-2xl">{data?.length > 0? 'Reviews:' : ''}</h1>

            { data?.map(e => 
                <div className="my-8 relative rounded-xl bg-zinc-800 px-4 pt-4 pb-8" key={e.id}>
                    <div className="flex gap-3 items-center">
                        <div className="w-11 h-11 rounded-full bg-center" style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w150_and_h150_face${e.author_details.avatar_path})`} } />
                        <a href={`https://www.themoviedb.org/u/${e.author_details.username}`} target='_blank'>
                            <h1 className="font-bold">{e.author_details.name}</h1>
                            <span className="text-zinc-500 text-base">{e.author_details.username}</span>
                        </a>
                        <div className='flex gap-1 px-2'>
                            <span className='w-6 h-6 bg-contain bg-center' style={ {backgroundImage: `url(${star})`} } />
                            <span>{e.author_details.rating}</span>
                        </div>
                    </div>

                    <p className="py-4">{e.content}</p>
                    <div className='absolute top-2 right-3 text-zinc-500'>{e.updated_at? e.updated_at : e.created_at}</div>
                </div>
            ) }

        </section>
    )
}

export default Reviews