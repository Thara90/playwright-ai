import { APIRequestContext } from '@playwright/test';

export interface BrandData {
    id?: string;
    name: string;
    slug: string;
}

export class BrandApiClient {
    private readonly baseUrl: string;
    private authToken: string = '';

    constructor(
        private request: APIRequestContext,
        baseUrl: string = 'https://api.practicesoftwaretesting.com'
    ) {
        this.baseUrl = baseUrl;
    }

    setAuthToken(token: string) {
        this.authToken = token;
    }

    private get authHeaders() {
        return {
            'Authorization': `Bearer ${this.authToken}`
        };
    }

    async getAllBrands() {
        const response = await this.request.get(`${this.baseUrl}/brands`);
        return {
            response,
            data: await response.json()
        };
    }

    async getBrandById(id: string) {
        const response = await this.request.get(`${this.baseUrl}/brands/${id}`);
        return {
            response,
            data: await response.json()
        };
    }

    async getBrandProducts(id: string) {
        const response = await this.request.get(`${this.baseUrl}/brands/${id}/products`);
        return {
            response,
            data: await response.json()
        };
    }

    async createBrand(brandData: BrandData) {
        const response = await this.request.post(`${this.baseUrl}/brand`, {
            headers: this.authHeaders,
            data: brandData
        });
        return {
            response,
            data: response.ok() ? await response.json() : null
        };
    }

    async deleteBrand(id: string) {
        const response = await this.request.delete(`${this.baseUrl}/brand/${id}`, {
            headers: this.authHeaders
        });
        return {
            response,
            data: response.ok() ? await response.json() : null
        };
    }

    async login(email: string, password: string) {
        const response = await this.request.post(`${this.baseUrl}/auth/login`, {
            data: { email, password }
        });
        const data = await response.json();
        if (response.ok()) {
            this.setAuthToken(data.access_token);
        }
        return {
            response,
            data
        };
    }
}
