import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/model/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.apiBaseUrl;

  
  /*getServSettings() {
    return this.http.get(this.baseUrl + '/api/servs_settings');
  }*/
  getAccounts() {
    return this.http.get(this.baseUrl + '/api/accounts'); 
  }
  getAdminsList() {
    return this.http.get(this.baseUrl + '/api/get_admins_name'); 
  }

  getServFields(serv_id:string) {
    return this.http.get(this.baseUrl + '/api/serv_fields/'+serv_id); 
  }

  getGroupedBufferFields(buffer_id:string) {
    return this.http.get(this.baseUrl + '/api/grouped_buffer_fields/'+buffer_id); 
  }

  getServSettings(serv_id:string) {
    if(serv_id===null) return this.http.get(this.baseUrl + '/api/servs_settings');
    else 
    return this.http.get(this.baseUrl + '/api/servs_settings/'+serv_id);
    
  }

  getLogicBuffSettings(buffer_id:string){
    if(buffer_id===null) return this.http.get(this.baseUrl + '/api/logic_buffer_settings');
    else 
    return this.http.get(this.baseUrl + '/api/logic_buffer_settings/'+buffer_id);
  }

  getBuffSettings(buffer_id:string) {
    if(buffer_id===null) return this.http.get(this.baseUrl + '/api/buffer_settings');
    else 
    return this.http.get(this.baseUrl + '/api/buffer_settings/'+buffer_id);
    
  }
  
  addServField(p_service_id : number,
    p_fld_name : string,
    p_source_fld_name : string,
    p_fld_type : number,
    p_key_field : number,
    p_fld_order : number,
    p_deflect_to_min : number,
    p_deflect_to_max : number,
    p_user_id : number){
      return this.editServField(null,p_service_id,
        p_fld_name,
        p_source_fld_name,
        p_fld_type,
        p_key_field,
        p_fld_order,
        p_deflect_to_min,
        p_deflect_to_max,
        p_user_id);
  }
  editServField(  p_fld_id : number,
    p_service_id : number,
    p_fld_name : string,
    p_source_fld_name : string,
    p_fld_type : number,
    p_key_field : number,
    p_fld_order : number,
    p_deflect_to_min : number,
    p_deflect_to_max : number,
    p_user_id : number){
      return this.http.post(this.baseUrl + '/api/add_edit_serv_field', { p_fld_id,
        p_service_id,
        p_fld_name,
        p_source_fld_name,
        p_fld_type,
        p_key_field,
        p_fld_order,
        p_deflect_to_min,
        p_deflect_to_max,
        p_user_id})
  }

  addGrPhysBuffField(
    p_buffer_id: number,
    p_fld_name : string,
    p_source_fld_name : string,
    p_fld_type : string,
    p_key_field : number,
    p_user_id : number,
  )
  {
    return this.editGrPhysBuffField(
      p_buffer_id,
      null,
      p_fld_name,
      p_source_fld_name,
      p_fld_type,
      p_key_field,
      p_user_id
    )
    
  }
  editGrPhysBuffField(
    p_buffer_id: number,
    p_buffer_fld_id : number,
    p_fld_name : string,
    p_source_fld_name : string,
    p_fld_type : string,
    p_key_field : number,
    p_user_id : number,
  )
  {
    
    return this.http.post(this.baseUrl + '/api/add_edit_grphysbuff_field', 
    { 
      p_buffer_id,
      p_buffer_fld_id,
      p_fld_name,
      p_source_fld_name,
      p_fld_type,
      p_key_field,
      p_user_id
    }
    )
  }

  addServSetting(
    p_service_name : string,
    p_collection_name : string,
    p_note : string,
    p_cache_type : number,
    p_cache_server_url : string,
    p_source_url : string,
    p_buffer_id : number,
    p_life_time : number,
    p_refresh_time : number,
    p_refresh_count : number,
    p_user_id : number
    )
    {
      return this.editServSetting(null,p_service_name, p_collection_name, p_note,
        p_cache_type, p_cache_server_url, p_source_url, p_buffer_id,
        p_life_time, p_refresh_time, p_refresh_count,p_user_id, 1);
  }

  editServSetting(  
    p_service_id : number,
    p_service_name : string,
    p_collection_name : string,
    p_note : string,
    p_cache_type : number,
    p_cache_server_url : string,
    p_source_url : string,
    p_buffer_id : number,
    p_life_time : number,
    p_refresh_time : number,
    p_refresh_count : number,
    p_user_id : number,
    p_blocked)
    {
      return this.http.post(this.baseUrl + '/api/add_edit_service', { p_service_id,p_service_name, p_collection_name, p_note,
        p_cache_type, p_cache_server_url, p_source_url, p_buffer_id,
        p_life_time, p_refresh_time, p_refresh_count,p_user_id,p_blocked})
  }



  addGroupedBufferPhysicalSettings(
    p_buffer_name: string,
    p_buffer_type: number,
    p_source_type: number,
    p_source_name : string,
    p_acc_id: number,
    p_sync_type: number,
    p_full_sync: string,
    p_full_sync_allow_interval: string,
    p_inc_sync: string,
    p_sync_interval: number,
    p_sync_error_delay :number,
    p_user_id : number,
    p_note: string
    )
    {
      return this.editGroupedBufferPhysicalSettings(
        null, 
        p_buffer_name,
        p_buffer_type, 
        p_source_type,
        p_source_name,
        p_acc_id, 
        p_sync_type, 
        p_full_sync,
        p_full_sync_allow_interval,
         p_inc_sync,
         p_sync_interval,
        p_sync_error_delay, 
        1, 
        p_user_id, 
        p_note
        );
  }


  editGroupedBufferPhysicalSettings( 
    p_buffer_id : number,
    p_buffer_name: string,
    p_buffer_type: number,
    p_source_type: number,
    p_source_name : string,
    p_acc_id: number,
    p_sync_type: number,
    p_full_sync: string,
    p_full_sync_allow_interval: string,
    p_inc_sync: string,
    p_sync_interval: number,
    p_sync_error_delay :number,
    p_blocked: number,
    p_user_id : number,
    p_note: string
    )
    {
       return this.http.post(this.baseUrl + '/api/add_edit_grphysbuff', 
      { p_buffer_id,  p_buffer_name,p_buffer_type, p_source_type, p_source_name,
        p_acc_id, p_sync_type, p_full_sync, p_full_sync_allow_interval,
        p_inc_sync,p_sync_interval, p_sync_error_delay, p_blocked, p_user_id,p_note
      }
      )
  }







  getUsers() {
    return this.http.get(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserById(id: number) {
    return this.http.get(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createUser(user: User){
    return this.http.post(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  deleteUser(id: number){
    return this.http.delete(this.baseUrl + 'user/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
