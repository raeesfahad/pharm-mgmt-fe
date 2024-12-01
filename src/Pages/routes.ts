import Home from "./Home.svelte"
import Inventory from "./inventory.svelte"
import Suppliers from "./Suppliers.svelte"
import ScreenError from "../lib/screen-error.svelte"
import NewSale from "./new_Sale.svelte"
import Staff from "./Staff.svelte"
import wrap from "svelte-spa-router/wrap"
import Invoice from "../lib/tables/invoice.svelte"
import Slash from "../lib/slash.svelte"
import Login from "./Login.svelte"
import Order from "../lib/Order.svelte"
import Approval from "./approval.svelte"



const storedToken = sessionStorage.getItem('token');
const requireLogin = async () => !!storedToken ? true : false


export const routes = {

    "/login" : Login,
    "/" : Slash,
    "/Order" : Order,

    "/dashboard"  : wrap({
        component: Home,
        conditions: [requireLogin]
    }),
    "/sale/new" : wrap({
        component: NewSale,
        conditions: [requireLogin]
    }),
    "/inventory" : wrap({
        component: Inventory,
        conditions: [requireLogin]
    }),
    "/supplier" : wrap({
        component: Suppliers,
        conditions: [requireLogin]
    }),
    "/staff" : wrap({
        component: Staff,
        conditions: [requireLogin]
    }),
    "/invoice/:id" : wrap({
        component: Invoice,
        conditions: [requireLogin]
    }),
    "/prescription/:id" : wrap({
        component : Approval,
        conditions : [requireLogin]
    }),
    "/error/device" : ScreenError
}
