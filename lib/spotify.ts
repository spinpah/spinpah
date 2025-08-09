const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const BASIC = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getAccessToken = async () => {
  // Check if Spotify credentials are configured
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("No access token received from Spotify");
  }

  return data.access_token as string;
};

const getNowPlaying = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 60 },
    });

    if (response.status === 204) {
      // No song currently playing → get last played
      return await getLastPlayed();
    }

    const song = await response.json();

    if (song.is_playing) {
      return { status: response.status, data: song };
    }

    // Not playing → show last played
    return await getLastPlayed();

  } catch (error) {
    console.error("Error fetching now playing:", error);

    // Only fallback if creds missing
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return {
        status: 200,
        data: {
          is_playing: false,
          items: [{
            track: {
              name: "WILDFLOWER",
              artists: [{ name: "Billie Eilish" }],
              external_urls: { spotify: "https://open.spotify.com/search/wildflower#_=_" },
              album: { images: [{ url: "/images/wildflower.jpg" }] },
              preview_url: "/sounds/WILDFLOWER.MP3"
            }
          }]
        }
      };
    }

    // Otherwise try last played as a safe fallback
    return await getLastPlayed();
  }
};


const getLastPlayed = async () => {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    });

    if (response.status === 204) {
      return {
        status: response.status,
      };
    }

    try {
      const song = await response.json();

      return {
        status: response.status,
        data: song,
      };
    } catch {
      return {
        status: response.status,
      };
    }
  } catch (error) {
    // Return fallback data when Spotify is not configured
    console.log("Spotify not configured, using fallback music");
    return {
      status: 200,
      data: {
        items: [{
          track: {
            name: "Security First",
            artists: [{ name: "Cybersecurity Podcast" }],
            external_urls: { spotify: "#" },
            album: {
              images: [{ url: "/images/music-placeholder.jpg" }]
            },
            preview_url: null
          }
        }]
      }
    };
  }
};

export const getTopTracks = async () => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (response.status === 204) {
    return {
      status: response.status,
    };
  }

  try {
    const song = await response.json();

    return {
      status: response.status,
      data: song,
    };
  } catch {
    return {
      status: response.status,
    };
  }
};

export const getSeveralTracksFeatures = async (trackIDs: string[]) => {
  const accessToken = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/audio-features?ids=${trackIDs.join(",")}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
        revalidate: 60,
      },
    }
  );

  if (response.status === 204) {
    return {
      status: response.status,
    };
  }

  try {
    const song = await response.json();

    return {
      status: response.status,
      data: song,
    };
  } catch {
    return {
      status: response.status,
    };
  }
};

export default getNowPlaying;
