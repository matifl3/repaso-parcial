import { Component, computed, inject, signal } from '@angular/core';
import { DispositivoService } from '../../service/dispositivo-service';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CATEGORIES } from '../../model/dispositivos.model';

@Component({
  imports: [],
  selector: 'app-catalogo',
  styleUrl: './catalogo.css',
  templateUrl: './catalogo.html',
})
export class Catalogo {
  private readonly service = inject(DispositivoService)
  protected readonly ruta = inject(Router)

  protected readonly allDispo =  toSignal(this.service.getAll(),{initialValue:[]})
  protected readonly orden = signal('')
  protected readonly filterCategoria = signal('')
  
  protected readonly categorias =CATEGORIES

  protected readonly productosFiltrados = computed(()=>
  {
    const ordena = this.orden()
    const categoria = this.filterCategoria()

    const filtrado = this.allDispo()?.filter((p)=> categoria === '' || p.category === categoria)

    switch(ordena){
      case 'asc':
        return [...filtrado].sort((a,c)=> a.salesPrice - c.salesPrice)
      case 'desc':
        return [...filtrado].sort((a,c)=> c.salesPrice - a.salesPrice)
      default:
        return filtrado
    }
  })

  reset(){
    this.orden.set('')
    this.filterCategoria.set('')
  }
}
