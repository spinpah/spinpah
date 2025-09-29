interface Game {
  title: string;
  authors: { name: string };
  cover: string;
}


export const getGame = async () => {
    return {
      playing: {
        title: "Silent Hill ƒ",
        author: "KONAMI",
        cover: "/images/game.jpg",
      },
    };
  
};
