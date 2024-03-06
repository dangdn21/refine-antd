"use client";

import { dataProvider as dataProviderSimpleRest } from "@providers/rest-data-provider";

const API_URL = "https://api.fake-rest.refine.dev";
const GITHUB_API_URL = "https://my-json-server.typicode.com/dangdn21/refine-antd"

export const dataProvider = dataProviderSimpleRest(GITHUB_API_URL);
