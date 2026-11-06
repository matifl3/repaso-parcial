import { Routes } from '@angular/router';
import { Catalogo } from './componentes/catalogo/catalogo';
import { Detalles } from './componentes/detalles/detalles';
import { Formulario } from './componentes/formulario/formulario';

export const routes: Routes = [
    {
        path:'',redirectTo:'catalogo',pathMatch:'full'
    },
    {
        path:'catalogo',component:Catalogo
    },
    {
        path:'catalogo/:id',component:Detalles
    },
    {
        path:'formulario', component:Formulario
    }
];
