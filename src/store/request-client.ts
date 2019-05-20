import { Result } from "src/models";

export class RequestClient {
    private static async request<T>(method: string, url: string, body?: any): Promise<Result<T, any>> {
        const headers = new Headers({
            //Authorization: `Bearer ${user.access_token}`,
            "Content-Type": "application/json",
        });
        const options = {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        };
        const response = await fetch(url, options);
        const data = await response.json()
            .then(value => Result.ofResult<T, any>(value))
            .catch(error => Result.ofError<T, any>(error));
        return data;
    }

    static get<T = any>(url: string): Promise<Result<T, any>> {
        return RequestClient.request<T>("GET", url);
    }

    static post<T = any>(url: string, body?: any): Promise<Result<T, any>> {
        return RequestClient.request<T>("POST", url, body);
    }

    static put<T = any>(url: string, body?: any): Promise<Result<T, any>> {
        return RequestClient.request<T>("PUT", url, body);
    }

    static delete<T = any>(url: string): Promise<Result<T, any>> {
        return RequestClient.request<T>("DELETE", url);
    }
}