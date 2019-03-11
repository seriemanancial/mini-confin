
// init
$(function() {
	popularTabela();
}());

// Objeto Conta
var Conta = function(id, nome, valor, ano, mes, dia, tipo)
{
	this.Id = id;
	this.Nome = nome;
	this.Valor = valor;
	this.Ano = ano;
	this.Mes = mes;
	this.Dia = dia;
	this.Tipo = tipo;
}

function numeroParaMoeda(n, c, d, t)
{
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function addConta()
{				
	if(localStorage.getItem("contasDB")) {
		var contas = JSON.parse(localStorage.getItem("contasDB"));
		contas.push(popularObjeto());
		
		localStorage.setItem("contasDB", JSON.stringify(contas));
		popularTabela();
	}else{
		var contas = [];
		contas.push(popularObjeto());
		
		localStorage.setItem("contasDB", JSON.stringify(contas));
		popularTabela();
	}
	
	
}

function formataData() {
	var vencimento = document.getElementById("vencimento").value;
	return vencimento.substr(8, 2) + "/" + vencimento.substr(5, 2) + "/" + vencimento.substr(0, 4);
}

function retornaId(){
	if(JSON.parse(localStorage.getItem("contasDB"))){
		var index = JSON.parse(localStorage.getItem("contasDB")).length;
		
		if(index == 0)
			return 1;
		
		return ++JSON.parse(localStorage.getItem("contasDB"))[index - 1].Id;
	}
	
	return 1;
}

function popularObjeto(){
	var id = retornaId();
	var nome = document.getElementById("nome").value;
	var valor = document.getElementById("valor").value;
	var ano = document.getElementById("ano").value; //formataData();
	var mes = document.getElementById("mes").value; //formataData();
	var dia = document.getElementById("dia").value; //formataData();
	var tipo = operacao=='-' ? 'D' : 'C';
	
	return new Conta(id, nome, numeroParaMoeda(valor,2,'.',''), ano , parseInt(mes)+1, dia, tipo);
}

function limparCampos() {
	document.getElementById("nome").value = "";
	document.getElementById("valor").value = "";

	var selectAno=document.getElementById("ano");
	var selectMes=document.getElementById("mes");
	var selectDia=document.getElementById("dia");
	
		selectDia.options[28].style.display = 'inline';
		selectDia.options[29].style.display = 'inline';
		selectDia.options[30].style.display = 'inline';
		
	if (selectMes.selectedIndex == 1 ) { 
		if(parseInt(selectAno.value)%4>0) selectDia.options[28].style.display = 'none';
		selectDia.options[29].style.display = 'none';
		selectDia.options[30].style.display = 'none';
	}
	
	if (selectMes.selectedIndex == 3 || selectMes.selectedIndex == 5 || selectMes.selectedIndex == 8 || selectMes.selectedIndex == 10 ) { 
		selectDia.options[30].style.display = 'none';
	}
	
 }

function popularTabela()
{
	document.getElementById("linhas").innerHTML = "";
	document.getElementById("entrada").innerHTML = "";
	document.getElementById("saida").innerHTML = "";
	document.getElementById("saldo").innerHTML = "";
	var dados = JSON.parse(localStorage.getItem("contasDB"));
	
	if(dados == null) return;
	
	var table = document.getElementById("linhas");
	var zNome = '';
	var zValor = '';
	var item = 1;
	
	for(i = 0; i < dados.length; i++){
		
		if(dados[i].Ano == document.getElementById("ano").value && dados[i].Mes == parseInt(document.getElementById("mes").value)+1) {
			var row = table.insertRow();
			var cell1 = row.insertCell();
			var cell2 = row.insertCell();
			var cell3 = row.insertCell();
			var cell4 = row.insertCell();
			var cell5 = row.insertCell();
			var cell6 = row.insertCell();
			var cell7 = row.insertCell();
			
			cell1.innerHTML = item;
			cell2.innerHTML = '<span onclick="if('+dados[i].Nome.length+'>3)alert(\''+dados[i].Nome+'\').show()">'+dados[i].Nome.substr(0,3)+(dados[i].Nome.length>3?'...':'')+'</span>';
			cell3.innerHTML = dados[i].Valor;
			cell4.innerHTML = dados[i].Dia+'/'+dados[i].Mes+'/'+dados[i].Ano.substr(2,2);
			
			cell1.style.textAlign="right";
			cell2.style.textAlign="left";
			cell3.style.textAlign="right";
			cell4.style.textAlign="center";
			cell5.style.textAlign="center";
			cell6.style.textAlign="center";
			cell7.style.textAlign="center";
			
			
			cell5.innerHTML = "<img src='"+ tipoImg(dados[i].Tipo) + "' style='margin-left: 10px;'/>";
			
			cell6.innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAFsSURBVDhPY6A7EBAQ8AfiZX5+frxQIeKBkZGRJAsLy3cg8z83N/cJDw8PPgYLCwtOGRmZFAkJiSxc2Nzc3AaoIQaoeRtQbRQzM/NPJiamHxoaGjoM0tLS+SATcWF+fv6TYmJiRYyMjH9BfKDGfbKysuF8fHzuQD4Dg4KCQg1IIi4uzgxIi6JjoM15QM3/gGywgUADvggJCZkD2RAAM2DBggXKEBEE4OTkBGmGuwbo9E/AALQFS8IALgPY2NhKgBSy5g+KiopJwDDRBMnDATYDgJqrgRSy5ndqamrhHBwcL4F8GyBGAHQDXFxcVNnZ2beCxEAYGPKvpaSkDHR1df2gYvgNAIb6aXFx8SSgIeuBml8Ao00HJE6UATNnzmQFavwF1PhXS0srRF5eXgGiikgDCgsLOYEK7aKiogQhsghA0ACgPycCbW/AhYFeWwZSB8SoBkhKSrpycXH9Bir6TwgDE9UHdXV1uLeoABgYAAvMhCqXmDOkAAAAAElFTkSuQmCC' alt='"+i+"' onclick='' />";
			
			cell7.innerHTML = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNWRHWFIAAAHHSURBVDhPfVPHigJBFBT2PxYW9hvEjFk8msNBTHgwYAAVwQCGg14caRHxD1SMH+Cv1fZrZwZHXQuK7ldVr7Gnn7pneL3eX3n7gk8emV8ej0eKx+OgVZZVfPIE3G73qtvt4na7oVargddqkO9Zq9USHq2Ula07XC4X63Q6OJ1OmM/nuF6vqFar4LpEXrPZxPl8Ft7lcgHVpItmp9P5G4lEsNvtMJ1OBWezGY7HIyqVChqNBg6Hg9AUn+pgMAje+y0OcTgcLJFIYDgcYjQaCU4mE+z3e2y3W4zHY1WnTCwWA/WIZgV2u51Fo1HQd+j1eoKDwQD9fl+tyQuHw6Cs3KaFzWZjoVBIfKh2u60haYFAAJSR46+wWq0sk8mgXq+/kF4mlUqBZ94/o8ViYYVCAev1GqVSCcViUcNyuYzNZoN8Pg+e1R5iNpslMlarFegQ2hNzuZygUpNHmWw2C95zv4rRaPzx+/1YLBZIp9PiZyrk0wmfz6fRKLNcLoXOe+/PaDAYJD6ioKdMJpNipZrrjPjoEelg0kWzAhL4dIGGitbHwKPHx5g87Sgr0Ov1kslkAq2ypIJrjN+bvP+fkcAD93u9Afee/s463R8xBlYoXC4nXwAAAABJRU5ErkJggg==' alt='"+i+"' onclick='excluir(" + dados[i].Id +")' class='btnExcluir'/>";

			item++;
			
		}
		
	}
	
	
	calcularSaldo(dados);
	limparCampos();

}

function excluir(id)
{
	if(confirm("Deseja excluir o registro?")) {
		var filtro =  JSON.parse(localStorage.getItem("contasDB")).filter(function (obj) { return obj.Id != id; });
		
		localStorage.setItem("contasDB", JSON.stringify(filtro));
		popularTabela();
	}
	
}

function calcularSaldo(dados) {
	
	var total = 0, entrada = 0, saida = 0, cont = 0;
	
	for(i = 0; i < dados.length; i++){
	
		if(dados[i].Ano == document.getElementById("ano").value && dados[i].Mes == parseInt(document.getElementById("mes").value)+1) {
		
			if(dados[i].Tipo == 'D'){
				saida -= parseFloat(dados[i].Valor);
				total -= parseFloat(dados[i].Valor);
			}else{
				entrada += parseFloat(dados[i].Valor);
				total += parseFloat(dados[i].Valor);
			}
			cont++;
		}
	}
	
	document.getElementById("entrada").innerHTML = entrada.toFixed(2);
	document.getElementById("saida").innerHTML = saida.toFixed(2);
	document.getElementById("saldo").innerHTML = total.toFixed(2);
	
	
	if(cont==0 /*|| dados.length == 0*/) $('#semLanca').show(); else $('#semLanca').hide();
}

function limpar() {
	if(confirm("Deseja excluir todos os registros?")) {
		localStorage.removeItem("contasDB");
		popularTabela();
	}
}


function tipoImg(t) {
	if(t == 'D')
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAq1JREFUeNrsVs9rE1EQnvf2R5K2qTVNI6Gl7aFYIlXRS5CKFZF6KMSzF+lBtCj+Af0DtFdBKkUsiBdPHgz0UkQiFTSXgFoIqSU0tRqMMcb0V2h285zZbGuitCnNSkDy4CPZed9kvjczbzZMCAH1XBzqvBoCGgIaAuouQK5GYIxVPD73+/wtHCYkIc5vDzHi6IyF1oowfjkcDaOpYrrtNexYtUlYJkCaPeObcra2Xuu6cBFcvgGQmhzGhr6xCZnoPKy8fAGrudyj4TfRMTJbKUDG4M/aPJ7AwPVbUIh9gHz4FWjfkqU0dnjB7h8Cpf84zD+chOzX1PTw2+iNbRG1CmDTp/rOHTvSETp58zbkg0+hsLKE+cDqcbOFikUMpYHS1Qv2wBV49+A+xFLpodHIx7lSfFFTEyqdqnyn59IIbIVmQMdT86Zm4A4HcJutBPqONtojDnG9qnSXfK24BQ67xAcPt7eBnohjQAymYlBZqQTZcI84xLVxPki+Nd8CXColkH+Kg6zaQVDaK29GebsDw9IQ10y6aoUABoyDyP4wTil2C/67qQwu+Ri+FggwTlzEH5VsdihWaVpucoExyyahyGl6JLuRxxLYQMZ6S7uA9ohDXPL5cyAdVMDWbCp7L5FMAcf6UgBJUf5qQrLRHnGISz7ka4WAzcn4l7nF3HowEl3AAIrRjCUhqgEjM2ijPeIQl3zIt2p19zOI8MOJ6Hl8+uhEv8s50tfbDW63GzvIbCFNg3Q6DYtLyxDLrM6MRhbG0ZpArFYbRPsdxRLiEKLzarfnbMDrGmuXpRNi55oAfNf098FkZurJcuo1Pn5G/LRqFO+8jBDNCBcCjw8tpg3MQGuINCKDWLf6ZQRlh1XMCaeW3XNhNhzVvPCvXscHXnvFkGtxbvwnbAj4LwT8EmAAk+oUbw9u+WUAAAAASUVORK5CYII=";

	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoZJREFUeNrsVt9LU2EYfr5zzo6tpou5TIzZRZRQEEEXQqvsxqIfeBf9A0HSTQXeWIIIpTcFdhNeVP9AdGM/wLxRrGCQFYFCRUhb4jRTZ3NbW+30vuecqRPxDM+JQZwPnu3s/Z6X9/nO933PO6FpGso5JJR5uAJcAa6AsgtQrAhCiKKfzZ1olLagR5NwouBhTBF5DOUzaB/sQoRCRe62kdkJKydcJUA+1Y0+f9XWiycPnceB+kZ41W36RDq7hLFoBC/eP0JiMXV/4DpaKfzHSQEKFX9cGwy2XD5zE7HEa4xPP8VCek7nbPcGsH/nOYT8R3DveQfi32cfDNzApYIIuwLEsWs4XrfHN3SlpQuvor2YScYg8WsvrJCQp48aXwjh+qu429+J+ESyafgORoz6mq1D6PFW49bpwxfwbuoh5lMxVNDJUWWaMMHPHOM55jC3IoBuznXiFniFB+G6HZWYSo5BoWIyZUlrwDGeYw5zhYIw59q+BTRUftXTmTeQZWvFBa65PaoTAvRjmPwVhSJKMxbmihU9tgXoChYyUcjE1vIWXMngCuGcE2q5FN7+mDP2WN8GaX3wHHOYyzlrDWmzArKTo+j9MkEFaFWKsr4IvbhicJjLOZzrhID0+BOMzH9Df2TUKKDS5fIoK9eQnznGc8xhLudwruX2lmJE9FVJ2N3Uhp7qEM427ANqa2jF5i3/nQPiM8DHT/T6Y3g2fBvtFP5K+GllRKVaMa0TfsKuvc04Sm2gVa3CweUdJkp2ER+oHfR9HsRLikwSEk5Z8XIzInD3CRCCBJ8Zg1koSZglcINYcroZrfYZj+lwKorbQdbc89y/asebHhvVUOwku/8JXQH/hYC/AgwAPzbwVKDDZCQAAAAASUVORK5CYII=";
}

//REMOVER CARACTERES A ESQUERDA E A DIREITA
function trim(str) { 
	return str.replace(/^\s+|\s+$/g,"");
}

//REMOVER CARACTERES A ESQUERDA
function ltrim(str) {
	return str.replace(/^\s+/,"");
}

//REMOVER CARACTERES A DIREITA
function rtrim(str) {
	return str.replace(/\s+$/,"");
}

//CONVERTE UTF8 PARA BASE64
function utf8_to_b64( str ) {
return window.btoa(unescape(encodeURIComponent( str )));
}

//CONVERTE BASE 64 PARA UTF8
function b64_to_utf8( str ) {
return decodeURIComponent(escape(window.atob( str )));
}


function importar(texto) {
		
	var contas = JSON.parse(b64_to_utf8(trim(texto)));
	contas.push(popularObjeto());
	
	localStorage.setItem("contasDB", JSON.stringify(contas));
	var filtro =  JSON.parse(localStorage.getItem("contasDB")).filter(function (obj) { return obj.Valor != '0.00'; });
	localStorage.setItem("contasDB", JSON.stringify(filtro));
	popularTabela();
	
}



function createFile(fName) {
   var type = window.PERSISTENT;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile(fName, {create: true, exclusive: true}, function(fileEntry) {
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERRO: " + error.code)
   }
	
}

function writeFile(fContent,fName) {

   var type = window.PERSISTENT;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile(fName, {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Arquivo salvo com sucesso!');
            };

            fileWriter.onerror = function(e) {
               alert('Erro ao salvar: ' + e.toString());
            };

            var blob = new Blob([fContent], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERRO: " + error.code)
   }
}


function readFile(fName) {
   var type = window.PERSISTENT;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile(fName, {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               //var txtArea = document.getElementById('textarea');
               //txtArea.value = this.result;
			   importar(this.result);
            };
            reader.readAsText(file);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERRO: " + error.code)
   }
}	


function removeFile() {
   var type = window.PERSISTENT;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERRO: " + error.code)
   }
}	

