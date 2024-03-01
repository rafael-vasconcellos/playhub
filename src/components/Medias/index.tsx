import { get_images } from "../../global"
import { IVideo } from "../Media/IMedia"
import './style.css'
import SliderMedias, { IImages } from "./Slider"



type MediasProps = {
    videos?: IVideo[],
    images?: IImages,
    id: number
}

const Medias: React.FC<MediasProps> = async function( {videos, id} ) { 
    const imagesData: IImages = await get_images(id).then(res => { //console.log(res)
        if (res?.success) { return res }
        else { return [] }
    } )


    return (
        <SliderMedias videos={videos} imagesData={imagesData} />
    )
}

export default Medias

// https://api.themoviedb.org/3/movie/502356/images