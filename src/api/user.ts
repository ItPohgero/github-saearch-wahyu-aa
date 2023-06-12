/* eslint-disable react-hooks/rules-of-hooks */

import { _http } from "@/configs/_http";
import useSWR from "swr";

const url = {
    uriApiExample: () => "xxx",
    uriHookExample: () => "xxx"
};

const api = {
    Xxx: () => {
        return _http.post(url.uriApiExample(), null);
    },
}

const hooks = {
    Xxx: () => {
        return useSWR(url.uriHookExample(), _http?.fetcher);
    },
};

export const exampleRepository = {
    url,
    api,
    hooks
};
