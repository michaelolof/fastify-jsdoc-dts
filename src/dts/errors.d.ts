
export type ErrorKind = {
    key: string;
    code: number;
    friendly: string;
};

export type ErrorExport = { 
    name: string; 
    key: string; 
    ts: number; 
    status_code: number; 
    message: string; 
    detailed_message: string; 
    data: any;
    stack?: string;
};

export type ErrorResponse = {
    status: "error";
    key: string;
    ts?: number;
    message: string;
    data: any;
};