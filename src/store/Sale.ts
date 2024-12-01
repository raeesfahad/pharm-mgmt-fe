import { writable } from "svelte/store";


export function Prescription(){
  const prescription = writable([]);

  return {
    subscribe: prescription.subscribe,
    setMedsData: (medsData : any) => prescription.set(medsData),
}
}
