import { Component, inject, OnInit, signal } from '@angular/core';
import { DispositivoService } from '../../service/dispositivo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dispositivos } from '../../model/dispositivos.model';
import { first, firstValueFrom } from 'rxjs';
import { Catalogo } from '../catalogo/catalogo';
import { Formulario } from '../formulario/formulario';

@Component({
  imports: [Formulario],
  selector: 'app-detalles',
  styleUrl: './detalles.css',
  templateUrl: './detalles.html',
})
export class Detalles implements OnInit{
  private readonly service = inject(DispositivoService)
  protected readonly ruta = inject(Router)
  protected readonly rutaActiva = inject(ActivatedRoute)

  protected readonly id = this.rutaActiva.snapshot.paramMap.get('id')!

  protected readonly model = signal<Dispositivos | null>(null)
  protected readonly isEditing = signal(false)

  async ngOnInit(){
    if(this.id){
      const valor = await firstValueFrom(this.service.getbyId(this.id))
      this.model.set(valor)
    }else{
      alert('no exites')
      this.ruta.navigate(['/catalogo'])
    }
  }

  async onDelete(){
    if(!confirm('desea orrar'))return
    await firstValueFrom(this.service.eliminar(this.id))
    this.ruta.navigate(['/catalogo'])
  }

  onUpdate(dipso:Dispositivos){
    this.model.set(dipso)
    this.isEditing.set(false)
  }


}
