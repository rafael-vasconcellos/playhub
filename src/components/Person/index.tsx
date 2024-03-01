export type ICastPerson = { 
        "adult": boolean,
        "gender": number,
        "id": number,
        "known_for_department": string,
        "name": string,
        "original_name": string,
        "popularity": number,
        "profile_path": string,
        "cast_id": number,
        "character": string,
        "credit_id": string,
        "order": number
}

export type ICrewPerson = {
    "adult": boolean,
    "gender": number,
    "id": number,
    "known_for_department": string,
    "name": string,
    "original_name": string,
    "popularity": number,
    "profile_path": string,
    "credit_id": string,
    "department": string,
    "job": string

}

const Person: React.FC<{person?: ICastPerson}> = function( {person} ) { 
    const animate = person? '' : "animate-pulse"
    const background = person? '' : "text-zinc-500 bg-zinc-500"

    return (
        <div className="flex gap-3 items-center w-1/2 py-4">
            <div className={`w-24 h-[122px] rounded-full bg-center bg-contain bg-no-repeat ${animate} ${background}`} style={ {backgroundImage: `url(https://www.themoviedb.org/t/p/w138_and_h175_face${person?.profile_path})`} } />
            <div className={animate+` `+background}>
                <h1 className="font-bold text-xl">{person?.name ?? 'Nome do ator'}</h1>
                <p className="text-zinc-300">{person?.character}</p>
            </div>
        </div>
    )
}

export default Person