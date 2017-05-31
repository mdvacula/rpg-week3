$(document).ready(function(){
	var player;
	var enemy;
	var pSelected = false;
	var eSelected = false;
	var $player = $("#player");
	var $enemy = $("#enemy");
	var $status = $("#gameStatus");


	var characters = [
	{
		name: "Luke Skywalker",
		pic: "assets/images/luke.jpeg",
		health: 100,
		AP:10 ,
		CAP: 0

	},
	{
		name: "Darth Vader",
		pic: "assets/images/vader.jpeg",
		health: 120,
		AP: 15,
		CAP: 25 
	},
	{
		name: "Jar Jar Binks",
		pic: "assets/images/jarjar.jpeg",
		health: 150,
		AP: 8 ,
		CAP: 0
	},
	{
		name: "Darth Sideous",
		pic: "assets/images/sidious.jpeg",
		health: 180,
		AP:0 ,
		CAP:0 
	}

	];

	for(var x=0;x< characters.length; x++){
		$newdiv = $("<div class='col-md-3 char'><h4 class='text-center'>"+ characters[x].name + "</h4><img class='img-responsive' src='"+ characters[x].pic +"'alt='"+characters[x].name+"'><p class='text-center' id='health'>" + characters[x].health + "</p></div>");
		
		$newdiv.attr("charIndex", x);
		$("#characters").append($newdiv);
	}

	$(".char").on("click", function(){
		$input = $(this);
		
		if(pSelected == false){
			player = characters[$input.attr("charIndex")];
			$player.replaceWith($input.clone().attr("id", "player"));
			$input.remove();
			pSelected = true;
		}

		else if(eSelected == false){
			enemy = characters[$input.attr("charIndex")];
			$enemy.replaceWith($input.clone().attr("id","enemy"));
			$input.remove();
			eSelected = true;
		}

		else{
			//do nothing
		}

		console.log(player);
		console.log(enemy);
	});

	$("#attack").on("click", function(){
		if(pSelected == true && eSelected == true){
			$status.append(player.name + " Attacked " + enemy.name + "<br/>");
			$status.append(enemy.name + " Counter Attacked " + player.name + "<br/>");
		}
	});

});