import { test, expect } from '@playwright/test';

const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

test.describe('Brand API Tests', () => {
    let brandId: string;

    test('should get all brands', async ({ request }) => {
        const response = await request.get(`${API_BASE_URL}/brands`);
        expect(response.ok()).toBeTruthy();
        const brands = await response.json();
        expect(Array.isArray(brands)).toBeTruthy();
        expect(brands.length).toBeGreaterThan(0);
        // Verify the structure of a brand object
        expect(brands[0]).toHaveProperty('id');
        expect(brands[0]).toHaveProperty('name');
        expect(brands[0]).toHaveProperty('slug');
    });

    test('should get a specific brand', async ({ request }) => {
        // First get all brands to get a valid ID
        const brandsResponse = await request.get(`${API_BASE_URL}/brands`);
        const brands = await brandsResponse.json();
        const firstBrandId = brands[0].id;

        // Get specific brand
        const response = await request.get(`${API_BASE_URL}/brands/${firstBrandId}`);
        expect(response.ok()).toBeTruthy();
        const brand = await response.json();
        expect(brand).toHaveProperty('id', firstBrandId);
        expect(brand).toHaveProperty('name');
        expect(brand).toHaveProperty('slug');
    });

    test('should get brand products', async ({ request }) => {
        // First get all brands to get a valid ID
        const brandsResponse = await request.get(`${API_BASE_URL}/brands`);
        const brands = await brandsResponse.json();
        const firstBrandId = brands[0].id;

        // Get products for the brand
        const response = await request.get(`${API_BASE_URL}/brands/${firstBrandId}/products`);
        expect(response.ok()).toBeTruthy();
        const products = await response.json();
        expect(Array.isArray(products.data)).toBeTruthy();
        
        // Verify product structure if any products exist
        if (products.data.length > 0) {
            expect(products.data[0]).toHaveProperty('id');
            expect(products.data[0]).toHaveProperty('name');
            expect(products.data[0]).toHaveProperty('description');
            expect(products.data[0]).toHaveProperty('price');
        }
    });

    // Negative test cases
    test('should handle non-existent brand ID', async ({ request }) => {
        const nonExistentId = '99999';
        const response = await request.get(`${API_BASE_URL}/brands/${nonExistentId}`);
        expect(response.status()).toBe(404);
    });

    test('should handle invalid brand ID format', async ({ request }) => {
        const invalidId = 'invalid-id';
        const response = await request.get(`${API_BASE_URL}/brands/${invalidId}`);
        expect(response.status()).toBe(404);
    });
});
