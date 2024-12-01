
import { type Writable, writable} from "svelte/store"

export let printFormOpen : Writable<boolean> = writable(false)
export let printFormData : Writable<[]>;