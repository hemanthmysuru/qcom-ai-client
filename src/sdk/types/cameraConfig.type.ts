export type CameraConfigType = {
    id?: number;
    cameraId?: string;
    cameraName: string;
    location: string;
    x_coordinate: number;
    y_coordinate: number;
    cameraAngle: number;
    fieldOfView: number;
    vmsLiveFeedUrl: string;
    primaryImageUrl: string;
    createdBy?: string;
    updatedBy?: string;
    createdDate?: number;
    lastModifiedDate?: number;
};
