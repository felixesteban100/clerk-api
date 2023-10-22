import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

async function fetchClerkApi(req: Request, res: Response) {
  const { userId, clerkSecretKey, apiYoutubeKey, typeOfDATATOFETCH, nextPageToken } = req.query;

  const urlClerkApi: string = `https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/oauth_google`;
  const responseClerkApi = await axios.get(urlClerkApi, {
    headers: {
      Authorization: `Bearer ${clerkSecretKey}`,
    },
  });

  switch (typeOfDATATOFETCH) {
    case "subscriptions":
      const urlYoutubeApisubscriptions: string = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${apiYoutubeKey}`;
      const responseYoutubeApisubscriptions = await axios.get(urlYoutubeApisubscriptions, {
        headers: {
          Authorization: `Bearer ${responseClerkApi.data[0].token}`,
        },
      });

      return res.status(StatusCodes.OK).json(responseYoutubeApisubscriptions.data);

    case "playlists":
      const urlYoutubeApiPlaylists: string = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${apiYoutubeKey}`;
      const responseYoutubeApiPlaylists = await axios.get(urlYoutubeApiPlaylists, {
        headers: {
          Authorization: `Bearer ${responseClerkApi.data[0].token}`,
        },
      });

      return res.status(StatusCodes.OK).json(responseYoutubeApiPlaylists.data);

    case "likedVideos":
      const urlYoutubeApiLikedVideos: string = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&maxResults=50&myRating=like${!!nextPageToken && nextPageToken !== "" ? `&pageToken=${nextPageToken}` : ""}&key=${apiYoutubeKey}`;
      const responseYoutubeApiLikedVideos = await axios.get(urlYoutubeApiLikedVideos, {
        headers: {
          Authorization: `Bearer ${responseClerkApi.data[0].token}`,
        },
      });

      return res.status(StatusCodes.OK).json(responseYoutubeApiLikedVideos.data);
  }
}

module.exports = {
  fetchClerkApi,
};
