import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Dispositivos, DispositivosForm } from '../model/dispositivos.model';

@Service()
export class DispositivoService {
    private readonly http = inject(HttpClient)
    protected readonly url = 'http://localhost:3000/brewingDevices'

    getAll(){
        return this.http.get<Dispositivos[]>(this.url)
    }

    getbyId(id:string|number){
        return this.http.get<Dispositivos>(`${this.url}/${id}`)
    }

    update(id:string|number,dispo:DispositivosForm){
        return this.http.put<Dispositivos>(`${this.url}/${id}`,id)
    }

    add(dispo:DispositivosForm){
        return this.http.post<Dispositivos>(this.url,dispo)
    }

    eliminar(id:string|number){
        return this.http.delete<void>(`${this.url}/${id}`)
    }

}
