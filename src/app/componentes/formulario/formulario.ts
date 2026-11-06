import { Component, computed, inject, input, OnInit, output, signal } from '@angular/core';
import { DispositivoService } from '../../service/dispositivo-service';
import { CATEGORIES, Dispositivos, DispositivosForm } from '../../model/dispositivos.model';
import { form, min, required, FormRoot, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormRoot, FormField, RouterLink],
  selector: 'app-formulario',
  styleUrl: './formulario.css',
  templateUrl: './formulario.html',
})
export class Formulario implements OnInit{
  private readonly service = inject(DispositivoService)

  protected readonly formVacio:DispositivosForm = {
    modelName: '',
    category: '',
    salesPrice: Number.NaN,
    brand: '',
    material: '',
    isInStore: false,
    note: ''
  }
protected readonly categorias = CATEGORIES
  protected readonly signalForm = signal(this.formVacio)

   readonly inDis = input<Dispositivos>()
   readonly outDispo = output<Dispositivos>()
  protected readonly isEditing = computed(()=> this.inDis !== undefined)

  ngOnInit(){
    const valor = this.inDis()
    if(this.isEditing() && valor){
      this.signalForm.set(valor)
    }
  }

  protected readonly formualrio = form(
    this.signalForm,
    (campos)=>{
      required(campos.brand,{message:'campo requerido'})
      required(campos.category, {message: 'campo requerido'})
      required(campos.isInStore,{message:'campo requerido'})
      required(campos.material,{message:'campo requerido'})
      required(campos.modelName,{message:'campo reuqerido'})
      required(campos.note, {message:'campo requerido'})
      required(campos.salesPrice,{message:'campo reuqeirod'})
      min(campos.salesPrice, 1, {message:'campo requerido'})
    },
    {
      submission: {
        action: async (fieldTree)=>{
          if(!confirm('desea continuar?'))return
          const valores= fieldTree().value()
          const id = this.inDis()?.id
          if(this.isEditing() && id){
            const value = await firstValueFrom(this.service.update(id,valores))
            this.signalForm.set(value)
          }else{
            await firstValueFrom(this.service.add(valores))
            this.reset()
          }
        }
      }
    }
  )

  reset(){
    this.formualrio().reset(this.formVacio)
  }


}
