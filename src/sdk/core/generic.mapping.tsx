interface FieldMapping {
    camelCase: string;
    originalcase: string; // can be snakeCase or camelCase
}

interface FieldMapping {
    camelCase: string;
    originalcase: string; // can be snakeCase or camelCase
}

class GenericMapping {

    private fieldMappings: Map<string, FieldMapping>;

    constructor(fieldNameList: Record<string, string>) {
        this.fieldMappings = new Map<string, FieldMapping>();
        this.initFieldMapping(fieldNameList);
    }

    private initFieldMapping(fieldNameList: Record<string, string>) {
        for (let key in fieldNameList) {
            const processedKey = key as keyof typeof fieldNameList;
            const value = fieldNameList[processedKey];
            this.fieldMappings.set(processedKey, { camelCase: processedKey, originalcase: value });
        }
    }

    // Convert object keys from snake_case to camelCase
    public convertToCamelCase(obj: any): any {
        return this.convertKeys(obj, 'originalcase', 'camelCase');
    }

    // Convert object keys from camelCase to snake_case
    public convertToSnakeCase(obj: any): any {
        return this.convertKeys(obj, 'camelCase', 'originalcase');
    }

    // General key conversion function
    private convertKeys(obj: any, from: keyof FieldMapping, to: keyof FieldMapping): any {
        if (Array.isArray(obj)) {
            return obj.map(item => this.convertKeys(item, from, to));
        } else if (obj !== null && typeof obj === 'object') {
            const result: any = {};
            for (const key of Object.keys(obj)) {
                const mappedKey = this.getMappedKey(key, from, to);
                result[mappedKey] = this.convertKeys(obj[key], from, to);
            }
            return result;
        }
        return obj;
    }

    // Get mapped key based on the conversion direction
    private getMappedKey(key: string, from: keyof FieldMapping, to: keyof FieldMapping): string {
        let mappedKey = key;
        this.fieldMappings.forEach(mapping => {
            if (mapping[from] === key) {
                mappedKey = mapping[to];
            }
        });
        return mappedKey; // return mapped key if found, otherwise original key
    }
}

export default GenericMapping;
