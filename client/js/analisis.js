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

construirChart = function(ejex, tipo){

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
	            data: [65, 59, 80, 81, 56, 55, 40],
	            spanGaps: false,
		    }]
		},
		options: {
			legend: {
			    display: false,
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true
					}
				}]
			}
		} 
	});

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
	            data: [65, 59, 80, 81, 56, 55, 40],
	        }]
		},
		options: {
			legend: {
			    display: false,
			},
			scales: {
				yAxes: [{
					display: true,
					ticks: {
						beginAtZero: true
					}
				}]
			}
		} 
	});
}

var fechaHoy = new Date; //obtener la fecha de hoy
var primerDia = fechaHoy.getDate() - fechaHoy.getDay(); //dia del mes

var semana = construirSemana(primerDia);

sesionChart = function(){
	construirChart(semana, " # de Sesiones");
	$("#tiempo").removeClass("active");
	$("#sesion").addClass("active");
}

tiempoChart = function(){
	construirChart(semana, " # de horas");
	$("#sesion").removeClass("active");
	$("#tiempo").addClass("active");	
}	

sesionChart();

  //$("#temporizador").scope().obtenerTiempoPomo(function (pomoTime)


var pi = document.getElementById("pieChart");
var pie = new Chart(pi, {
	type: 'pie',
	data: {
	    labels: [
	        "Red",
	        "Blue",
	        "Yellow"
	    ],
	    datasets: [
	        {
	            data: [300, 50, 100],
	            backgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ],
	            hoverBackgroundColor: [
	                "#FF6384",
	                "#36A2EB",
	                "#FFCE56"
	            ]
	        }]
	}
});