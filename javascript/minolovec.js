var arrayMines = new Array();
var velikost = 0;
var totalSeconds = 0;
var myTimer = 0
var steviloMin = 0;
var odstotek = 0;
var objavi = 0;
//localStorage.removeItem('dosezki')

function shraniRezultat(){
  if(objavi == 0){

    if (document.getElementById("ime").value == "") {
      alert("Vnesite ime!");
    }
    else {
      var ime = document.getElementById("ime").value;
      var ods = odstotek;
      var vel = velikost;
      var c = totalSeconds;

      if (typeof(Storage) !== "undefined") {
        if (localStorage.dosezki) {
          var shranjeni = JSON.parse(localStorage.getItem('dosezki'));

          shranjeni.queue.push({
            id: Object.keys(shranjeni.queue).length,
            name: ime,
            odstotek: ods,
            velikost: vel,
            cas: c
          });

          localStorage.setItem('dosezki', JSON.stringify(shranjeni));

          var restoredFruits = JSON.parse(localStorage.getItem('dosezki'));
          console.log(restoredFruits.queue);
        }
        else {
          var dosezki =
          {
            queue:
            [
              {id: 0, name:ime, odstotek:ods, velikost: vel, cas: c}
            ]
          };
         localStorage.setItem('dosezki', JSON.stringify(dosezki));
        }
      }
    }

    objavi = 1;
  }
}

function zacniIgro() {
  document.getElementById("dosezek").hidden = true;
  document.getElementById("dosezek").value = "";
  steviloMin = 0;
  velikost = document.getElementById("velikost").value;
  odstotek = document.getElementById("odstotek").value;
  objavi = 0;
  console.log("velikos: " + velikost);

  document.getElementById("tabela").innerHTML = "";

  for (var x = 0; x < velikost; x++) {
    for (var y = 0; y < velikost; y++) {
        $("#tabela").append("<input type='button' class='gumb skriti' id=" + x + "-" + y + " value='' onclick='klikNaPolje(" + x + ","+ y + ")' oncontextmenu='zastavica(" + x + "," + y + ")'/>");
        if (Math.random() < odstotek) {
          document.getElementById(x + "-" + y).classList.add("mina");
          steviloMin++;
        }
      }
      $("#tabela").append('<br>');
    }
    document.getElementById("stMin").innerHTML = "Število min: "+steviloMin;
    totalSeconds = 0;
    document.getElementById("minute").innerHTML = "00";
    document.getElementById("sekunde").innerHTML = "00";
    myTimer = clearInterval(myTimer);
    myTimer = setInterval(setTime, 1000);
}

function zastavica(x, y) {

  var elemnt = document.getElementById(x + "-" + y);

  if(elemnt.classList.contains("zastavica")){
    elemnt.classList.remove("zastavica");
  }
  else if (elemnt.classList.contains("skriti")){
    elemnt.classList.add("zastavica");
  }
}

function klikNaPolje(x, y){
  var bomba = document.getElementById(x + "-" + y);

  if(bomba.classList.contains("zastavica")){
    alert("Odstranite zastavico");
    return 0;
  }

  if(bomba.classList.contains("mina")){
    konecIgre(1);
  }
  else {
    console.log(x, y);
    dodajPolju(x,y);
    var mina = document.getElementsByClassName("mina").length;
    var vsi = document.getElementsByClassName("skriti").length;
    if(mina == vsi){
      konecIgre(0);
    }
  }
}

function konecIgre(i){
  var ikona;

  if(i == 1){
    var element = document.getElementsByClassName("mina");
    for(var i = 0; i < element.length; i++)
    {
        element[i].classList.add('prikaziMino');
    }
    $('.gumb:not(.mina)')
      .html(function() {

        var pomozna = $(this);
        var xk = Number(pomozna.attr('id')[0]);
        var yk = Number(pomozna.attr('id')[2]);


        const st = dodajPolju(xk , yk);
    })

    $('.gumb.skriti').removeClass('skriti');

    setTimeout(function() {alert("Izgubili ste!");}, 200);
  }
  else {
    var cas = totalSeconds;
    myTimer = clearInterval(myTimer);

    document.getElementById("odstotekMin").innerHTML = "Odstotek min: " + document.getElementById(odstotek).innerHTML;
    document.getElementById("velikostPolja").innerHTML = "Velikost polja: " + document.getElementById(velikost).innerHTML;
    document.getElementById("dosezenCas").innerHTML = "Čas: " + cas + " s";
    document.getElementById("dosezek").hidden = false;


    var element = document.getElementsByClassName("mina");
    for(var i = 0; i < element.length; i++)
    {
        element[i].classList.add('zastavica');
    }

    $('.gumb.skriti').removeClass('skriti');

    setTimeout(function() {alert("Zmagali ste!!!");}, 200);
  }
}

function dodajPolju(x,y){

  const polje = {};

  function rekurzija(xQ,yQ){

    if(xQ >= velikost || yQ >= velikost || xQ < 0 || yQ < 0){
      return;
    }

    const k = xQ + "-" + yQ;

    if (polje[k]) {
      return;
    }

    const izbran = document.getElementById(k);

    const stejMine = pridobiMineSt(xQ,yQ);


    if(izbran.classList.contains("mina") || !izbran.classList.contains("skriti")){
      return;
    }

    izbran.classList.remove("skriti");


    console.log(stejMine);
    if (stejMine) {
      izbran.value = stejMine;
      return;
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        setTimeout(function() {rekurzija(xQ + i, yQ+ j);}, 200);
      }
    }
  }
  rekurzija(x,y);
}

function pridobiMineSt(x,y){
  let st = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const dn = x + i;
      const dm = y + j;

      if (dn >= velikost || dm >= velikost || dm < 0 || dn < 0){
        continue;
      }
      const izb = document.getElementById(dn + "-" + dm);
      if (izb.classList.contains("mina")) {
        st++;
      }
    }
  }

  return st;
}
