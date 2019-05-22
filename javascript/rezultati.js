
    var dosezki = JSON.parse(localStorage.getItem('dosezki'));

      function sortById() {
        dosezki.queue.sort(function (id1, id2) {
          if (Number(id1.id) > Number(id2.id)) return 1;
	        if (Number(id1.id) < Number(id2.id)) return -1;
        });

        prikazi();
      }

      function sortByIme() {
        dosezki.queue.sort(function (ime1, ime2) {
          if (ime1.name > ime2.name) return 1;
	        if (ime1.name < ime2.name) return -1;
        });

        prikazi();
      }

      function sortByOdstotek() {
        dosezki.queue.sort(function (ods1, ods2) {
          if (Number(ods1.odstotek) > Number(ods2.odstotek)) return -1;
	        if (Number(ods1.odstotek) < Number(ods2.odstotek)) return 1;
        });

        prikazi();
      }

      function sortByVelikost() {
        dosezki.queue.sort(function (vel1, vel2) {
          if (Number(vel1.velikost) > Number(vel2.velikost)) return -1;
	        if (Number(vel1.velikost) < Number(vel2.velikost)) return 1;
        });

        prikazi();
      }

      function sortByCas() {
        dosezki.queue.sort(function (cas1, cas2) {
          if (Number(cas1.cas) > Number(cas2.cas)) return 1;
	        if (Number(cas1.cas) < Number(cas2.cas)) return -1;
        });

        prikazi();
      }

      function prikazi() {
        var ods = {queue: []};


        var outputs = "";
        for(var i = 0; i < dosezki.queue.length; i++)
        {
        	outputs += '<tr> <td id="'+dosezki.queue[i].id + '">' + dosezki.queue[i].id+'</td><td>'+dosezki.queue[i].name+'</td><td>'+dosezki.queue[i].odstotek*100 +'</td><td>'+dosezki.queue[i].velikost + "x" + dosezki.queue[i].velikost + '</td><td>'+dosezki.queue[i].cas +' s</td></tr>';
        }
        document.getElementById("demo").innerHTML = outputs;
      }

      prikazi();
