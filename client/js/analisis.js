construirSemana = function(primerDia){
	var lab = [ 
		"Domingo " + primerDia,
		"Lunes " + (primerDia+1),
		"Martes " + (primerDia+2),
		"Miércoles " + (primerDia+3),
		"Jueves " + (primerDia+4),
		"Viernes " + (primerDia+5),
		"Sábado " + (primerDia+6) 
	]

	return lab;
}

construirLineChart = function(ejex, tipo, arreglo){

	var lin = document.getElementById("lineChart");
	var linea = new Chart(lin, {
	    type: 'line',
	    data: {
		    labels: ejex,
		    datasets: [{
	            label: tipo,
	            fill: true,
	            lineTension: 0.1,
	            backgroundColor: "rgba(75,192,192,0.4)",
	            borderColor: "rgba(75,192,192,1)",
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: "rgba(75,192,192,1)",
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 5,
	            pointHoverRadius: 8,
	            pointHoverBackgroundColor: "rgba(75,192,192,1)",
	            pointHoverBorderColor: "rgba(220,220,220,1)",
	            pointHoverBorderWidth: 2,
	            pointRadius: 1,
	            pointHitRadius: 10,
	            data: arreglo,
	            spanGaps: false,
		    }]
		},
		options: {
			legend: {
			    display: false,
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: tipo
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		} 
	});
}

construirBarChart = function(ejex, tipo, arreglo){

	var bar = document.getElementById("barChart");
	var barra = new Chart(bar, {
		type: 'bar',
		data: {
		    labels: ejex,
		    datasets: [{
		    	label: tipo,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1,
	            data: arreglo,
	        }]
		},
		options: {
			legend: {
			    display: false,
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: tipo
					},
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
}

construirPieChart = function(nombreProyectos, pagoPorProyecto){

	var pi = document.getElementById("pieChart");
	var pie = new Chart(pi, {
		type: 'pie',
		data: {
		    labels: nombreProyectos,
		    datasets: [
		        {
		            data: pagoPorProyecto,
		            backgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56",
		                "#60AC15",
		                "#9515AC"
		            ],
		            hoverBackgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56",
		                "#60AC15",
		                "#9515AC"
		            ]
		        }]
		}
	});
}

ISOtoDate = function(fecha){
	var date = new Date(fecha);
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var dt = date.getDate();

	if (dt < 10) {
	  dt = '0' + dt;
	}
	if (month < 10) {
	  month = '0' + month;
	}

	return year+'-' + month + '-'+dt;
	//console.log(fechaFunc.slice(8,10))
}

obtenerDatosTareas = function(primerDia, tareas){

	var sesiones = [];

	for(var i = 0; i < tareas.length; i++)
	{
		for(var j = 0; j < tareas[i].pomodorosUsados.length; j++)
		{
			var pomo = {}

			var fecha = ISOtoDate(tareas[i].pomodorosUsados[j].fecha);

			fechaSlice = fecha.slice(8,10);

			if(fechaSlice >= primerDia && fechaSlice <= (primerDia+6)){ //esta es la parte que hay que checar no siempre puede funcionar
				pomo.fecha = fechaSlice;
			}
			
			pomo.pomodoroTiempo = tareas[i].pomodorosUsados[j].pomodoro;
		
			sesiones.push(pomo);
		}
	}

	return sesiones;
}

obtenerNombreProyectos = function(proyectos){
	var nombres = [];

	for(var i = 0; i < proyectos.length; i++)
	{
		nombres.push(proyectos[i].nombre);
	}

	return nombres;
}

obtenerDatosProyectos = function(primerDia, tareas, proyectos){
	var datos = [];

	for(var i = 0; i < proyectos.length; i++)
	{
		for(var j = 0; j < tareas.length; j++)
		{
			if(proyectos[i].tareas == tareas[j]._id)
			{
				var data = [];
				for(var k = 0; k < tareas[j].pomodorosUsados.length; k++)
				{
					var pomo = {}

					var fecha = ISOtoDate(tareas[j].pomodorosUsados[k].fecha);

					fechaSlice = fecha.slice(8,10);

					if(fechaSlice >= primerDia && fechaSlice <= (primerDia+6)){ //esta es la parte que hay que checar no siempre puede funcionar
						pomo.fecha = fechaSlice;
					}
					
					pomo.pomodoroTiempo = tareas[j].pomodorosUsados[k].pomodoro;
				
					data.push(pomo);
				}
				datos.push(data);
			}
		}
	}

	return datos;
}

$( document ).ready(function() {

	$("#analisis").scope().getTareas(function(tareas){
	$("#analisis").scope().getProyectos(function(proyectos){ 

		var fechaHoy = new Date; //obtener la fecha de hoy
		var primerDia = fechaHoy.getDate() - fechaHoy.getDay();
		var semana = construirSemana(primerDia); //checar esto tambien
		var datosTareas = obtenerDatosTareas(primerDia, tareas);

		var nombreProyectos = obtenerNombreProyectos(proyectos);
		var datosProyecto = obtenerDatosProyectos(primerDia, tareas, proyectos);

		sesionChart = function(){
			$("#tiempo").removeClass("active");
			$("#sesion").addClass("active");

			// ---------------- Tareas -----------------

			var sesionesPorDia = {
					domingo: 0,
					lunes: 0,
					martes: 0,
					miercoles: 0,
					jueves: 0,
					viernes: 0,
					sabado: 0
				}

			for(var i = 0; i < datosTareas.length; i++)
			{
				if(datosTareas[i].fecha == primerDia)
					sesionesPorDia.domingo++;

				if(datosTareas[i].fecha == primerDia+1)
					sesionesPorDia.lunes++;

				if(datosTareas[i].fecha == primerDia+2)
					sesionesPorDia.martes++;

				if(datosTareas[i].fecha == primerDia+3)
					sesionesPorDia.miercoles++;

				if(datosTareas[i].fecha == primerDia+4)
					sesionesPorDia.jueves++;

				if(datosTareas[i].fecha == primerDia+5)
					sesionesPorDia.viernes++;

				if(datosTareas[i].fecha == primerDia+6)
					sesionesPorDia.sabado++;
			}

			var sesionesArreglo = [];
			sesionesArreglo.push(sesionesPorDia.domingo);
			sesionesArreglo.push(sesionesPorDia.lunes);
			sesionesArreglo.push(sesionesPorDia.martes);
			sesionesArreglo.push(sesionesPorDia.miercoles)
			sesionesArreglo.push(sesionesPorDia.jueves);
			sesionesArreglo.push(sesionesPorDia.viernes);
			sesionesArreglo.push(sesionesPorDia.sabado);
			
			construirLineChart(semana, " # de Sesiones al día", sesionesArreglo);

			// ---------------- Proyectos -----------------

			sesionesArreglo = [];
			for(var i = 0; i < datosProyecto.length; i++)
				sesionesArreglo.push(datosProyecto[i].length);

			construirBarChart(nombreProyectos, " # de sesiones por proyecto", sesionesArreglo);
		}

		tiempoChart = function(){
			$("#sesion").removeClass("active");
			$("#tiempo").addClass("active");

			minutosPorDia = {
				domingo: 0,
				lunes: 0,
				martes: 0,
				miercoles: 0,
				jueves: 0,
				viernes: 0,
				sabado: 0
			}

			for(var i = 0; i < datosTareas.length; i++)
			{
				if(datosTareas[i].fecha == primerDia)
					minutosPorDia.domingo += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+1)
					minutosPorDia.lunes += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+2)
					minutosPorDia.martes += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+3)
					minutosPorDia.miercoles += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+4)
					minutosPorDia.jueves += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+5)
					minutosPorDia.viernes += datosTareas[i].pomodoroTiempo;

				if(datosTareas[i].fecha == primerDia+6)
					minutosPorDia.sabado += datosTareas[i].pomodoroTiempo;
			}

			var minutosArreglo = [];
			minutosArreglo.push(minutosPorDia.domingo);
			minutosArreglo.push(minutosPorDia.lunes);
			minutosArreglo.push(minutosPorDia.martes);
			minutosArreglo.push(minutosPorDia.miercoles);
			minutosArreglo.push(minutosPorDia.jueves);
			minutosArreglo.push(minutosPorDia.viernes);
			minutosArreglo.push(minutosPorDia.sabado);

			construirLineChart(semana, " # de minutos al día", minutosArreglo);

			// ---------------- Proyectos -----------------

			minutosArreglo = [];
			for(var i = 0; i < datosProyecto.length; i++)
			{
				var suma = 0;
				for(var j = 0; j < datosProyecto[i].length; j++)
				{
					suma += datosProyecto[i][j].pomodoroTiempo;
				}
				minutosArreglo.push(suma);
			}

			construirBarChart(nombreProyectos, " # de minutos por proyecto", minutosArreglo);
		}
		sesionChart();

		var pagoPorProyecto = [];
		for(var i = 0; i < datosProyecto.length; i++)
		{
			var suma = 0;
			for(var j = 0; j < datosProyecto[i].length; j++)
			{
				suma += datosProyecto[i][j].pomodoroTiempo;
			}
			suma = (suma/60) * proyectos[i].pagoPorHora;
			pagoPorProyecto.push(suma);
		}

		for(var i = 0; i < nombreProyectos.length; i++)
			nombreProyectos[i] = "Pago por hora " + nombreProyectos[i]

		construirPieChart(nombreProyectos, pagoPorProyecto);
	});
	}); 	
});