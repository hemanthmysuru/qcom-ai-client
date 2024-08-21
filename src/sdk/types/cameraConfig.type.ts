export type CameraConfigType = {
    id?: string;
    cameraId?: string;
    cameraName: string;
    location: string;
    coordinateX: number;
    coordinateY: number;
    cameraAngle: number;
    fieldOfView: number;
    vmsLiveFeedUrl: string;
    primaryImageUrl: string;
    createdBy?: string;
    updatedBy?: string;
    createdDate?: number;
    lastModifiedDate?: number;
};
