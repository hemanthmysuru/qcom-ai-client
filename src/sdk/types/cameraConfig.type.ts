export type CameraBaseDetailsType = {
    id?: string;
    cameraId?: string;
    cameraName: string;
    location: string;
    coordinateX: number;
    coordinateY: number;
    cameraAngle: number;
    fieldOfView: number;
}

export type CameraConfigType = CameraBaseDetailsType & {
    vmsLiveFeedUrl: string;
    primaryImageUrl: string;
    createdBy?: string;
    updatedBy?: string;
    createdDate?: number;
    lastModifiedDate?: number;
};


export type CameraDetailsInFloorMapType = CameraBaseDetailsType & {
    alertId: string;
    totalAlerts: number;
}