export interface WaveScanResponse {
    data: WaveScanDataResponse;
    description: string;
    img: string;
    tags: Array<string>;
    title: string;
}

export interface WaveScanDataResponse {
    equipment: Array<string>;
    material: Array<string>;
}