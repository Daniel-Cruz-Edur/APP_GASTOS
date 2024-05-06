/* Variables de los selectores */

const formulario = document.getElementById('agregar-gasto');
const listadogastos = document.querySelector('#gastos ul');

/* Agregar, preguntar y eliminar. */ /* Estas van a ser la acciones que va a ejecutar el programa. */

EventListener();

function EventListener()
{
    document.addEventListener('DOMContentLoaded', Preguntar_presupuesto);
    formulario.addEventListener('submit', agregarGasto)
    listadogastos.addEventListener('click', eliminarGasto)
}

/* Creando clases */
class Presupuesto
{
    constructor(presupuesto)
    {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevogasto(gasto)
    {
        this.gastos = [...this.gastos, gasto];
        this.calcular_restante();
    }

    calcular_restante()
    {
        const gastado = this.gastos.reduce((total, gasto) => total+gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id)
    {
        this.gastos= this.gastos - gastado.filter(gasto => gasto.id.toString() !== 1);
        this.calcular_restante();
    }
}

class UI 
{
    insertarPresupuesto(cantidad)
    {
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }
}

const ui = new UI();
let presupuesto;

function Preguntar_presupuesto()
{
    const pregunta = prompt("¿Cuál es tú presupuesto?. ");

    if (pregunta === '' || pregunta === null || isNaN(pregunta) || pregunta<= 0) 
    {
        window.location.reload();
    }

    presupuesto = new Presupuesto(pregunta);

    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto()
{

}

function eliminarGasto()
{

}