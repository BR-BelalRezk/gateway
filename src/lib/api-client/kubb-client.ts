
export type RequestConfig<TVariables = unknown> = {
    method: 'get' | 'put' | 'patch' | 'post' | 'delete'
    url: string
    params?: unknown
    data?: TVariables
    signal?: AbortSignal
    headers?: HeadersInit
    cache?: RequestCache
    next?: NextFetchRequestConfig | undefined
}

export type ResponseConfig<TData = unknown> = {
    data: TData
    status: number
    statusText: string
    headers?: Headers
}


export const fetchClient = async <TData, TError = unknown, TVariables = unknown>(config: RequestConfig<TVariables>): Promise<ResponseConfig<TData>> => {
    const { url, data, headers, params, ...fetchOptions} = config;

    const searchParams = config.params ? new URLSearchParams(params as Record<string, string>) : new URLSearchParams();

    const response = await fetch(`${process.env.API_URL}${url}?${searchParams.toString()}`, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: JSON.stringify(data),
        ...fetchOptions
    })

    if (!response.ok) {
        ////console.log(response);
    }

    return {
        data: await response.json(),
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    }
}

export default fetchClient