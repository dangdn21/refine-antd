"use client";

import { dataProvider as dataProviderSimpleRest } from "@rest-data-provider";

const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = dataProviderSimpleRest(API_URL);