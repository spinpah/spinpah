interface Game {
  title: string;
  authors: { name: string };
  cover: string;
}


export const getGame = async () => {
    return {
      playing: {
        title: "League of Legends",
        author: "Riot Games",
        cover: "/images/league-of-legends.jpg",
      },
    };
  
};
