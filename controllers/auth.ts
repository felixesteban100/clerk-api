import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import axios from "axios";

async function fetchClerkApi(req: Request, res: Response) {
  const { userId, clerkSecretKey, apiYoutubeKey, typeOfDATATOFETCH } = req.query;

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
  }
}

module.exports = {
  fetchClerkApi,
};
