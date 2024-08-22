import { CameraConfigType } from "./cameraConfig.type";

export type AlertDetailsType = {
    id: string;
    alertCategory: string;
    alertType: string;
    alertName: string;
    alertFk: string;
    resolved: boolean;
    deleted: boolean;
    videos: string[];
    images: string[];
    camera: CameraConfigType;
}

const mockAlertData: AlertDetailsType = {
    "camera": {
        "id": "442d3b6013b74240b72d8c3cd272a6d8",
        "cameraName": "qual31m",
        "cameraId": "factory302",
        "location": "packingZone",
        "coordinateX": 10.12,
        "coordinateY": 20.99,
        "cameraAngle": 180,
        "fieldOfView": 90,
        "vmsLiveFeedUrl": "http://qcommvideo02.vid",
        "primaryImageUrl": "http://qcommfactory20.cam",
        "createdBy": "Admin",
        "updatedBy": "Admin",
        "createdDate": 1724053458456,
        "lastModifiedDate": 1724053458456
    },
    "id": "8aef642431464835bfc97b8a168311f5",
    "alertCategory": "fixed",
    "alertType": "restricted_accessories",
    "alertName": "unused material",
    "alertFk": "f35a24ab96c840c798c462f9a7ce523c",
    "resolved": false,
    "deleted": false,
    "videos": [
        "http://gogglevideoclip.com",
        "http://gloveslivefeed.com"
    ],
    "images": [
        "http://googleimage.com",
        "http://glovespicture.com"
    ]
};









