'use strict'

const orderFormElem = document.getElementById('orderForm');
const previousOrdersUlElem = document.getElementById('perviousOrders');

function Coffee(name, size, milk, drinkType) {
    this.name = name;
    this.size = size;
    this.milk = milk;
    this.drinkType = drinkType;

    Coffee.all.push(this);
}

Coffee.all = [];

Coffee.prototype.renderCoffee = function () {
    const previousOrdersLiElem = document.createElement('li');
    previousOrdersUlElem.appendChild(previousOrdersLiElem);

    const previousOrderPElem = document.createElement('p');
    previousOrdersLiElem.appendChild(previousOrderPElem);

    previousOrderPElem.textContent = `${this.name} ordered a ${this.size} oz ${this.drinkType} with ${this.milk} milk`
}

function renderAllCoffee() {

    previousOrdersUlElem.innerHTML = '';

    for (let drink of Coffee.all) {
        drink.renderCoffee()
    }
}

function getOrders() {
    let orders = localStorage.getItem('order')
    console.log(parsedOrders);

    if (orders !== null) {
        let parsedOrders = JSON.parse(orders);
        // they aren't coffee objects anymore
        // we need to put them back through the constructor to organize it
        for (let drink of parsedOrders) {
            new Coffee(drink.name, drink.size, drink.milk, drink.drinkType);
        }
    }
}

function setOrders() {
    console.log(Coffee.all)
    let stringifiedOrders = JSON.stringify(Coffee.all);
    console.log(stringifiedOrders);
}
function handleSubmit(event) {
    event.preventDefault();
    // get back all of my input info from the target
    let name = event.target.name.value;
    let size = event.target.size.value;
    let milk = event.target.milk.value;
    let drinkType = event.target.drinkType.value;
    new Coffee(name, size, milk, drinkType);
    // organize it
    // render all coffees to the page
    setOrders();
    renderAllCoffee();
    event.target.reset();
}
getOrders();
orderFormElem.addEventListener('submit', handleSubmit);
