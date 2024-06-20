import { ISeason, get_season } from "@/global";
import SeasonWidget from "./Widget";
import { Suspense } from "react";



async function handler(id: number, seasons: ISeason[]) { 
    const promises = seasons.map(indice => {
        return get_season(id, indice.season_number)
    } );

    return await Promise.all(promises)
}

const Seasons: React.FC<{seasons: ISeason[], id: number}> = async function( {seasons, id} ) { 
    const seasonsWithEpisodes = await handler(id, seasons)


    return ( 
        <Suspense fallback={<p>Loading...</p>}>
            <SeasonWidget seasons={seasons} seasonsWithEpisodes={seasonsWithEpisodes} />
        </Suspense>
    )
}

export default Seasons


/*

Promise.all(promises).then(responses => {
  const updatedSeasons = seasons.map((season, i) => {
    season.episodes = responses[i].episodes;
    return season;
  });

  // Use updatedSeasons aqui ou retorne-o, dependendo do contexto do código.
});

*/