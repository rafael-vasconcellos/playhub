import { get_season } from "@/global";
import SeasonWidget, { EpisodesSchema } from "./Widget";



const Seasons: React.FC<{seasons: any[], id: number}> = function( {seasons, id} ) { 
    const { data: episodes, method: fetchSeasons }: {
        data: typeof EpisodesSchema[]
        method: () => void
    } = { 
        data: [EpisodesSchema],
        async method() { 
            const promises = seasons.map(indice => {
                return get_season(id, indice.season_number)
            } );

            Promise.all(promises).then(res => this.data = res)
        }
    }

    fetchSeasons()


    return ( 
        <SeasonWidget seasons={seasons} episodes={episodes} />
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