import Reviews, { IReview } from "../Reviews"
import './style.css'


type SocialProps = {
    obj: {results: IReview[]}
}

const Social: React.FC<SocialProps> = function( {obj} ) { 

    return (
        <section className="social">
            <div className="tabsocial flex gap-2 p-3 bg-zinc-800 rounded-xl">
                <button className="cursor-pointer p-3 rounded-full selected">Reviews</button>
                <button className="cursor-pointer p-3 rounded-full">Discussões</button>
            </div>

            <div className="contentsocial">
                <Reviews obj={obj} />
            </div>
        </section>
    )
}

export default Social