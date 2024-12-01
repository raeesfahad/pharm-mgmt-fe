import { writable, type Writable } from "svelte/store";

export let modalopen : Writable<boolean> = writable(false);
