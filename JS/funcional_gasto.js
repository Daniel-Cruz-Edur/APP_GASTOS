/* Variables de los selectores */

const formulario = document.getElementById('agregar-gasto');
const listadogastos = document.querySelector('#gastos ul');

/* Agregar, preguntar y eliminar. */ /* Estas van a ser la acciones que va a ejecutar el programa. */

eventListeners();

function eventListeners()
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

    nuevo_Gasto(gasto)
    {
        this.gastos = [...this.gastos, gasto];
        this.calcular_restante();
    }

    eliminarGasto(id)
    {
        this.gastos= this.gastos.filter(gasto => gasto.id.toString() !== id);
        this.calcular_restante();
    }

    calcular_restante()
    {
        const gastado = this.gastos.reduce((total, gasto) => total+gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

}

class UI 
{
    insertarPresupuesto(cantidad)
    {
        document.querySelector('#total').textContent = cantidad.presupuesto;
        document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje, tipo)
    {
        const div_Mensaje = document.createElement('div');
        div_Mensaje.classList.add('text-center', 'alert');

        /* Si es de tipo error que agregé una clase */

        if (tipo == 'error')
        {
            div_Mensaje.classList.add('alert-danger');
        }
        else
        {
            div_Mensaje.classList.add('alert-success');
        }

        div_Mensaje.textContent = mensaje;

        /* Insertar el en DOM */

        document.querySelector('.contenido.gastos').insertBefore(div_Mensaje, formulario);

        /* Eliminar la alerta déspues de 5 segundos. */
        setTimeout( () => {
            document.querySelector('.gastos .alert').remove();
        }, 3000);

    }

    agregarGastoAlListado(gastos)
    {
        this.limpiarHTML();

        /* Aca iteramos los gastos que se van a agregar. */
        gastos.forEach(gasto => {

            const {nombre, cantidad, id} = gasto;


            const nuevo_Gasto = document.createElement('li');
            nuevo_Gasto.className = 'list-group-item d-flex justify-content-between aling-items-center';

            nuevo_Gasto.dataset.id = id;

            /* Insertar el gasto en el HTML. */
            nuevo_Gasto.innerHTML = `${nombre} <span class="badge-primary badge-pill">$ ${cantidad}</span>`;
            
            /* Crear el boton de borrar gastos. */

            const btn_Borrar = document.createElement('button');
            btn_Borrar.classList.add('btn', 'btn-danger', 'borrar_gasto');
            btn_Borrar.textContent = 'Borrar';
            nuevo_Gasto.appendChild(btn_Borrar);

            /* Insertar en el HTML. */
            listadogastos.appendChild(nuevo_Gasto);

        });
        
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

function agregarGasto(e)
{
    /* Leer el formulario */
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    /* Comprobar si los campos estan vacios. */

    if (nombre === '' || cantidad === '')
    {
        ui.imprimirAlerta('Ambos campos son obligatorios. ', 'error');
    }
    else if (cantidad <= 0 || isNaN(cantidad))
    {
        ui.imprimirAlerta('Cantidad no valida', 'error');
    }
    else
    {
        const gasto = {nombre, cantidad, id:Date.now()};

        /* Agregar el nuevo gasto. */

        presupuesto.nuevo_Gasto(gasto);

        ui.imprimirAlerta('Gasto valido', 'Correcto')

        const {gastos} = presupuesto;
        ui.agregarGastoAlListado(gastos);

        ui.comprobarpresupuesto(presupuesto);
        
        const {restante} = presupuesto;

        ui.actualizarpresupuesto(restante);

        formulario.reset();

    }

    //Comprobar presupuesto restante.
    actualizarpresupuesto(actualizar)
    {
        document.querySelector('span#restante').textContent = restante;
    }
    comprobarpresupuesto(presupuestoobj)
    {
        const {presupuesto, restante} = presupuestoobj;
        const restantediv = document.querySelector('.restante');

        console.log(restante);
        console.log(presupuesto);

        if ( (presupuesto/4) > restante)
        {
            restantediv.classList.remove('alert-success', 'alert-warning');
            restantediv.classList.add('alert-danger');
        }
        else if ( (presupuesto/2) > restante )
        {
            restantediv.classList.remove('alert-success');
            restantediv.classList.add('alert-warning');
        }
        else
        {
            restantediv.classList.remove('alert-danger', 'alert-warning');
            restantediv.classList.add('alert-success');
        }

        if (restante <= 0)
        {
            ui.imprimirAlerta('El presupuesto se ha agotado.', 'ERROR');
            formulario.querySelector('button[type="submit"]').disabled = True;
        }

        limpiarHTML()
        {
            while (listadogastos.firstChild)
            {
                listadogastos.removeChild(listadogastos.firstChild);
            }
        }
    }
        
}



function eliminarGasto(e)
{
    if (e.target.classList.contains('borrar-gasto'))
    {
        presupuesto.eliminarGasto(id);

        ui.comprobarpresupuesto(presupuesto);
        const {restante} = presupuesto;
        ui.actualizarpresupuesto(restante);


        e.target.parentElement.remove();

    }
}