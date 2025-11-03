// src/api/picsum_api.ts

// src/api/picsum_api.ts
import type { PicsumImageListItem, PicsumImageDetail } from '../types/Picsum';

const PICSUM_BASE_URL = 'https://picsum.photos';
export const PAGE_LIMIT = 30;

/**
 * Fetch a page of images from the Picsum /v2/list endpoint.
 */
export async function fetchPicsumImages(page: number, limit = PAGE_LIMIT): Promise<PicsumImageListItem[]> {
    try {
        const url = `${PICSUM_BASE_URL}/v2/list?page=${page}&limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Picsum API error: ${response.status}`);
        }

        const listData: PicsumImageListItem[] = await response.json();

        return listData;
    } catch (error) {
        console.error('Failed to fetch Picsum images:', error);
        throw error;
    }
}

/**
 * Fetch details for a single image using the /id/:id/info endpoint.
 */
export async function fetchPicsumImageById(id: string): Promise<PicsumImageDetail> {
    try {
        const url = `${PICSUM_BASE_URL}/id/${id}/info`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Picsum API error: ${response.status}`);
        }

        const data: PicsumImageDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch Picsum image detail:', error);
        throw error;
    }
}