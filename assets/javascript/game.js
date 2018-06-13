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
    var opponentsRemaining = 3;
    
    // characters
    
    var objRey = {
        id: "rey",
        HP: 100,
        initialHP: 100,
        attackPower: 55,
        counterPower: 10,
        isAlive: true,
        select: $("#rey"),
        dead: function() {
            this.isAlive = false;
            this.select.appendTo(".div-characters");
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = this.initialHP;
            this.updateHP();
            this.isAlive = true;
            this.select.removeClass("dead fighter");
            this.select.appendTo(".div-characters");
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
            if(fighter != null && this.isAlive == true) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    var objSnoke = {
        id: "snoke",
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 50,
        isAlive: true,
        select: $(".snoke"),
        selectHP: $("#snoke > .span-stat"),
        dead: function() {
            this.isAlive = false;
            this.select.appendTo(".div-characters");
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = this.initialHP;
            this.updateHP();
            this.isAlive = true;
            this.select.removeClass("dead fighter");
            this.select.appendTo(".div-characters");
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
            if(fighter != null && this.isAlive == true) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    var objKylo = {
        id: "kylo",
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".kylo"),
        dead: function() {
            this.isAlive = false;
            this.select.appendTo(".div-characters");
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = this.initialHP;
            this.updateHP();
            this.isAlive = true;
            this.select.removeClass("dead fighter");
            this.select.appendTo(".div-characters");
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
            if(fighter != null && this.isAlive == true) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }

    var objPoe = {
        id: "poe",
        HP: 100,
        initialHP: 100,
        attackPower: 10,
        counterPower: 10,
        isAlive: true,
        select: $(".poe"),
        dead: function() {
            this.isAlive = false;
            this.select.appendTo(".div-characters");
            this.select.addClass("dead");
        },
        reset: function() {
            this.HP = this.initialHP;
            this.updateHP();
            this.isAlive = true;
            this.select.removeClass("dead fighter");
            this.select.appendTo(".div-characters");
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
            if(fighter != null && this.isAlive == true) {
                fighter.HP -= this.counterPower;
                fighter.updateHP();
            }
        }
    }
    

    // global functions

    function newGame() {

        // hide overlay
        
        $(".fade").removeClass("fadeMain");
        $(".div-overlay").removeClass("showOverlay");
        
        // reset

        objRey.reset();
        objSnoke.reset();
        objKylo.reset();
        objPoe.reset();

        round = 0;
        opponentsRemaining = 3;
        $("#div-healthBar").css("width", "100%");

        // let player select fighter

        selectOpponentOn = false;
        fightOn = false;
        $(".fight-button").removeClass("fightable");

        $(".character").addClass("selectable");
        selectFighterOn = true;
    }

    function newOpponent() {

        fightOn = false;
        $("#fight-button").removeClass("fightable");

        // let player select opponent

        $(".character").addClass("selectable");
        selectOpponentOn = true;
    }

    function checkGame() {

        // check for defeats, win/lose

        if(fighter.HP <= 0) {

            lose();

        } else if (opponent.HP <= 0) {

            opponent.dead();
            opponentsRemaining--;

            if(opponentsRemaining === 0) {

                win();

            } else {

                newOpponent();

            }
        }
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
        $("#newGame-button").clone(true).appendTo(".div-overlay");
        $(".div-overlay").addClass("showOverlay").animate({opacity:0.95});
    }


    // click listeners

    $(".div-characters > .character").on("click", function() {
        
        if(selectFighterOn === true) {

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

        } else if(selectOpponentOn === true) {
            
            // cannot select fighter as opponent
            if(fighter.id != $(this).attr("id")) {

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

                // cannot select dead opponent

                if(opponent.isAlive === true) {

                    // move opponent to position
                    $(this).appendTo("#div-opponent");

                    // go to fight mode
                    selectOpponentOn = false;
                    $(".character").removeClass("selectable");
                    $("#fight-button").addClass("fightable");
                    fightOn = true;
                    }  
            }                        
        }   
    })

    $("#fight-button").on("click", function() {

        console.log(selectFighterOn, selectOpponentOn, fightOn);
        
        if(fightOn == true) {
           
            round++;

            // change HP for each
            fighter.attack();
            opponent.counterAttack();

            // adjust health bar
            var b = fighter.HP / fighter.initialHP * 100 + "%";
            console.log(b);
            $("#div-healthBar").css("width", b);

             // animation, checkGame function runs after last
             fighter.select.animate({left:"+=30"}, 75).animate({left:"-=40"}, 75).animate({left:"+=10"}, 200);
             opponent.select.delay(200).animate({left:"-=30"}, 75).animate({left:"+=40"}, 75).animate({left:"-=10"}, 200, checkGame);
        }
    })

    $("#newGame-button").on("click", function() {
        $(".div-overlay > #newGame-button").detach();
        newGame();
    })


    // execute

    newGame();

})

