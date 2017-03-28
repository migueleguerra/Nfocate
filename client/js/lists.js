
function TareaItem(id, content, times = 0) {
  this.id = id;
  this.content = content;
  this.times = times;
  this.state = 0; // not visible
}

function ListaTareas(idName) {

  this.idName = idName;
  this.parent = document.getElementById(this.idName);

  this.add = function(id, content, times = 0) {
    var listItem = new TareaItem(id, content, times);
    var badge = document.createElement("span");
    var item = document.createElement("a");
    
    item.setAttribute("id", listItem.id);
    item.setAttribute("class", "list-group-item");
    item.setAttribute("href", "#/listas");
    item.appendChild(document.createTextNode(listItem.content));

    if (times != 0) {
      badge.setAttribute("class", "badge");
      badge.appendChild(document.createTextNode(listItem.times));
      item.appendChild(badge);
    }

    this.parent.appendChild(item);
  }

  this.del = function(id) {
    this.parent.removeChild(document.getElementById(id));
  }

  this.edit = function(id, content) {
    var elem = document.getElementById(id);
    elem.
    this.content = content;
    if (state) {  
      // render html changes
    }
  }
}

$( document ).ready(function() {
  //var contenedor = document.querySelector("#ListaTareas");
  //contenedor.appendChild(document.createElement('div'))
  // var id = 0;
  // var tareas = new ListaTareas("ListaTareas");

  // $("#createTareaAction").mousedown(function() {
  //   var txt = document.getElementById("newTareaTxt").value;
  //   tareas.add(id++, txt);
  // });

  // tareas.add(id++, "Contenido de las tareas", 2);
  // tareas.add(id++, "Una tarea más");
  // tareas.add(id++, "Casi nadie se acuerda de sus pomodoros sin un app", 1);
  // tareas.add(id++, "Tareas");
  // tareas.add(id++, "comer", 3);

  //tareas.del(2);
});