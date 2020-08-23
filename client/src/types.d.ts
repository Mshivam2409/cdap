import { STUDENT_CREDENTIALS, AUDIO, TEXT } from "shared/constants/constants";

export interface grievanceData {
    name: string,
    email: string,
    phoneno: string,
    rollno: string,
    mode: "Audio" | "Text",
    Audio?: Blob
    Text?: string
}

export interface changeCredentialsAction {
    type: typeof STUDENT_CREDENTIALS;
    name: string;
    rollno: string;
    phoneno: string;
    email: string;
}

export interface changeGrievanceDatabyAudioAction {
    type: typeof AUDIO
    audio: Blob
}

export interface changeGrievanceDatabyTextAction {
    type: typeof TEXT
    text: string
}

export interface JSONresponse {
    message: string,
    valid: boolean
}
