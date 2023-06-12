/* eslint-disable react-hooks/rules-of-hooks */

import { _http } from "@/configs/_http";
import useSWR from "swr";

const url = {
    uriApiUsers: (q: string) => "search/users?q=" + q,
    uriApiRepos: (username: string) => `users/${username}/repos`
};

const api = {
    Users: (e:string) => {
        return _http.fetcher(url.uriApiUsers(e));
    },
    Repos: (e:string) => {
        return _http.fetcher(url.uriApiRepos(e));
    },
}

export const userRepository = {
    url,
    api,
};
