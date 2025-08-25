interface Game {
  title: string;
  authors: { name: string };
  cover: string;
}


export const getGame = async () => {
    return {
      playing: {
        title: "Alien: isolation",
        author: "Sega",
        cover: "/images/game.png",
      },
    };
  
};
