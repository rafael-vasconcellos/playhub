export type IImage = { 
    "aspect_ratio": number,
    "height": number,
    "iso_639_1": string | null,
    "file_path": string,
    "vote_average": number,
    "vote_count": number,
    "width": number
}

export type IVideo = {
    "iso_639_1": string
    "iso_3166_1": string
    "name": string
    "key": string
    "site": string
    "size": number
    "type": string
    "official": boolean
    "published_at": string
    "id": string

}

const Images: React.FC<{indice: IImage, imageType: string}> = function( {indice, imageType} ) { 
    const resolutions: {
        backdrops: string[],
        posters: string[],
        logos: string[],
        [key: string]: string[],

    } = {
        backdrops: ['https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces', '300px', '169px'],
        posters: ['https://www.themoviedb.org/t/p/w300_and_h450_bestv2', '150px', '225px'],
        logos: ['https://www.themoviedb.org/t/p/w500', '200px', '171px']
    }


    return ( 
        <img width={resolutions[imageType][1]} height={resolutions[imageType][2]} src={resolutions[imageType][0]+indice.file_path} />
    )
}



export default Images