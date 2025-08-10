interface Game {
  title: string;
  authors: { name: string };
  cover: string;
}


export const getGame = async () => {
    return {
      playing: {
        title: "Tokyo Ghoul",
        author: "Sui Ishida",
        cover: "/images/tokyo-ghoul.jpg",
      },
    };
  
};
