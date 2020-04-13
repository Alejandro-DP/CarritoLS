//variables 
const carrito = document.getElementById('carrito');
const Cursos = document.getElementById('lista-cursos');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.getElementById('vaciar-carrito');


//#region evemtos

CargarEventLis();
function CargarEventLis(){
    //delegation de agregar al carrito 
    Cursos.addEventListener('click', comprarCurso);
    //delete carrito
    carrito.addEventListener('click',elimimarCurso);
    //vaciarCar
    vaciarCarrito.addEventListener('click', vaciarCar);
    //cargar templ
    document.addEventListener('DOMContentLoaded', leerLS);
}

//#endregion

//funciones

function comprarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
    

        LeerDatosCurso(curso);
    }
}
//leer datos del curso 
function LeerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);

}
//insertar el html
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML =`
        <td>
            <img src="${curso.imagen}"width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    
    `;
    listaCarrito.appendChild(row);
    //agregarLS
    agreegarLS(curso);

}
//elimina curso del DOM
function elimimarCurso(e){
    e.preventDefault();
    let curso,
        cursoId;
    
    if (e.target.classList.contains('borrar-curso') ){
        e.target.parentElement.parentElement.remove();
      curso = e.target.parentElement.parentElement;
      cursoId = curso.querySelector('a').getAttribute('data-id');

      
    }
    eliminarCursoLS(cursoId);
}
//btnVaciarDOm
function vaciarCar(){
  

    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
    
    vaciarLocalStorage();
    return false;
}
function agreegarLS(curso){
    let cursos;

    cursos = obteneerLS();

    cursos.push(curso);

    localStorage.setItem('cursos',JSON.stringify(cursos));

}
function obteneerLS(){
    let cursosLS;
    //comprobar si hay en Ls
    if (localStorage.getItem('cursos') == null){
       cursosLS = [];
    }
    else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS
}
function leerLS(){
    let cursosLS;
    cursosLS = obteneerLS();
    
    
    cursosLS.forEach(function(curso) {
        const row = document.createElement('tr');
    row.innerHTML =`
        <td>
            <img src="${curso.imagen}"width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    
    `;
    listaCarrito.appendChild(row);
    });
}
function eliminarCursoLS(curso){
    let cursosLS;
    // Obtenemos el arreglo de cursos
    cursosLS = obteneerLS();
    // Iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1);
        }
    });
   localStorage.setItem('cursos',JSON.stringify(cursosLS) );
}
function vaciarLocalStorage(){
    localStorage.clear();
}