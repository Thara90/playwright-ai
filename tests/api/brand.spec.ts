import { test, expect } from '@playwright/test';
import { BrandApiClient } from './clients/brand.api';

test.describe('Brand API Tests', () => {
    let brandApi: BrandApiClient;
    let brandId: string;

    test.beforeEach(async ({ request }) => {
        brandApi = new BrandApiClient(request);
        // Login before each test
        await brandApi.login('admin@practicesoftwaretesting.com', 'welcome01');
    });

    test('should get all brands', async () => {
        const { response, data: brands } = await brandApi.getAllBrands();
        expect(response.ok()).toBeTruthy();
        expect(Array.isArray(brands)).toBeTruthy();
        expect(brands.length).toBeGreaterThan(0);
        // Verify the structure of a brand object
        expect(brands[0]).toHaveProperty('id');
        expect(brands[0]).toHaveProperty('name');
        expect(brands[0]).toHaveProperty('slug');
    });

    test('should get a specific brand', async () => {
        // First get all brands to get a valid ID
        const { data: brands } = await brandApi.getAllBrands();
        const firstBrandId = brands[0].id;

        // Get specific brand
        const { response, data: brand } = await brandApi.getBrandById(firstBrandId);
        expect(response.ok()).toBeTruthy();
        expect(brand).toHaveProperty('id', firstBrandId);
        expect(brand).toHaveProperty('name');
        expect(brand).toHaveProperty('slug');
    });

    test('should get brand products', async () => {
        // First get all brands to get a valid ID
        const { data: brands } = await brandApi.getAllBrands();
        const firstBrandId = brands[0].id;

        // Get products for the brand
        const { response, data: products } = await brandApi.getBrandProducts(firstBrandId);
        expect(response.ok()).toBeTruthy();
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
    test('should handle non-existent brand ID', async () => {
        const nonExistentId = '99999';
        const { response } = await brandApi.getBrandById(nonExistentId);
        expect(response.status()).toBe(404);
    });

    test('should handle invalid brand ID format', async () => {
        const invalidId = 'invalid-id';
        const { response } = await brandApi.getBrandById(invalidId);
        expect(response.status()).toBe(404);
    });

    // POST endpoint tests
    test('should create a new brand', async () => {
        const brandData = {
            name: `Test Brand ${Date.now()}`,
            slug: `test-brand-${Date.now()}`
        };

        const { response, data: newBrand } = await brandApi.createBrand(brandData);
        expect(response.status()).toBe(201);
        expect(newBrand).toHaveProperty('id');
        expect(newBrand.name).toBe(brandData.name);
        expect(newBrand.slug).toBe(brandData.slug);

        // Store brand ID for cleanup
        brandId = newBrand.id;
    });

    test('should not create brand with missing required fields', async () => {
        const { response, data: error } = await brandApi.createBrand({} as any);
        expect(response.status()).toBe(400);
        expect(error).toHaveProperty('message');
    });

    test('should not create brand without authentication', async ({ request }) => {
        // Create new client without auth
        const unauthenticatedApi = new BrandApiClient(request);
        const brandData = {
            name: 'Test Brand',
            slug: 'test-brand'
        };

        const { response } = await unauthenticatedApi.createBrand(brandData);
        expect(response.status()).toBe(401);
    });

    // Cleanup after tests
    test.afterAll(async () => {
        if (brandId) {
            await brandApi.deleteBrand(brandId);
        }
    });
});
