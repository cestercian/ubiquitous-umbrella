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

let cashInRegister = 100
let nextOrderId = 1
let nextPizzaId = 1

const menu: Pizza[] = [
    { id: nextPizzaId++, name: "Margherita", price: 8 },
    { id: nextPizzaId++, name: "Pepperoni", price: 10 },
    { id: nextPizzaId++, name: "Hawaiian", price: 10 },
    { id: nextPizzaId++, name: "Veggie", price: 9 },
]

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza,"id">): void {
    const pizza = {id: nextPizzaId++,...pizzaObj,}
    menu.push(pizza)
}

function placeOrder(pizzaName: string) : Order {
    const selectedPizza = menu.find(pizzaObj => pizzaObj.name === pizzaName)
    if (!selectedPizza) {
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

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 })
addNewPizza({ name: "BBQ Chicken", price: 12 })
addNewPizza({ name: "Spicy Sausage", price: 11 })

placeOrder("Chicken Bacon Ranch")
completeOrder(1)

console.log("Menu:", menu)
console.log("Cash in register:", cashInRegister)
console.log("Order queue:", orderQueue)
console.log(getPizzaDetail(1))