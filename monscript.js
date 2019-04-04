var app = angular.module("app", []);

app.controller("MainCtrl", function($scope, $timeout, $interval) {

  $scope.pace = 8;
  $scope.paused = false;
  $scope.logs = [];
  $scope.log = function(msg) {
    msg = "Jour " + $scope.family.day + " - " + msg;
    $scope.logs.unshift(msg);
    if ($scope.logs.length > 50) {
      $scope.logs.pop();
    }
  }
  $scope.taxCD = 0;
  $scope.collectTaxes = function() {
    if ($scope.taxCD === 0) {
      var taxes = Math.round(Math.random() * 300);

      $scope.family.steel += taxes;

      $scope.log("Vous collectez " + taxes + " dragons d'or");
      $scope.taxCD = 15;
    }
  }
  $scope.stage = 0;
  $scope.hireSoldiers = function(amt) {
    amt = Math.floor(amt);
    if ($scope.family.steel >= amt * 10) {
      $scope.family.steel -= amt * 10;
      $scope.family.soldiers += amt;

      $scope.log("Vous recrutez " + amt + " soldats");
    } else {
      $scope.log("Vous n'avez pas assez de dragons d'or pour recruter");
    }
  }
  $scope.checkFamilyName = function() {
    if ($scope.houses.indexOf($scope.family.name.toLowerCase().trim()) >= 0) {
      $scope.family.name += "-wannabe";
    }
  }
  $scope.places = [{
    name: 'Winterfell',
    house: 'Stark'
  }, {
    name: 'Castle Black',
    house: 'Night\'s Watch'
  }, {
    name: 'The Dreadfort',
    house: 'Bolton'
  }, {
    name: 'King\'s Landing',
    house: 'Baratheon'
  }, {
    name: 'Casterly Rock',
    house: 'Lannister'
  }, {
    name: 'Braavos',
    house: 'Braavos'
  }, {
    name: 'Iron Islands',
    house: 'Greyjoy'
  }, {
    name: 'Riverlands',
    house: 'Tully'
  }, {
    name: 'Vale of Arryn',
    house: 'Arryn'
  }, {
    name: 'Lannisport',
    house: 'Lannister'
  }, {
    name: 'High Garden',
    house: 'Tyrell'
  }, {
    name: 'Dorne',
    house: 'Martell'
  }, {
    name: 'White Harbour',
    house: 'Stark'
  }];

  $scope.family = {
    name: "",
    steel: 1000,
    soldiers: 20,
    members: [],
    day: 0,
    enemies: [],
    allies: []
  }

  $scope.addMember = function(name) {
    $scope.newMemberName = "";
    $scope.family.members.push({
      name: name,
      alive: true,
      location: "Home"
    });

  }
  $scope.houses = [
    "stark",
    "lannister",
    "baratheon",
    "greyjoy",
    "bolton",
    "martell",
    "targaryen",
    "tully",
    "arryn",
    "tyrell",
    "clegane",
    "frey"
  ]

  $scope.lords = [
    "Little Finger",
    "Varys",
    "Ned Stark",
    "Robb Stark",
    "Cersei Lannister",
    "Robert Baratheon",
    "Theon Greyjoy",
    "Roose Bolton",
    "Joffrey Baratheon",
    "Stannis Baratheon",
    "Tywin Lannister",
    "Tyrion Lannister",
    "Doran Martell",
    "Margery Tyrell",
    "Ollena Tyrell",
    "Selyse Baratheon",
    "Balon Greyjoy"
  ]

  $scope.people = [
    "Little Finger",
    "Varys",
    "Ned Stark",
    "Robb Stark",
    "Balon Greyjoy",
    "Cersei Lannister",
    "Robert Baratheon",
    "Theon Greyjoy",
    "Ramsay Bolton",
    "Jaime Lannister",
    "Joffrey Baratheon",
    "Tommen Baratheon",
    "Stannis Baratheon",
    "Renley Baratheon",
    "Brienne of Tarth",
    "Jon Snow",
    "Tywin Lannister",
    "Tyrion Lannister",
    "Davos Seaworth",
    "Melisandre",
    "Doran Martell",
    "Margery Tyrell",
    "Gregor Clegane",
    "Sandor Clegane",
    "Hodor",
    "Edmure Tully",
    "Ollena Tyrell",
    "Maester Aemon",
    "Samwell Tarley",
    "Roose Bolton",
    "Walder Frey",
    "Meryn Trant",
    "Mance Rayder",
    "Selyse Baratheon",
    "Wylla",
    "Allister Thorne",
    "Loras Tyrell",
    "Kevan Lannister"
  ]

  $scope.run = function() {
    $timeout(function() {
      var event = $scope.events[Math.floor(Math.random() * $scope.events.length)];
      console.log(event);
      event();
      $scope.updateState();
      if (!$scope.paused) {
        $scope.family.day++;
        $scope.run();
      }
    }, 2000 - $scope.pace * 100);
  }
  $scope.pause = function() {
    $scope.paused = true;
  }
  $scope.continue = function() {
    if ($scope.paused) {
      $scope.paused = false;

      $scope.run();
    }
  }

  $scope.start = function() {
    $scope.pace = parseInt($scope.pace);
    if ($scope.family.name.length > 0 && $scope.family.members.length > 0) {
      $scope.started = true;
      angular.forEach($scope.family.members, function(member) {
        if (member.name.indexOf($scope.family.name) < 0) {
          member.name += " " + $scope.family.name;
        }
      });

      $scope.family.soldiers = parseInt($scope.family.soldiers);
      $scope.family.steel = parseInt($scope.family.steel);
      $scope.run();
    }

  }

  $scope.end = function(message) {

    $timeout(function() {
      $scope.gameOver = message;
    }, 2500);

  }

  $scope.randomFamily = function(onlyAlive) {
    var pool = [];
    angular.forEach($scope.family.members, function(member) {
      if (onlyAlive && member.alive || !onlyAlive) {
        pool.push(member);
      }
    });
    if (pool.length > 0) {
      return pool[Math.floor(Math.random() * pool.length)]
    } else {
      return null
    }
  }

  $scope.updateState = function() {
    var someFamilyIsAlive = false;
    var somebodyIsAlive = $scope.people.length > 0;
    if ($scope.taxCD > 0) {
      $scope.taxCD--;
    }
    if ($scope.assassinationCD > 0) {
      $scope.assassinationCD--;
    }
    if ($scope.territoryTax > 0) {
      $scope.territoryTax--;
    }
    angular.forEach($scope.family.members, function(member) {
      if (member.alive) {
        someFamilyIsAlive = true;
      }
    });

    if (!somebodyIsAlive) {
      $scope.pause();
      $scope.end("Eh bien, regardez ça, vous avez tué tout le monde qui pose une menace pour vous, bravo. Vous avez survécu à Westeros.")
    }

    if (!someFamilyIsAlive) {
      $scope.pause();
      $scope.end("Oups voilà le dernier de ta maison, tu as survécu"  + $scope.family.day + " jours à Westeros.");
    }
  }
  $scope.assassins = [{
    name: "Some Street Thug",
    price: 20,
    successRate: 0.01
  }, {
    name: "Quickfinger",
    price: 500,
    successRate: 0.12
  }, {
    name: "The Sorrowful Men",
    price: 1000,
    successRate: 0.25
  }, {
    name: "Sand Vipers",
    price: 2000,
    successRate: 0.4
  }, {
    name: "The Alchemist",
    price: 2500,
    successRate: 0.5
  }, {
    name: "The Faceless Men",
    price: 30000,
    successRate: 0.95
  }]
  $scope.showAssassinOptions = false;
  $scope.assassinationTarget = "";
  $scope.assassinationCD = 0;
  $scope.cancelAssassination = function() {
    $scope.showAssassinOptions = false;
    $scope.continue();
  }
  $scope.confirmAssassination = function(person) {
    if ($scope.assassinationCD === 0 && $scope.stage >= 0) {
      if ($scope.stage < 1 && person === "Joffrey Baratheon") {
        $scope.log("He's a twat, yes, but still a kid. Can't assassinate him yet.")
      } else {
        $scope.assassinationTarget = person;
        $scope.pause();
        $scope.showAssassinOptions = true;
      }

    }
  }

  $scope.orderKill = function(assassin, person) {
    if ($scope.family.steel >= assassin.price) {
      $scope.family.steel -= assassin.price;
      $scope.showAssassinOptions = false;
      var roll = Math.random();
      if (roll < assassin.successRate) {
        $scope.killPerson(person);
        $scope.log("You hired " + assassin.name + " to kill " + person + ", and the attempt was successful");
      } else {
        $scope.log("Unfortunately, " + assassin.name + " has failed the attempt on " + person + "'s life, but quickly retreated before being caught");
      }
      $scope.continue();
      $scope.assassinationCD = 25;
    }

  }

  $scope.killPerson = function(person) {
    if ($scope.family.allies.indexOf(person) >= 0) {
      $scope.family.allies.splice($scope.family.allies.indexOf(person), 1);
    }
    if ($scope.family.enemies.indexOf(person) >= 0) {
      $scope.family.enemies.splice($scope.family.enemies.indexOf(person), 1);
    }

    $scope.people.splice($scope.people.indexOf(person), 1);
  }

  $scope.events = []
  $scope.territoryTax = 0;
  var taxCollection = function() {
    var tax = 0;
    if ($scope.territoryTax == 0) {
      angular.forEach($scope.places, function(place) {
        if (place.house === $scope.family.name) {
          tax += 1200;
        }
      });

      if (tax > 0) {
        $scope.territoryTax = 30;
        $scope.family.steel += tax;
        $scope.log("Votre maison reçoit " + tax + " dragons d'or ");
      }
    }
  }
  $scope.events.push(taxCollection);

  var invasion = function() {
    if (Math.random() < 0.05) {
      if ($scope.family.soldiers > 0) {
        var enemies = Math.floor(Math.random() * $scope.family.soldiers + 10);
        $scope.family.soldiers -= Math.floor(enemies * Math.random() * 0.5);

        var invader = $scope.people[Math.floor(Math.random() * $scope.people.length)];

        if ($scope.family.enemies.indexOf(invader) >= 0) {
          $scope.log("Ce pirate, " + invader + "vous a attaqué avec une armée de " + enemies + ". Votre armée est maintenant de " + $scope.family.soldiers);

        } else if ($scope.family.allies.indexOf(invader) >= 0) {
          $scope.log("Oh non! " + invader + " à décider de vous poignarder dans le dos. Avec son armée composée de  " + enemies + " soldats. Vos soldats ont vaillament combattu ce qu'ils pensaient être des amis. " + $scope.family.soldiers + " ont survécu, et ils veulent prendre leur revanche ! " + invader + "est placé sur la liste des ennemis pour trahison!!");
          $scope.family.allies.splice($scope.family.allies.indexOf(invader), 1);
          $scope.family.enemies.push(invader);
        } else {
          $scope.log("Qui sait ce qui a poussé " + invader + " tà vous attquer avec " + enemies + " hommes ? A present ils sont vos ennemis!");
          $scope.family.enemies.push(invader);
        }
      }
    }
  }
  $scope.events.push(invasion);

  var assassin = function() {
    if (Math.random() < 0.01) {
      var victim = $scope.randomFamily(true);
      if (victim) {
        victim.alive = false;
        var perpetrator = $scope.people[Math.floor(Math.random() * $scope.people.length)];
        $scope.log("Au fond de la nuit " + victim.location + ", un assassin a tué" + victim.name + " avec sang froid, et ai parti silencieusement, laissant seulement une note: «Cordialement, " + perpetrator + "'. Qui a engager cet assassin ???");
        if ($scope.family.allies.indexOf(perpetrator) >= 0) {
          $scope.family.allies.splice($scope.family.allies.indexOf(perpetrator), 1);
        }

        if ($scope.family.enemies.indexOf(perpetrator) < 0) {
          $scope.family.enemies.push(perpetrator);
        }

      }
    }

  }
  $scope.events.push(assassin);

  var allianceWith = function() {
    if (Math.random() < 0.13) {
      var person = $scope.people[Math.floor(Math.random() * $scope.people.length)];

      if ($scope.family.allies.indexOf(person) < 0) {
        if ($scope.family.enemies.indexOf(person) >= 0) {
          if (Math.random() < 0.3) {
            $scope.log(person + " viens vous supplier de lui pardonner. In a move that will go down in history as 'Extremely stupid', you do. Oh well, lets see what happens next");
            $scope.family.enemies.splice($scope.family.enemies.indexOf(person), 1);
          } else {
            $scope.log(person + " came to you to beg forgiveness. You cleverly rejected the proposal. Well done.");
          }
        } else {
          if (Math.random() < 0.3) {
            $scope.log(person + " proposed to form an alliance with you. You decided against the proposal, they seem difficult to trust");
          } else {

            if (person === "Hodor") {
              $scope.log("Hodor wants to help you - 'Hodor'");
            } else {

              var msg = person + " proposed to form an alliance with you, and you gladly accepted it. ";
              if ($scope.lords.indexOf(person) >= 0) {
                var steel = Math.round(Math.random() * 10000 + 400);
                var soldier = Math.round(Math.random() * 400 + 20);
                $scope.family.steel += steel;
                $scope.family.soldiers += soldier;
                msg += "In celebration, " + person + " gifted you with " + steel + " Gold Dragons and " + soldier + " Soldiers";
              }
              $scope.log(msg);
            }

            $scope.family.allies.push(person);

          }
        }
      }
    }
  }
  $scope.events.push(allianceWith);

  var invadePlace = function() {
    if (Math.random() < 0.2 && $scope.stage > 0) {
      var randPlace = $scope.places[Math.floor(Math.random() * $scope.places.length)];
      if (randPlace.house != $scope.family.name && randPlace.name != "Castle Black") {
        if (Math.random() < 0.2 && $scope.family.soldiers > 400) {
          var newMen = Math.round(Math.random() * 100) + 5;
          var newSteel = Math.round(Math.random() * 3000) + 100;

          var leader = $scope.randomFamily(true);

          $scope.log(leader.name + " marched against " + randPlace.name + " and took it with " + $scope.family.soldiers + " men. Turns out, the people of " + randPlace.name + " welcomed your house, and provided you with " + newMen + " new soldiers and " + newSteel + " Gold Dragons");

          leader.location = randPlace.name;
          randPlace.house = $scope.family.name;
          $scope.family.steel += newSteel;
          $scope.family.soldiers += newMen;
        } else if ($scope.family.soldiers > 400) {
          var soldiersDied = Math.floor(Math.random() * $scope.family.soldiers * 0.8);

          var leader = $scope.randomFamily(true);

          $scope.log(leader.name + " marched against " + randPlace.name + " but failed to take it. In the process, " + soldiersDied + " soldiers died. It was a devastating loss");

          $scope.family.soldiers -= soldiersDied;
        }
      }
    }
  }
  $scope.events.push(invadePlace);

  var summons = function() {
    if (Math.random() < 0.2 && $scope.stage === 0 && $scope.family.steel > 400) {
      var summoned = $scope.randomFamily(true);
      summoned.location = "King's Landing";
      $scope.log(summoned.name + " a été nommé main du roi à  King's Landing . Votre maison a reçu 20 000 dragons d'or et 1 500 soldats pour le service")

      var soldiers = 1500;
      var steel = 20000;

      $scope.family.steel += steel;
      $scope.family.soldiers += soldiers;

      $scope.stage = 1;
    }
  }
  $scope.events.push(summons);

  var kingDies = function() {
    if (Math.random() < 0.2 && $scope.stage == 1) {
      angular.forEach($scope.family.members, function(member) {
        member.location = "Maison";
      });
      $scope.log("La nouvelle de la mort du roi se répandit. Tous les membres de votre maison sont rentrés chez eux en toute sécurité pour se préparer au pire.");
      $scope.stage = 2;
    } else if ($scope.stage == 1) {
      angular.forEach($scope.family.members, function(member) {
        if (member.location === "King's Landing" && member.alive) {
          member.alive = false;
          $scope.log(member.name + "a été décapité in King's Landing sur ordre de  Joffrey Baratheon");
          if ($scope.family.enemies.indexOf("Joffrey Baratheon") < 0) {
            $scope.family.enemies.push("Joffrey Baratheon");
          }
        }
        $scope.stage = 2;
      });
      $scope.stage = 2;
    }
  }

  $scope.events.push(kingDies);

  var winterIsComing = function() {
    if (Math.random < 0.1 && $scope.stage <= 1) {
      $scope.stage = 2;
      $scope.log("La garde de nuit a envoyé un corbeau: Winter is Coming");
      $scope.nightsWatchRecruiting = true;
    }
  }
  $scope.events.push(winterIsComing);

  var visitsNightsWatch = function() {
    if (Math.random() < 0.02 && $scope.stage == 2 && $scope.nightsWatchRecruiting) {
      var person = $scope.randomFamily(true);
      person.location = "Castle Black";
      $scope.log(person.name + "voyage à Castle Black pour en apprendre davantage sur la montre de nuit. Ils parlent de White Walkers, mais ils sont éteints… n'est-ce pas?");
      $scope.nightsWatchRecruiting = false;
    }
  }
  $scope.events.push(visitsNightsWatch);

  var allyKilled = function() {
    if ($scope.family.allies.length > 0 && Math.random() < 0.2 && $scope.stage > 1) {
      var victim = $scope.family.allies[Math.floor(Math.random() * $scope.family.allies.length)];

      var roll = Math.random();
      if (roll < 0.2) {
        $scope.log("Votre allié, " + victim + " est mort dans la nuit, \"pacifiquement\"");
      } else if (roll < 0.6) {
        $scope.log("Votre allié, " + victim + " est mort empoisonné. Le responsable reste inconnu");
      } else if (roll < 0.9) {
        $scope.log(victim + " mort en route pour Winterfell. Qui est derriére ça?");
      } else {
        $scope.log(victim + " est mort brûlé vif. Que ce soit une leçon sur le fait de jouer avec le feu..");
      }

      $scope.killPerson(victim);
    }
  }
  $scope.events.push(allyKilled);

  $scope.ollied = false;
  var olly = function() {
    if (!$scope.ollied && Math.random() < 0.13) {
      var person = null;
      angular.forEach($scope.family.members, function(member) {
        if (member.alive && member.location == "Castle Black") {
          person = member;
        }
      });
      if (person) {
        $scope.log("Une partie des hommes de la garde designent " + person.name + " comme un traitre. Il y avait des traces de coups de couteau et de sang, sur Olly, dont les parents sont morts.");
        person.alive = false;
        $scope.ollied = true;
      }
    }
  }
  $scope.events.push(olly);

  $scope.melisandered = false;
  var melisander = function() {
    if (!$scope.melisandered && Math.random() < 0.02 && $scope.family.allies.indexOf("Melisandre") >= 0) {
      var alive = 0;
      var victim;
      angular.forEach($scope.family.members, function(member) {
        if (member.alive) {
          alive++;
          victim = member;
        }
      });
      if (alive > 1) {
        $scope.log("Melisandre a convaincu votre maison de brûler " + victim.name + "au nom du Seigneur de la Lumière pour faire fondre de la neige. Après avoir accompli cet acte, elle s'est rapidement apperçu de son erreur.");
        victim.alive = false;

      } else {
        $scope.log("Melisandre est mécontente du manque de progrès pour le trône de fer et a décidée de vous quitter. Peut-être aussi, elle suggérait quelque chose à propos de brûler des redevances");

      }
      $scope.family.allies.splice($scope.family.allies.indexOf("Melisandre"), 1);
      $scope.melisandered = true;
    }
  }
  $scope.events.push(melisander);

  $scope.demonBabied = false;
  var demonBaby = function() {
    if ($scope.family.allies.indexOf("Melisandre") >= 0 && !$scope.melisandered && $scope.family.enemies.length > 0 && !$scope.demonBabied) {
      $scope.demonBabied = true;
      var person = $scope.randomFamily(true);
      var victim = $scope.family.enemies[Math.floor(Math.random() * $scope.family.enemies.length)];
      $scope.log(person.name + "a été séduit par Melisandre, ils ont fait l'amour, puis elle a donné naissance à un bébé démon, parce que. Puis ce bébé démon a tué "+ victime +", alors voilà. Hope "+ person.name +" n'a pas obtenu de STD dans le processus.");

      $scope.killPerson(victim);
    }
  }
  $scope.events.push(demonBaby);

  $scope.trialled = false;
  var trialByCombat = function() {
    if ($scope.stage >= 2 && !$scope.trialled) {
      $scope.trialled = true;
      var person = $scope.randomFamily(true);
      person.location = "King's Landing";
      var msg = person.name + " a été emmené de force à King's Landing sous l'accusation de trahison.";
      if ($scope.family.allies.indexOf("Doran Martell") >= 0) {
        msg += "Oberyn Martell a décidé d’être votre champion, son frère Doran étant allié avec vous. C'est un gars plutôt sympa, mais peut-être que ses émotions ont fait obstacle. En tout cas, il mourut de façon macabre dans le duel. ";
        if (Math.random() < 0.75 && $scope.family.allies.length > 0) {
          var ally = $scope.family.allies[Math.floor(Math.random() * $scope.family.allies.length)];
          msg += person.name + " cependant réussi à s'échapper avec l'aide de " + ally;
          person.location = "Home";
        } else {
          person.alive = false;
          msg += person.name + " a été sommairement exécuté sur place par le champion de la Couronne";
        }
      } else {
        msg += person.name + "  décidé de se débarrasser des charges par procès au combat. ";
        if (Math.random() < 0.5) {
          msg += person.name + " gagné, et a été laissé aller";
          person.location = "Maison";
        } else {
          msg += person.name + "mort par l'épée à travers les entrailles.";
          person.alive = false;
        }
      }
      $scope.log(msg);
    }
  }
  $scope.events.push(trialByCombat);

  var territoryChange = function() {
    if ($scope.stage > 1 && Math.random() < 0.3 && $scope.people.length > 1) {
      var person = $scope.people[Math.floor(Math.random() * $scope.people.length)];

      var place = $scope.places[Math.floor(Math.random() * $scope.places.length)];

      var personHouse = "";
      angular.forEach($scope.houses, function(house) {
        if (person.toLowerCase().indexOf($scope.houses) >= 0) {
          personHouse = house;
          personHouse = personHouse.substring(0, 1).toUpperCase() + personHouse.substring(1);
        }
      });

      if (personHouse && personHouse !== place.house) {
        place.house = personHouse;
        $scope.log(person + " attaque " + place.name + "et en prend le contrôle.");
      }
    }

  }

  console.log("events", $scope.events);
});