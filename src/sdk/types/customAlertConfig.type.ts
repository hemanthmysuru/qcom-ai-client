export type CoordinateType = {
    coordinateX: string;
    coordinateY: string;
}

type RegionType = {
    id: string;
    regionName: string;
    enabled: boolean;
    coordinates: CoordinateType[];
    createdBy: string;
    updatedBy: string;
    createdDate: number;
    lastModifiedDate: number;
}

type ParamType = {
    name: string;
    value: string;
}

export type CustomAlertConfigType = {
    id: string;
    alertName: string;
    alertType: string;
    enabled: boolean;
    cameraFk: string;
    cameraId: string;
    cameraName: string;
    severity: string;
    region: RegionType;
    params: ParamType[];
}

export type CustomAlertConfigPayloadType = {
    regionName: string;
    alertName: string;
    alertType: 'occupancy_under' | 'occupancy_changed',
    params: ParamType[];
    severity: string;
    enabled: boolean;
    coordinates: CoordinateType[];
}

export const mockAllCustomAlerts: CustomAlertConfigType[] = [
    {
        id: "11755de1739b4c119472aa68369f8638",
        alertName: "red Antenna",
        alertType: "occupancy_changed",
        enabled: true,
        cameraFk: "442d3b6013b74240b72d8c3cd272a6d8",
        cameraId: "factory302",
        cameraName: "qual31m",
        severity: "high",
        region: {
            id: "1be7cb0a27334d69b681bb9b206a49c2",
            regionName: "Documented region",
            enabled: true,
            coordinates: [
                {
                    coordinateX: '10.36',
                    coordinateY: '12.5'
                },
                {
                    coordinateX: '16.33',
                    coordinateY: '19.21'
                }
            ],
            createdBy: "Admin",
            updatedBy: "Admin",
            createdDate: 1724056374360,
            lastModifiedDate: 1724056603861
        },
        params: [
            {
                name: "threshold",
                value: "2"
            },
            {
                name: "threshold",
                value: "2"
            }
        ]
    },
    {
        id: "51044e0db1f546819cdc6faa445e43b3",
        alertName: "red Antenna",
        alertType: "occupancy_changed",
        enabled: true,
        cameraFk: "442d3b6013b74240b72d8c3cd272a6d8",
        cameraId: "factory302",
        cameraName: "qual31m",
        severity: "high",
        region: {
            id: "1be7cb0a27334d69b681bb9b206a49c2",
            regionName: "Documented region",
            enabled: true,
            coordinates: [
                {
                    coordinateX: '10.36',
                    coordinateY: '12.5'
                },
                {
                    coordinateX: '16.33',
                    coordinateY: '19.21'
                }
            ],
            createdBy: "Admin",
            updatedBy: "Admin",
            createdDate: 1724056374360,
            lastModifiedDate: 1724056603861
        },
        params: [
            {
                name: "threshold",
                value: "2"
            },
            {
                name: "threshold",
                value: "2"
            }
        ]
    }
];
