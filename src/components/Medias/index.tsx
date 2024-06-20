import { get_images } from "../../global"
import { IVideo } from "../Media/Images"
import './style.css'
import CardMedias, { IImages } from "./Card"



type MediasProps = {
    videos?: IVideo[],
    images?: IImages,
    id: number
}

const Medias: React.FC<MediasProps> = async function( {videos, id} ) { 
    const imagesData: IImages = await get_images(id)
    const videosData = { videos }
    const medias = Object.assign(videosData, imagesData)

    return (
        <CardMedias medias={medias} />
    )
}

export default Medias

// https://api.themoviedb.org/3/movie/502356/images