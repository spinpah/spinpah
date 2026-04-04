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

const FALLBACK = {
  is_playing: false,
  items: [{
    track: {
      name: "WILDFLOWER",
      artists: [{ name: "Billie Eilish" }],
      external_urls: { spotify: "https://open.spotify.com/search/wildflower" },
      album: { images: [{ url: "/images/wildflower.jpg" }] },
      preview_url: "/sounds/WILDFLOWER.MP3",
    },
  }],
};

const getLastPlayed = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    if (!response.ok) return { data: FALLBACK };
    const data = await response.json();
    return { data };
  } catch {
    return { data: FALLBACK };
  }
};

const getNowPlaying = async () => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    if (response.status === 204 || !response.ok) {
      return getLastPlayed();
    }

    const song = await response.json();

    if (song?.is_playing && song?.item) {
      return { data: song };
    }

    return getLastPlayed();
  } catch {
    return { data: FALLBACK };
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
