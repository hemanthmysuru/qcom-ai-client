export const generateUUID = (): string => {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
        const r = Math.random() * 16 | 0;
        return r.toString(16);
    });
}

export function validateEndpoint(endPoints: { [key: string]: any }, category: string, action: string, params: { [key: string]: string } = {}): string {
    // Check if category exists
    if (!endPoints[category]) {
        throw new Error(`Category "${category}" does not exist in endpoints.`);
    }

    // Check if points object exists in the category
    if (!endPoints[category]?.points || endPoints[category]?.points[action] == undefined) {
        throw new Error(`Action "${action}" does not exist in category "${category}".`);
    }

    // Get base URL and endpoint path
    const baseUrl = endPoints[category].categoryUrl;
    const endpointTemplate = endPoints[category].points[action];

    // Replace dynamic parameters in the endpoint path
    let endpoint = baseUrl + endpointTemplate;
    for (const [key, value] of Object.entries(params)) {
        endpoint = endpoint.replace(`{${key}}`, value);
    }

    return endpoint;
}

