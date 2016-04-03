/*
 * Of course, the code is awful :/
 * I should improve but that's for a next episode
*/

		var mousex , mousey , mousse = 0;
		var score_game = new Array(6);
		var highscore_game = new Array(6);
		var hp_game = new Array(4);

		var bx = 0 , bleeding = 0 , bleed_time = 0;
		var hpgod = 0, chainx = 0;
		var attacking = 0;
		var firefox_os = 0;
		
		/* temporary variables */
		var sc , sc2;


window.onload = function() 
{
		var canvas = document.getElementById('canvas')
		var canvas_draw = canvas.getContext('2d'); // A layer for the background
		var precalculated_fps = 1000 / 90;
	  
		var back = new Image();
		var derpyfaible = new Image();
		var fist = new Image();
		var gameover_1 = new Image();
		var chif = new Image();
		var titlesc = new Image();
		var cha = new Image();
		var choos = new Image();
		var choos2 = new Image();
		var gameover_2 = new Image();
		var high_image = new Image();
		var blood_img = new Image();
		var blood_img2 = new Image();
	   
		back.src = 'img/back.png';
		derpyfaible.src = 'img/derp.png';
		fist.src = 'img/fist.png';
		gameover_1.src = 'img/rip_2.png';
		chif.src = 'img/chif.png';
		titlesc.src = 'img/tit.png';
		cha.src = 'img/chain.png';
		choos.src = 'img/choose.png';
		choos2.src = 'img/pun.png';
		gameover_2.src = 'img/rip_1.png';
		high_image.src = 'img/highscore.png';
		blood_img.src = 'img/blood.png';
		blood_img2.src = 'img/blood2.png';
	   
		var sourceX = 0, sourceY = 260;
		var sourceWidth = 240, sourceHeight = 260;
		var destWidth = sourceWidth, destHeight = sourceHeight;
		var derpyX = 0, derpyY = 70;
		var timeanim = 0;
		var temp_derpyX = 0 , temp_derpyY = 0;
		var derpyhp = 999;
		var attack = 0;
		var punchx = 150 , punchy = 40;
		var game_state = 0;
		var score_count = 0;
		var highscore = 0;
		var derpydegre = 0;
		var attack_time = 0;
		var tron_duree = 0;
		var weapon = 0;
		var attack_d = 0;
		
		if (!buzz.isSupported()) 
		{
			alert("Your browser is too old, time to update!");
		}
		
		if (!buzz.isOGGSupported()) 
		{
			alert("Your browser doesn't support OGG Format...");
		}

		var mus_gameover = new buzz.sound("sounds/gameover.ogg");
		var snd_punch = new buzz.sound("sounds/punch.ogg");
		var snd_derpy = new buzz.sound("sounds/derpy.ogg");
		var snd_chainsaw = new buzz.sound("sounds/chainsaw.ogg");
		var snd_crack = new buzz.sound("sounds/snd_crack.ogg");
		var snd_crack2 = new buzz.sound("sounds/rip2.ogg");
		var snd_ripsfx = new buzz.sound("sounds/rip.ogg");
		
		mus_gameover.load();
		snd_punch.load();
		snd_derpy.load();
		snd_chainsaw.load();
		snd_crack.load();
		snd_crack2.load();
		snd_ripsfx.load();
		
		highscore_game[0] = localStorage.getItem("high-score_game[0]") || 0; 
		highscore_game[1] = localStorage.getItem("high-score_game[1]") || 0; 
		highscore_game[2] = localStorage.getItem("high-score_game[2]") || 0; 
		highscore_game[3] = localStorage.getItem("high-score_game[3]") || 0; 
		highscore_game[4] = localStorage.getItem("high-score_game[4]") || 0;

		
		if (window.innerWidth==320 && window.innerWidth == 480)
		{
			firefox_os = 1;
		}

		game_state = 2;
		
	  (function (window) 
	  { // Used for dah loop
			function gameLoop() 
			{
				/* Faster way of clearing the canvas screen*/
				canvas.height = canvas.height;
				
				switch(game_state)
				{
					// Titlescreen
					case 2:
						canvas_draw.drawImage(titlesc, 0, 0);
						canvas_draw.drawImage(high_image, 2, 250);
						
						for(i=0;i<5;i++)
						{
							canvas_draw.drawImage(chif, (24*highscore_game[i]), 96, 24, 32, 0+(i*20), 275, 24, 32);
						}
						
						if (mousse == 1)
						{
							derpyhp = 999;
							score_count = 0;
							tron_duree = 0;
							weapon = 0;
							mousse = 0;
							game_state = 0;
							attacking = 0;
							temp_derpyX = 0;
							temp_derpyY = 0;
						}
						
					break;
					// Game over screen
					case 1:
							switch(weapon)
							{
								case 0:
									canvas_draw.drawImage(gameover_1, 0, 0);
								break;
								default:
									canvas_draw.drawImage(gameover_2, 0, 0);
								break;
							}
							
							for(i=0;i<5;i++)
							{
								canvas_draw.drawImage(chif, (24*score_game[i])	  , 64, 24, 32, 0+(i*20), 240, 24, 32);
								canvas_draw.drawImage(chif, (24*highscore_game[i]), 96, 24, 32, 0+(i*20), 285, 24, 32);
							}
								
							attack_time = attack_time + 1;			
							if (attack_time > 140)
							{
								if (score_count > highscore)
								{
									highscore = score_count;
									sc = highscore;
									sc2 = ((sc / 10000) % 10 << 0);
									highscore_game[0]=localStorage.setItem("high-score_game[0]",sc2);
									sc2 = (sc / 1000) % 10 << 0;
									highscore_game[1]=localStorage.setItem("high-score_game[1]",sc2);
									sc2 = (sc / 100) % 10 << 0;
									highscore_game[2]=localStorage.setItem("high-score_game[2]",sc2);
									sc2 = (sc / 10) % 10 << 0;
									highscore_game[3]=localStorage.setItem("high-score_game[3]",sc2);
									sc2 = sc%10 << 0;
									highscore_game[4]=localStorage.setItem("high-score_game[4]",sc2);
									alert("You beat the highscore! "+highscore+" pts!");
								}
								else
								{
									alert("Highscore : "+highscore+". You scored "+score_count+"pts!");
								}
								
								attack_time = 0;
								derpyhp = 999;
								attack = 0;
								punchx = 150 , punchy = 40;
								derpydegre = 0;
								timeanim = 0;
								sourceX = 0;
								sourceY = 0;
								derpyX = 0;
								derpyY = 70;
								score_count = 0;
								mousse = 0;
								mus_gameover.stop();
								highscore_game[0] = localStorage.getItem("high-score_game[0]") || 0; 
								highscore_game[1] = localStorage.getItem("high-score_game[1]") || 0; 
								highscore_game[2] = localStorage.getItem("high-score_game[2]") || 0; 
								highscore_game[3] = localStorage.getItem("high-score_game[3]") || 0; 
								highscore_game[4] = localStorage.getItem("high-score_game[4]") || 0;
								$('body').css('background-image', 'url(img/tit.png)');
								game_state = 2;
							}
				
					break;
					case 0: //In-Game
						canvas_draw.drawImage(back, 0, 0);
						timeanim = timeanim + 1; // This is used for animating Derpy (Timing)
						
						score_convert();

						if (derpyhp > 999) 
						{
							derpyhp = 999;
							tron_duree = 0;
						}

						if (attack < 4)
						{
							if (tron_duree < 6) {
								derpyhp=derpyhp+2;
							}
							else if (tron_duree > 5 && tron_duree < 20) {
								derpyhp=derpyhp+2;
							}
							else if (tron_duree > 20 && tron_duree < 30) {
								derpyhp=derpyhp+1;
							}
							else if (tron_duree > 29)
							{
								derpyhp=derpyhp+1;
								tron_duree=tron_duree-0.5;
							}
							if (tron_duree < 10 && tron_duree > 0) tron_duree=tron_duree-1;
						}

						if (sourceX > 719){
							sourceX = 0;
							timeanim = 0;
						}
					
			
						if (attack == 0)
						{
							if (timeanim > 8)
							{
								sourceX = sourceX + 240;
								timeanim = 0;
							}
							
							if (tron_duree > 20 && tron_duree < 49)
							{
								sourceY = 260;
							}
							else if (tron_duree > 48)
							{
								sourceY = 1040;
							}
							else
							{
								sourceY = 0;
							}
							
						}
						else if (attack > 0 && attack < 4)
						{
							if (timeanim > 2)
							{
								if (sourceX > 479) sourceX = 480;
								else sourceX = sourceX + 240;
								timeanim = 0;
							}
							
							// Change Derpy sprite depending on its status
							// Bleeding
							sourceY = (tron_duree > 48) ? 1300 :  520;
						}
				
						/* Color of HP text depending on the poney's HP*/
						hpgod = (derpyhp < 500) ? 32 : 0;
				
						if (weapon == 0) // If you have the fist
						{ 
							
							if((attacking == 1) && attack == 0)
							{
								bleeding = 1;
								snd_punch.play();
								derpyX = 0;
								derpyY = 70;
								punchx = 150; 
								punchy = 40;
								timeanim = 0;
								sourceX = 0;
								
								if (score_count < 90) aug = 3;
								if (score_count > 89 && score_count < 1000) aug = 4;
								if (score_count > 999 && score_count < 5000) aug = 5;
								if (score_count > 4999) aug = 20;
								 
								if (score_count < 2000){
									if (derpyhp > 600) {score_count = score_count + 1+aug;}
									if (derpyhp > 400 && derpyhp < 600) {score_count = score_count + 3+aug;}
									if (derpyhp > 200 && derpyhp < 400) {score_count = score_count + 5+aug;}
									if (derpyhp > 200 && derpyhp < 400) {score_count = score_count + 8+aug;}
									if (derpyhp > 140 && derpyhp < 200) {score_count = score_count + 10+aug;}
									else if (derpyhp < 150) { score_count = score_count + 20+aug; }
								}
								else{
									if (derpyhp < 140) {score_count = score_count + 10* aug;}
								}
								
								 attacking = 2;
								 attack = 1;
							}
							else if (attack == 1)
							{
								attack_time = attack_time + 1;
								derpydegre = derpydegre - 0.015;
								derpyX = derpyX - 25;
								derpyY = derpyY + 30;
								punchx = punchx - 30;
								punchy = punchy + 26;
								
								if (attack_time > 5)
								{
										derpyhp = derpyhp - 130;
										attack_time = 0;
										attack = 2;
								}
							}
							else if (attack == 2)
							{
								attack_time = attack_time + 1;
								derpydegre = derpydegre + 0.015;
								derpyX = derpyX + 25;
								derpyY = derpyY - 30;
								punchx = punchx + 30;
								punchy = punchy - 26;
									if (attack_time > 5)
									{
										attacking = 0;
										mousse = 0;
										keyispressed = 0;
										derpydegre = 0;
										derpyX = 0;
										derpyY = 70;
										punchx = 150; 
										punchy = 40;
										attack_time = 0;
										attack = 0;
									}
							}
							
						}
						else if (weapon == 1){ // If you have the chainsaw
							
							if((attacking == 1) && attack == 0)
							{
								bleeding = 2;
								attack_d = 0;
								snd_crack.play();
								snd_chainsaw.play();
								tron_duree = tron_duree + 1;
								derpyX = 0;
								derpyY = 70;
								punchx = 150; 
								punchy = 40;
								timeanim = 0;
								sourceX = 0;
								attacking = 2;
								attack = 1;
							}
							else if (attack == 1)
							{
								attack_time = attack_time + 1;
								derpydegre = derpydegre - 0.012;
								derpyX = derpyX - 8;
								derpyY = derpyY + 5;
								punchx = punchx - 30;
								punchy = punchy + 32;

								if (attack_time > 5)
								{
									attack_time = 0;
									attack = 2;
								}
							}
							else if (attack == 2)
							{
								attack_time = attack_time + 1;
								tron_duree = tron_duree + 1.5;
								 
								 if (mousse == 1)
								 {
								
									if (tron_duree > 48 && attack_d == 0){
										snd_crack.stop();
										snd_crack2.play().loop();
										attack_d = 1;
									}
								 
									 derpyhp = derpyhp - 7;
										if (score_count < 90){
											if (derpyhp < 800) {score_count = score_count + 4;}
											}
											if (score_count > 89 && score_count < 1000){
											if (derpyhp < 700) {score_count = score_count + 6;}
											}
											if (score_count > 999 && score_count < 5000){
											if (derpyhp < 500) {score_count = score_count + 8;}
											}
											if (score_count > 4999){
											if (derpyhp < 100) {score_count = score_count + 20;}
										}

										if (attack_time > 2)
										{
											if (chainx == 0) chainx = chainx + 175;
											else chainx = 0;
										}
								
								 }
								 else if (mousse == 0)
								 {
									derpydegre = derpydegre + 0.012;
									derpyX = derpyX + 17;
									derpyY = derpyY - 5;
									punchx = punchx + 30;
									punchy = punchy - 26;
									
										if (attack_time > 5)
										{
											attacking = 0;
											bleeding = 0;
											mousse = 0;
											keyispressed = 0;
											derpydegre = 0;
											derpyX = 0;
											derpyY = 70;
											punchx = 150; 
											punchy = 40;
											attack_time = 0;
											attack = 0;
											if (attack_d == 0) snd_crack.stop();
											else snd_crack2.stop();
											snd_chainsaw.stop();
										}
								 }
							 
							}
							
						}

							if (derpyhp < 1 && attack < 4) // if Derpy HP is below 1 HP
							{
								if (weapon == 1) sourceY = 780;
								derpyhp = 0;
								attack_time = 0;
								bleeding = 0;
								snd_chainsaw.stop();
								if (attack_d == 0) snd_crack.stop();
								else snd_crack2.stop();
								snd_derpy.play();
								snd_ripsfx.play();
								attack = 4;
							}
							

						
							if (attack == 4) // Derpy's dead and the animation is different if you have the chainsaw for example
							{
									if (temp_derpyX == 0) 
									{
										temp_derpyX = derpyX;
										bleed_time = 0;
										bx = 0;
										bleeding = 3;
									}
									if (temp_derpyY == 0) temp_derpyY = derpyY;	
								   
									switch (weapon) // if you chose the chainsaw , Derpy's head will fly around
									{
										case 1:
											derpydegre = derpydegre + 0.003;
											derpyX = derpyX + 10;
											derpyY = derpyY - 4;
											sourceY = 780;
										break;
										case 0:
											derpydegre = derpydegre - 0.0001;
											derpyX = derpyX - 5;
											derpyY = derpyY - 2;
										break;
									}
								
									if (timeanim > 2)
									{
										sourceX = sourceX + 240;
										timeanim = 0;
									}
									
									if ( (derpyX < -600) || (derpyX > 640) )
									{
										mus_gameover.play().loop();
										game_state = 1;
										attack = 0;
									}

									canvas_draw.drawImage(derpyfaible, 0, 1560, sourceWidth, sourceHeight, temp_derpyX, temp_derpyY, destWidth, destHeight);
									canvas_draw.save();
									canvas_draw.translate(120, 200);
									canvas_draw.rotate(derpydegre*10); // rotate by 47 degrees and convert to radians
									canvas_draw.translate(-120, -200);
							}
							
							canvas_draw.drawImage(derpyfaible, sourceX, sourceY, sourceWidth, sourceHeight, derpyX+117 - sourceWidth / 2, derpyY+130 - sourceHeight / 2 , destWidth, destHeight);
							
							if (attack == 4) 
							{
								canvas_draw.restore();
							}
				
						   if ((mousex > 480-128 && mousey > 0 && mousey < 160) && weapon == 1 && attack == 0){
							   bleeding = 0;
							   snd_chainsaw.stop();
							   snd_crack.stop();
							   weapon = 0;
							   attacking = 0;
							   mousse = 0;
						   }
						   else if ((mousex > 480-128 && mousey > 160) && weapon == 0 && attack == 0){
							   bleeding = 0;
							   snd_chainsaw.stop();
							   snd_crack.stop();
							   weapon = 1;
							   attacking = 0;
							   mousse = 0;
						   }
						   else if (attacking == 0 && mousse == 1 && (mousex < 375) && derpyY == 70){
							 attacking = 1;
						   }
					   
						   if (chainx > 175) chainx = 0;
						   
					   
						   switch (bleeding)
						   {
								case 1:
									canvas_draw.drawImage(blood_img, bx*240, 0, 240, 260, derpyX+40, derpyY+30 , 240, 260);
									canvas_draw.drawImage(blood_img, bx*240, 0, 240, 260, derpyX+20, derpyY-15 , 240, 260);
									bleed_time++;
									if (bleed_time > 4){
										bx = bx + 1;
										bleed_time = 0;
										if (bx > 2){
											bleeding = 0;
											bx = 0;
										}
									}
								break;
								case 2:
									canvas_draw.drawImage(blood_img, bx*240, 0, 240, 260, derpyX+20, derpyY+30 , 240, 260);
									canvas_draw.drawImage(blood_img, bx*240, 0, 240, 260, derpyX+20, derpyY-15 , 240, 260);
									canvas_draw.drawImage(blood_img2, bx*240, 0, 240, 260, derpyX+20, derpyY-15 , 240, 260);
									canvas_draw.drawImage(blood_img, bx*240, 0, 240, 260, derpyX, derpyY+20 , 240, 260);
									bleed_time++;
									if (bleed_time > 1){
										bx = bx + 1;
										bleed_time = 0;
										if (bx > 2) bx = 0;
									}
								break;
								case 3:
									canvas_draw.drawImage(blood_img2, bx*240, 0, 240, 260, temp_derpyX+10, temp_derpyY+30 , 240, 260);
									canvas_draw.drawImage(blood_img2, bx*240, 0, 240, 260, temp_derpyX+5, temp_derpyY-15 , 240, 260);
									bleed_time++;
									if (bleed_time > 4){
										bx = bx + 1;
										bleed_time = 0;
										if (bx > 16){
											bleeding = 0;
											bx = 0;
										}
									}
								break;
						  }
					  
							switch (weapon)
							{
								case 0:
									canvas_draw.drawImage(fist,punchx,punchy);
									canvas_draw.drawImage(choos,480-128,160);
								break;
								case 1:
									canvas_draw.drawImage(cha, chainx, 0, 175, 170, punchx, punchy, 175, 170);
									canvas_draw.drawImage(choos2,480-128,0);
								break;
							}
				 
							for(i=0;i<5;i++)
							{
								canvas_draw.drawImage(chif, score_game[i]*24, 64, 24, 32, 30+(i*20), 285, 24, 32);
							}
						   
							for(i=0;i<3;i++)
							{
								canvas_draw.drawImage(chif, hp_game[i]*24, hpgod, 24, 32, derpyX+80+(i*20), derpyY, 24, 32);
							}
					
					
					break;
					
				}
			}	

		  if (firefox_os == 0)
		  {
				window.addEventListener("resize", resizeGame);
				resizeGame();
		  }
  
		window.setInterval(gameLoop, precalculated_fps); // 30fps
	}
	(window));
          

	function resizeGame () 
	{
		canvas.style.width = window.innerWidth + 'px';
		canvas.style.height = window.innerHeight + 'px';
	};
		  	   
	function score_convert()
	{
		// Utilisé pour afficher le score et le nombre de vies grâce aux images	
		scored = score_count;	
		score_game[0]= ((scored / 10000) % 10) << 0;
		score_game[1]= ((scored / 1000) % 10) << 0;
		score_game[2]= ((scored / 100) % 10) << 0;
		score_game[3]= ((scored / 10) % 10) << 0;
		score_game[4]= (scored % 10) << 0;
						
		hp_game[0]= ((derpyhp / 100) % 10) << 0;
		hp_game[1]= ((derpyhp / 10) % 10) << 0;
		hp_game[2]= (derpyhp % 10) << 0;	
	}
	
	function refresh_highscore()
	{
		for(i=0;i<5;i++)
			highscore_game[i]=highscore_game[i] << 0;
	}

};
