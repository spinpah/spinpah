interface Game {
  title: string;
  authors: { name: string };
  cover: string;
}


export const getGame = async () => {
  return {
    playing: {
      title: "The Witcher 3",
      author: "CD Projekt Red",
      cover: "/images/witcher3.jpg",
    },
  };
};
