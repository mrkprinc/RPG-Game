$(document).ready(function() {
    
    
    // global variables

    // represent "modes" for selecting characters and fighting
    var selectFighterOn = false;
    var selectOpponentOn = false;
    var fightOn = false;

    // will point to character objects
    var fighter = null;
    var opponent = null;

    // will increment for every attack in a game
    var round = 0;
    
    
    // characters

    var allChars = [objRey, objSnoke, objKylo, objPoe];
    
    var objRey = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $("#rey"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
        updateHP: function() {
            $("#rey > .span-stat").html(this.HP);
        },
        attack: function() {
            if(opponent != null) {
                opponent.HP -= this.attackPower * round;
                opponent.updateHP();
            }
        },
        counterAttack: function() {
            if(fighter != null) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    // function attackby(obj) {
    //     if(opponent != null) {
    //         opponent.HP -= obj.attackPower * round;
    //         opponent.updateHP();
    //     }
    // }

    var objSnoke = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".snoke"),
        selectHP: $("#snoke > .span-stat"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
        updateHP: function() {
            $("#snoke > .span-stat").html(this.HP);
        },
        attack: function() {
            if(opponent != null) {
                opponent.HP -= this.attackPower * round;
                opponent.updateHP();
            }
        },
        counterAttack: function() {
            if(fighter != null) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    var objKylo = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".kylo"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
        updateHP: function() {
            $("#kylo > .span-stat").html(this.HP);
        },
        attack: function() {
            if(opponent != null) {
                opponent.HP -= this.attackPower * round;
                opponent.updateHP();
            }
        },
        counterAttack: function() {
            if(fighter != null) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    var objPoe = {
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".poe"),
        dead: function() {
            this.isAlive = false;
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = 100;
            this.isAlive = true;
            this.select.removeClass("dead");
        },
        updateHP: function() {
            $("#poe > .span-stat").html(this.HP);
        },
        attack: function() {
            if(opponent != null) {
                opponent.HP -= this.attackPower * round;
                opponent.updateHP();
            }
        },
        counterAttack: function() {
            if(fighter != null) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }
    

    // global functions

    function newGame() {

        // reset

        // let player select fighter

        $(".character").addClass("selectable");
        selectFighterOn = true;
    }

    function newOpponent() {

        // let player select opponent

        $(".character").addClass("selectable");
        selectOpponentOn = true;
    }

    function checkGame() {
        // check for defeats, win/loss
    }

    function win() {
        fighter.select.appendTo($(".div-overlay"));
        $("#span-overlayText").text("You win!");
        $(".div-overlay").css("border", "2px solid green");
        showOverLay();
    }

    function lose() {
        opponent.select.appendTo($(".div-overlay"));
        $("#span-overlayText").text("You lose!");
        $(".div-overlay").css("border", "2px solid red");
        showOverLay();
    }

    function showOverLay() {

        $(".fade").addClass("fadeMain");
        $(".div-overlay").addClass("showOverlay").animate({opacity:0.9});
    }


    // click listeners

    $(".character").on("click", function() {
        
        if(selectFighterOn == true) {

            // assign fighter var
            switch($(this).attr("id")) {
                case "rey":
                    fighter = objRey;
                    break;
                case "snoke":
                    fighter = objSnoke;
                    break;
                case "kylo":
                    fighter = objKylo;
                    break;
                case "poe":
                    fighter = objPoe;
                    break;
            }
            
            // move fighter to position
            $(this).appendTo("#div-fighter");
            $(this).addClass("fighter");
            selectFighterOn = false;
            selectOpponentOn = true;

        } else if(selectOpponentOn == true) {
            
            // assign opponent var
            switch($(this).attr("id")) {
                case "rey":
                    opponent = objRey;
                    break;
                case "snoke":
                    opponent = objSnoke;
                    break;
                case "kylo":
                    opponent = objKylo;
                    break;
                case "poe":
                    opponent = objPoe;
                    break;
            }
            
            // move opponent to position
            $(this).appendTo("#div-opponent");

            // go to fight mode
            selectOpponentOn = false;
            $(".character").removeClass("selectable");
            fightOn = true;
        }
        
    })

    $("#fight-button").on("click", function() {

        console.log(selectFighterOn, selectOpponentOn, fightOn);
        
        if(fightOn == true) {
           
            round++;

            // animation
            fighter.select.animate({left:"+=30"}, 200).animate({left:"-=40"}, 200).animate({left:"+=10"});
            opponent.select.delay(200).animate({left:"-=30"}, 200).animate({left:"+=40"}, 200).animate({left:"-=10"});

            // change HP for each
            fighter.attack();
            opponent.counterAttack();

            console.log(fighter.HP, opponent.HP, round);

            // adjust health bar
            var b = fighter.HP / fighter.initialHP * 100 + "%";
            console.log(b);
            $("#div-healthBar").css("width", b);

            //check game
        }
    })


    // execute

    newGame();

})

