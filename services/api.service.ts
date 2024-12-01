import * as SecureStore from "expo-secure-store";

export class ApiValidationError extends Error {
  public field: string;
  constructor(message: string, field: string) {
    super(message);
    this.field = field;
  }
}

export class ApiService {
  private baseUrl = process.env.EXPO_PUBLIC_SERVER_URL;
  async post(endpoint: string, body: any) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (await SecureStore.getItemAsync("jwt")),
      },
    });
    if (response.status >= 500) {
      console.log(response.body, response.status);
      throw new Error("Server error");
    } else if (response.status >= 400) {
      const { message, field } = await response.json();
      throw new ApiValidationError(message, field);
    }
    return response;
  }

  async get(endpoint: string) {
    const response = await fetch(this.baseUrl + endpoint, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + (await SecureStore.getItemAsync("jwt")),
      },
    });
    if (response.status >= 500) {
      console.log(response.body, response.status);
      throw new Error("Server error");
    } else if (response.status >= 400) {
      const { message, field } = await response.json();
      throw new ApiValidationError(message, field);
    }
    const data = await response.json();
    return data;
  }

  async put(endpoint: string, body: any, aditionalHeaders?: any) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("jwt")),
      ...aditionalHeaders,
    };
    // console.log("headers", headers);

    const response = await fetch(this.baseUrl + endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: headers,
    });
    if (response.status >= 500) {
      console.log(response.body, response.status);
      throw new Error("Server error");
    } else if (response.status >= 400) {
      const { message, field } = await response.json();
      throw new ApiValidationError(message, field);
    }
    return response;
  }

  async delete(endpoint: string) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + (await SecureStore.getItemAsync("jwt")),
    };
    const response = await fetch(this.baseUrl + endpoint, {
      method: "DELETE",
      headers: headers,
    });
    if (response.status >= 500) {
      console.log(response.body, response.status);
      throw new Error("Server error");
    } else if (response.status >= 400) {
      const { message, field } = await response.json();
      throw new ApiValidationError(message, field);
    }
    return response;
  }
}

const apiService = new ApiService();
export default apiService;
