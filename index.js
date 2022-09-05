const reservas = [
  {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 2,
      desayuno: true
  },
  {
      tipoHabitacion: "standard",
      pax: 1,
      noches: 7,
      desayuno: false
  },
  {
      tipoHabitacion: "suite",
      pax: 2,
      noches: 2,
      desayuno: true
  }
];

class Reserva {
  constructor() {
    this._reservas = [];
    this._subtotal = 0;
    this._total = 0;
  }

  roomType(type) {
    if (type === "standard") {
      return 100;
    } else {
      return 150;
    }
  }

  addPerson(person) {
    return person > 1 ? 40 * (person - 1) : 0;
  }

  getBreakfast(breakfast) {
    return breakfast == true ? 15 : 0;
  }

  getSubtotal() {
    this._subtotal = reservas.reduce(
      (acc, { tipoHabitacion, pax, noches, desayuno }) =>
        acc +
        noches *
          (this.roomType(tipoHabitacion) +
            this.addPerson(pax) +
            this.getBreakfast(desayuno) * pax),
      0
    );
  }

  getTotalPrice() {
    const IVA = 1.21;
    this._total = reservas.reduce(
      (acc, { tipoHabitacion, pax, noches, desayuno }) =>
        acc +
        noches *
          (this.roomType(tipoHabitacion) +
            this.addPerson(pax) +
            this.getBreakfast(desayuno) * pax) *
          IVA,
      0
    );
  }

  get subtotal() {
    return this._subtotal.toFixed(1);
  }

  get total() {
    return this._total.toFixed(1);
  }

  set reservas(añadirReserva) {
    this._reservas = añadirReserva;
    this.getSubtotal();
    this.getTotalPrice();
  }
}

class PrivateHost extends Reserva {
  constructor() {
    super();
  }
}

class TourOperator extends Reserva {
  constructor() {
    super();
  }

  RoomType(type) {
    return (type = 100);
  }

  get total() {
    return (this._total * 0.85).toFixed(1);
  }
}

const privateHost = new PrivateHost();
const tourOperator = new TourOperator();



console.log("--------------🏨🌴🌊Hotel Las Arenas🏨🌴🌊-------------");

privateHost.reservas = reservas;
console.log("|Subtotal para cliente -->", privateHost.subtotal + "€|");
console.log("|Total para cliente con impuestos añadidos (IVA) -->", privateHost.total + "€|");

console.log("--------------🌊🏨🌴Hotel Las Arenas🌊🏨🌴--------------");

tourOperator.reservas = reservas;
console.log("|Subtotal contratado con touroperador -->", tourOperator.subtotal + "€|");
console.log("|Total contratado con touroperador -->", tourOperator.total + "€|");

console.log("--------------🌴🌊🏨Hotel Las Arenas🌴🌊🏨--------------");

console.log("|✋🔔🛎👩Consulte si desea contratar excursiones✋🔔🛎👩|")

