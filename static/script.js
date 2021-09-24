console.log("javascript cargado");
document.addEventListener('DOMContentLoaded', ()=>{
    console.log("conteniddo cargado :D");
    window.onpopstate = e =>{
        const data = e.state;
        document.title = data.title;
        document.getElementById("contenidoDinamico").innerHTML = data.text;
    }
})


function mostrarHTML(ruta){
    let request = new XMLHttpRequest();
    request.open('GET', ruta);

    request.onload = () =>{
        if(request.status == 200){
            let res = request.responseText;
            let divContenido  = document.getElementById("contenidoDinamico");
            divContenido.innerHTML = res;
            history.pushState({"title": ruta, "text": divContenido.innerHTML}, ruta, ruta);
            return false;
        }else{
            alert("Status: " + request.status + ", algo salió mal, aiuda.");
            return false;
        }
    };
    request.send();

}

const agregar = (form) =>{
    let data = new FormData(form);
    let request = new XMLHttpRequest();
    request.open('POST', "/agregar");

    request.onload = () =>{
        if(request.status == 200){

            document.querySelectorAll("input").forEach((input)=>{
                input.value="";
            })
            alert("Agregado con éxito!!");
            let res = request.responseText;
            let divContenido  = document.getElementById("contenidoDinamico");
            divContenido.innerHTML = res;
            history.pushState({"title": ruta, "text": divContenido.innerHTML}, ruta, ruta);
            return false;
        }else{
            alert("Status: " + request.status + ", algo salió mal, aiuda.");
            return false;
        }
    };
    request.send(data);
}