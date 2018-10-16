document.getElementById('btnInicio').addEventListener('click', loadChart);

document.getElementById('btnPrecios2').addEventListener('click', loadProducts2);
document.getElementById('btnVentas2').addEventListener('click', loadVentasMes2);

function limpiarContenedores(){
  $("#ChartContainer").css({'visibility':'hidden'});
  document.getElementById('container').innerHTML ='';
}


function loadProducts2(){

  limpiarContenedores();

  fcn_hablar('Cargando lista de precios');
  const products = listaproductos;

      let output = '';
      var tabla = '<div class="card table-responsive">' +
        '<table class="table table-card" id="tabla"><thead class="thead-light">' + 
        '<tr><td>Producto</td>' +
        '<td>Medida</td>' + 
        '<td>Costo</td>' + 
        '<td>Precio</td>' + 
        '<td>Existencia</td></tr>' + 
        '</thead>' + 
        '<tbody>';

      products.forEach(function(product){
        output += `
        <tr>
          <td>${product.DESPROD}</td>
          <td>${product.CODMEDIDA}</td>
          <td>${product.COSTO}</td>
          <td>${product.PRECIO}</td>
          <td>${product.SALDO}</td>
        </tr>
      `;
      });

      let result = '';
      
      let tablafooter = '</tbody><tfoot>' + 
      '<tr><td>Producto</td>' +
      '<td>Medida</td>' + 
      '<td>Costo</td>' + 
      '<td>Precio</td>' + 
      '<td>Existencia</td></tr>' + 
      '</tfoot></table></div>';

      result = tabla + output + tablafooter;

      document.getElementById('container').innerHTML = result;
       
      var table = $('#tabla').DataTable();
      //var cl = document.getElementsByClassName("paginate_button current")
      
      
     }


function loadVentasMes2() {
 
  limpiarContenedores();

      const ventasmes = listaventas

      let output = '';

      var cardheader = '<div class="col-xl-6 col-lg-6">' +
                          '<div class="card card-stats mb-4 mb-xl-0">' +
                            '<div class="card-body">' +
                              '<div class="row">' +
                                '<div class="col">';
                   
      var cardfooter = '</div>' +
                      '<div class="col-auto">' +
                        '<div class="icon icon-shape bg-danger text-white rounded-circle shadow">' +
                          '<i class="fas fa-chart-bar"></i>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                      '<p class="mt-3 mb-0 text-muted text-sm">' +
                      '</p>' +
                  '</div>' +
                '</div>' +
              '</div>';

      ventasmes.forEach(function(ventas){
        output += cardheader +
        `<h5 class="card-title text-uppercase text-muted mb-0">Día: ${ventas.DIA}</h5>
        <span class="h2 font-weight-bold mb-0">${ventas.TOTALPRECIO}</span>` + cardfooter;
      });
           
      document.getElementById('container').innerHTML = output;
      
    }
  
function loadProducts(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', './data/productos.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const products = JSON.parse(this.responseText);

      let output = '';
      var tabla = '<div class="card shadow table-responsive">' +
        '<table class="table"><thead class="thead-light">' + 
        '<tr><td>Producto</td>' +
        '<td>Medida</td>' + 
        '<td>Costo</td>' + 
        '<td>Precio</td>' + 
        '<td>Existencia</td></tr>' + 
        '</thead>' + 
        '<tbody>';

      products.forEach(function(product){
        output += `
        <tr>
          <td>${product.DESPROD}</td>
          <td>${product.CODMEDIDA}</td>
          <td>${product.COSTO}</td>
          <td>${product.PRECIO}</td>
          <td>${product.SALDO}</td>
        </tr>
      `;
      });

      let result = '';
      
      let tablafooter = '</tbody></table></div>';

      result = tabla + output + tablafooter;

      document.getElementById('container').innerHTML = result;
       
    }
      
  }

  xhr.send();
}



function loadVentasMes(e) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', './data/ventames.json', true);

  xhr.onload = function(){
    if(this.status === 200) {
      // console.log(this.responseText);

      const ventasmes = JSON.parse(this.responseText);

      let output = '';

      var cardheader = '<div class="col-xl-6 col-lg-6">' +
                          '<div class="card card-stats mb-4 mb-xl-0">' +
                            '<div class="card-body">' +
                              '<div class="row">' +
                                '<div class="col">';
                   
      var cardfooter = '</div>' +
                      '<div class="col-auto">' +
                        '<div class="icon icon-shape bg-danger text-white rounded-circle shadow">' +
                          '<i class="fas fa-chart-bar"></i>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                      '<p class="mt-3 mb-0 text-muted text-sm">' +
                      '</p>' +
                  '</div>' +
                '</div>' +
              '</div>';

      ventasmes.forEach(function(ventas){
        output += cardheader +
        `<h5 class="card-title text-uppercase text-muted mb-0">Día: ${ventas.DIA}</h5>
        <span class="h2 font-weight-bold mb-0">${ventas.TOTALPRECIO}</span>` + cardfooter;
      });
           
      document.getElementById('container').innerHTML = output;
      
    }
  }

  xhr.send();
}


//var SalesChart = (
function loadChart() {

  limpiarContenedores();

  $("#ChartContainer").css({'visibility':'visible'});

	// Variables

	var $chart = $('#chart-sales2');

	// Methods

	function init($chart) {

		var salesChart = new Chart($chart, {
			type: 'line',
			options: {
				scales: {
					yAxes: [{
						gridLines: {
							color: Charts.colors.gray[900],
							zeroLineColor: Charts.colors.gray[900]
						},
						ticks: {
							callback: function(value) {
								if (!(value % 10)) {
									return 'Q' + value + 'k';
								}
							}
						}
					}]
				},
				tooltips: {
					callbacks: {
						label: function(item, data) {
							var label = data.datasets[item.datasetIndex].label || '';
							var yLabel = item.yLabel;
							var content = '';

							if (data.datasets.length > 1) {
								content += '<span class="popover-body-label mr-auto">' + label + '</span>';
							}

							content += '<span class="popover-body-value">Q' + yLabel + 'k</span>';
							return content;
						}
					}
				}
			},
			data: {
				labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep','Oct'],
				datasets: [{
					label: 'Performance',
					data: [50, 70, 40, 50, 35, 40, 55, 60, 60, 70, 15]
				}]
			}
		});

		// Save to jQuery object

		$chart.data('chart', salesChart);

	};

	// Events

	if ($chart.length) {
		init($chart);
    }
};

