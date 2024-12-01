import {type Writable, writable} from "svelte/store"

export let inverntory_add_form : Writable<boolean> = writable(false)
export let supplier_add_form : Writable<boolean> = writable(false)