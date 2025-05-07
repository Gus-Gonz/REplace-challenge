import axios, { AxiosRequestConfig, Method } from "axios";

class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8000/api";
  }

  fetch(
    endpoint: string,
    data: any = {},
    method: Method = "GET",
    headers: Record<string, string> = {}
  ) {
    const config: AxiosRequestConfig & { _retry?: boolean } = {
      url: `${this.baseUrl}${endpoint}`,
      method,
      headers,
    };

    if (method === "GET") {
      config.params = {};
      config.paramsSerializer = (params) => {
        const searchParams = new URLSearchParams();
        
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => {
              searchParams.append(key, item);
            });
          } else {
            searchParams.append(key, value);
          }
        });
        
        return searchParams.toString();
      };
      
      config.params = data;
    } else {
      config.data = data;
    }

    return axios(config);
  }
}

export default new Api();