function actualizar(id, label)
{
    var range = document.getElementById(id);
    document.getElementById(label).innerHTML = range.value + " minutos";  
}

function load()
{
	var rangos = document.getElementsByName('rango');
	var labels = document.getElementsByName('labelI'); 
	  
	for(i=0; i<3; i++)
	{
	    console.log(labels[i].id + " =" + rangos[i].id);
	    labels[i].innerHTML = rangos[i].value + " minutos";
	}  
}