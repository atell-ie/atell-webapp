import { BAD_REQUEST } from "http-status-codes";
import humps from "humps";
import config from "../../config";
import { store } from "../../Store";

const camelizeKeys = (data: any) =>
    humps.camelizeKeys(data, { split: config.regex.split });

const decamelizeKeys = (data: any) =>
    humps.decamelizeKeys(data, { split: config.regex.split });

const useJwt = (options: any = {}) => {
    const next = options;
    const { auth } = store.getState();

    const resistRoot = localStorage.getItem("persist:root");
    const userData = JSON.parse(resistRoot);

    const accessToken = auth.accessToken || userData.accessToken;
    // const Authorization = `JWT ${accessToken}`;
    const Authorization = `Token ${auth.tempToken}`;

    if (next.headers) {
        next.headers.Authorization = Authorization;
    } else {
        next.headers = { Authorization };
    }
    return next;
};

const useContentTypeJson = (options: any = {}) => {
    const next = options;
    if (next.headers) {
        next.headers["Content-Type"] = "application/json";
    } else {
        next.headers = { "Content-Type": "application/json" };
    }

    return next;
};

const useContentTypeFormData = (options: any = {}) => {
    const next = options;
    // if (next.headers) {
    //     next.headers["Content-Type"] = "multipart/form-data";
    // } else {
    //     next.headers = { "Content-Type": "multipart/form-data" };

    // }

    return next;
};

const anonymousJson = (options: any) => useContentTypeJson(options);
const anonymousForm = (options: any) => useContentTypeFormData(options);

const authorizedJson = (options: any) => useJwt(useContentTypeJson(options));
const authorizedForm = (options: any) =>
    useJwt(useContentTypeFormData(options));

/**
 * HTTP request with fetch API
 */
const httpRequest = async (url: string, options: any) => {
    const request = { options, url };
    try {
        const response = await fetch(
            url.startsWith("http") ? url : `${config.api.baseUrl}${url}`,
            options
        );
        const { status } = response;
        if (response.ok) {
            const text = await response.text();
            if (text) {
                const json = JSON.parse(text);
                const data = camelizeKeys(json);
                return Promise.resolve({ data, status });
            }
            return Promise.resolve({ status });
        }
        const error = await response.text();
        return Promise.reject(new Error(error));
    } catch (error) {
        return Promise.reject(new Error(error));
    }
};

export default {
    anonymous: {
        get: (url: string, headers: any = {}) =>
            httpRequest(
                url,
                anonymousJson({
                    headers,
                    method: "GET"
                })
            ),
        post: (url: string, data: any) =>
            httpRequest(
                url,
                anonymousJson({
                    method: "POST",
                    body: null,
                    headers: data
                })
            ),
        postForm: (url: string, form: any) =>
            httpRequest(
                url,
                anonymousForm({
                    method: "POST",
                    form
                })
            )
    },
    authorized: {
        get: (url: string) =>
            httpRequest(
                url,
                authorizedJson({
                    method: "GET"
                })
            ),
        put: (url: string, data: any) =>
            httpRequest(
                url,
                authorizedJson({
                    method: "PUT",
                    body: JSON.stringify(decamelizeKeys(data))
                })
            ),            
        patch: (url: string, data: any) =>
            httpRequest(
                url,
                authorizedJson({
                    method: "PATCH",
                    body: JSON.stringify(decamelizeKeys(data))
                })
            ),
        post: (url: string, data: any) =>
            httpRequest(
                url,
                authorizedJson({
                    method: "POST",
                    body: JSON.stringify(decamelizeKeys(data))
                })
            ),
        postForm: (url: string, formData: FormData) =>
            httpRequest(
                url,
                authorizedForm({
                    method: "POST",
                    body: formData
                })  
            ),
        delete: (url: string) =>
            httpRequest(
                url,
                authorizedJson({ method: "DELETE" })
            )
    }
};
