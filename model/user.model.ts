export interface User {
    id: number;
    name: string;
    is_blocked: boolean;
}
export interface ServiceSettingsResponse {
    items: Array<ServiceSettings>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface LogicBufferSettingsResponse{
    items: Array<LogicBufferSettings>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}
export interface BufferSettingsResponse {
    items: Array<BufferSettings>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface LogicBufferSettings{
    buffer_id : number;
    buffer_name : string;
    buffer_type :number;
    source_name : string;
    blocked : number;
    blocked_date :Date;
    modif_date : Date;
    modifed_by : string;
    note: string;
    fld_cnt : number;

}

export interface AccountResponse {
    items: Array<Accounts>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface Accounts {
    acc_id: number;
    acc_type: number;
    note: string;
    login: string;
    modif_date: Date;
    modifed_by: string;
}

export interface AdminList {
    items: Array<AdminsNameList>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface AdminsNameList {
    adm_user_id: number;
    name: string;
}
/*
export interface BufferSettingsResponse {
    items: Array<BufferSettings>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}
export interface BufferSettings {
    buffer_id: number;
    buffer_name: string;
    buffer_type: number;
    source_type: number;
    source_name: string;
    acc_id: string;
    sync_type: number;
    blocked: number;
    fld_cnt: number;
}*/
export interface ServiceSettings {
    source_buffer_id: string;
    service_id: number;
    service_name: string;
    collection_name: string;
    note: string;
    cache_type: number;
    cache_server_url: string;
    source_url: string;
    life_time: number;
    refresh_time: number;
    refresh_count: number;
    blocked: number;
    blocked_date: Date;
    blocked_by: any;
    modif_date: Date;
    modifed_by: string;
    fld_cnt: number;
}

export interface BufferSettings {
    buffer_name: string;
    buffer_type: number;
    source_type: number;
    source_name: string;
    acc_id: number;
    sync_type: number;
    full_sync: string;
    full_sync_allow_interval: string;
    inc_sync: string;
    sync_interval: number;
    sync_error_delay: number;
    blocked: number;
    blocked_date: Date;
    blocked_by: any;
    modif_date: Date;
    modifed_by: string;
    note: string;
    fld_cnt: number;
}


export interface BufferFieldsResponse {
    items: Array<BufferFields>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface BufferFields {
    buffer_fld_id: number,
    fld_name: string,
    source_fld_name: string,
    fld_type: number,
    key_field: number,
    modif_date: Date,
    modifed_by: string
}


export interface ServiceFieldsResponse {
    items: Array<ServiceFields>;
    hasMore: boolean;
    limit: number;
    offset: number;
    count: number;
}

export interface ServiceFields {
    fld_id: number,
    service_id: number,
    fld_name: string,
    source_fld_name: string,
    fld_type: number,
    key_field: number,
    deflect_to_min: number,
    deflect_to_max: number,
    modif_date: Date,
    modifed_by: string,
    fld_order: number
}