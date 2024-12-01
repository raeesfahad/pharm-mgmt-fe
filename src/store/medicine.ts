import { writable, type Writable } from "svelte/store";


let medicine: Writable<any[]> = writable([]);


const medicineStore = {
  subscribe: medicine.subscribe,
  set: medicine.set,
  update: medicine.update,


  addMedicine: (newMedicine: any) => {
    medicine.update((items) => [...items, newMedicine]);
  },

  removeMedicineByIndex: (index: number) => {
    medicine.update((items) => items.filter((item, i) => i !== index));
  },

  removeMedicineById: (id: string | number) => {
    medicine.update((items) => items.filter((item) => item.id !== id));
  },
};

export default medicineStore;

