$(document).ready(function(){
	var player;
	var enemy;
	var wins = 0;
	var pSelected = false;
	var eSelected = false;
	var $status = $("#gameStatus");

	var characters = [
	{
		name: "Luke Skywalker",
		pic: "assets/images/luke.jpeg",
		health: 100,
		AP:15 ,
		CAP: 25

	},
	{
		name: "Darth Vader",
		pic: "assets/images/vader.jpeg",
		health: 120,
		AP: 20,
		CAP: 30 
	},
	{
		name: "Jar Jar Binks",
		pic: "assets/images/jarjar.jpeg",
		health: 150,
		AP: 8 ,
		CAP: 40
	},
	{
		name: "Darth Sideous",
		pic: "assets/images/sidious.jpeg",
		health: 180,
		AP:25 ,
		CAP:35 
	}

	];

	var calcDamage = function(){
		player.health = player.health - enemy.CAP;
		enemy.health = enemy.health - player.AP;
		player.AP = player.AP + player.baseAP;
		console.log(player.AP);
	};

	var gameCheck = function(){
		if(player.health <= 0){
			$status.append("GAME OVER <br/>");
			$("#attack").attr("disabled", true);
		}
		
		else if(enemy.health <= 0){
			$("#enemy").empty();
			eSelected = false;
			$("#attack").attr("disabled",true);
			wins++
			if(wins == (characters.length - 1)){
				$status.append("YOU WIN ALL ENEMIES WERE VANQUISHED");
			}
			else{
			$status.append("Enemy Defeated. Select Your Next Opponent <br/>");
			}
		}
		else{
			//do nothing
		}
	};

	for(var x=0;x< characters.length; x++){
		$newdiv = $("<div class='col-md-3 char'><h4 class='text-center'>"+ characters[x].name 
			+ "</h4><img class='img-responsive' src='"+ characters[x].pic 
			+"'alt='"+characters[x].name+"'><p class='text-center' id='health'>" 
			+ characters[x].health + "</p></div>");
		
		$newdiv.attr("charIndex", x);
		$("#characters").append($newdiv);
	}


	$("#attack").attr("disabled", true);

	$(".char").on("click", function(){
		$input = $(this);
		
		if(pSelected == false){
			player = characters[$input.attr("charIndex")];
			player.baseAP = player.AP;
			$("#player").replaceWith($input.clone().attr("id", "player"));
			$input.remove();
			pSelected = true;
		}

		else if(eSelected == false){
			enemy = characters[$input.attr("charIndex")];
			$("#enemy").replaceWith($input.clone().attr("id","enemy"));
			$input.remove();
			eSelected = true;
			$("#attack").attr("disabled", false);
		}

		else{
			//do nothing
		}

		console.log(player);
		console.log(enemy);
	});

	$("#attack").on("click", function(){
		if(pSelected == true && eSelected == true){
			$status.append(player.name + " Attacked " + enemy.name + " for " + player.AP + " damage. <br/>");
			$status.append(enemy.name + " Counter Attacked " + player.name +  " for " + enemy.CAP + " damage. <br/>");
			calcDamage();
			$("#player").children("#health").html(player.health);
			$("#enemy").children("#health").html(enemy.health);
			gameCheck();
		}
	});

});