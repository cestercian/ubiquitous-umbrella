type Pizza = {
    id:number,
    name:string,
    price:number,
}

type Order = {
    id: number,
    pizza: Pizza,
    status: "ordered"|"unordered"|"completed",
}

const menu: Pizza[] = [
    { id: 1, name: "Margherita", price: 8 },
    { id: 2, name: "Pepperoni", price: 10 },
    { id: 3, name: "Hawaiian", price: 10 },
    { id: 4, name: "Veggie", price: 9 },
]

let cashInRegister = 100
let nextOrderId = 1
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza): void {
    menu.push(pizzaObj)
}

/**
 * Challenge: add explicit return types to the rest of our functions
 */

function placeOrder(pizzaName: string) : Order {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
        //console.error(`${pizzaName} does not exist in the menu`)
        throw new TypeError(`${pizzaName} is not in the menu`)
    }
    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: "ordered" }
    orderQueue.push(newOrder)
    return newOrder
}

function completeOrder(orderId: number) :Order {
    const order = orderQueue.find(order => order.id === orderId)
    if (!order) {
        console.error(`${orderId} was not found in the orderQueue`)
        throw Error
    }

    order.status = "completed"
    return order
}

export function getPizzaDetail(identifier: string | number): Pizza | undefined {
    if (typeof identifier === "string") {
        return menu.find(pizza => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else { // noinspection SuspiciousTypeOfGuard
        if (typeof identifier === "number") {
                return menu.find(pizza => pizza.id === identifier)
            } else {
                throw new TypeError("Parameter `identifier` must be either a string or a number")
            }
    }
}

addNewPizza({ id: 4, name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ id: 5, name: "BBQ Chicken", price: 12 })
addNewPizza({ id: 6, name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)
console.log(getPizzaDetail(1))