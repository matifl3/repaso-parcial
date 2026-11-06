export interface Dispositivos {
    id:string|number,
    modelName: string,
    category:string,
    salesPrice:number,
    brand:string,
    material:string
    isInStore:boolean,
    note:string
}

export type DispositivosForm =Omit<Dispositivos,'id'>

export const CATEGORIES = [
'Espresso',
'V60',
'Chemex',
'AeroPress',
'Origami',
'Sifón japonés',
'Moka'
] as const