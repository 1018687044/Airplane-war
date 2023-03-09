var my =document.getElementById('my')
var content =document.getElementById('content')
var cover =document.getElementById('cover')
var star =document.getElementById('star')
var main =document.getElementById('main')
var score =document.getElementById('score')
var last =document.getElementById('last')
var lastscore =document.getElementById('lastscore')
	let f1 =0
	let f2 =0
	let f3 =0
	let sum =0
var flag=false
let timmer =null
	  function gameover(){
		const enemys =document.getElementsByClassName('enemy')
		for(let i=0;i<enemys.length;i++){
			if((my.offsetLeft+66>enemys[i].offsetLeft)
			&&(my.offsetLeft<enemys[i].offsetLeft+enemys[i].offsetWidth)
			&&(my.offsetTop+80>enemys[i].offsetTop)
			&&(my.offsetTop<enemys[i].offsetTop+enemys[i].offsetHeight)){
				my.style.background='url(image/本方飞机爆炸.gif)'
				clearInterval(timer)
				lastscore.innerText=score.innerText
				last.style.display='block'
				break
			}
			
			
		}
	}
	
//开始
star.onclick=function(){
	cover.style.display='none'
	var mainbgPstY=0
	let num =0
	timer = setInterval(function(){
		// 删掉已经完成使命的标签
		const finishs =main.getElementsByClassName('finish')
		for(let i=0;i<finishs.length;i++){
			finishs[i].remove()
			
			
		}
		
		
		mainbgPstY++
		if(mainbgPstY>568){
			mainbgPstY=0
		}
		main.style.backgroundPositionY=mainbgPstY+'px'
		
		
		num++
		if(num>1000){
			num=0
		}
		let toumin =false;
		if(my.getAttribute('wudi')>0){
			my.setAttribute('wudi',my.getAttribute('wudi')-1)
			my.style.opacity='0.5'
			if(my.getAttribute('wudi')>30){
				toumin =true
			}else if(my.getAttribute('wudi')%5===0){
				toumin=!toumin
			}
			
		}else{
			toumin =false
			gameover()
		}
		
		if(toumin){
			my.style.opacity='0.5'
		}else{
			my.style.opacity='1'
		}
		fj(num)
		buliet()
	},100)
	    
	
}

//飞机移动
	my.addEventListener('mousedown',function(j){
		flag=true
        content.onmousemove=function(i){
		if(flag){
		my.style.left=i.pageX-content.offsetLeft-j.offsetX+'px'
		my.style.top =i.pageY-content.offsetTop -j.offsetY+'px'
			
			if(my.offsetLeft<=0){
				my.style.left='0px'
			}
			
			else if(my.offsetLeft+my.offsetWidth>=content.offsetWidth){
				my.style.left=content.offsetWidth-my.offsetWidth+'px'
			}
			
			if(my.offsetTop<=0){
				my.style.top='0px'
			}
			
			else if(my.offsetTop+my.offsetHeight>=content.offsetHeight){
				my.style.top=content.offsetHeight-my.offsetHeight+'px'
			}
			
			
		}
		
		
		
	}
	
} )

document.addEventListener('mouseup',function(){
	flag=false	
	})


	
	
var	buliet =function(){
	//给飞机加子弹
	
		const bulietImg=document.createElement('img')
		bulietImg.className='buliet'
		bulietImg.src='image/bullet1.png'
		bulietImg.style.left=my.offsetLeft+30+'px'
		bulietImg.style.top=my.offsetTop+'px'
		main.appendChild(bulietImg)
		
		if(my.getAttribute('three')>0){
			my.setAttribute('three',my.getAttribute('three')-1)
			const bulietImgLeft=document.createElement('img')
			bulietImgLeft.className='buliet'
			bulietImgLeft.src='image/bullet1.png'
			bulietImgLeft.style.left=my.offsetLeft+10+'px'
			bulietImgLeft.style.top=my.offsetTop+30+'px'
			main.appendChild(bulietImgLeft)
			
			const bulietImgRight=document.createElement('img')
			bulietImgRight.className='buliet'
			bulietImgRight.src='image/bullet1.png'
			bulietImgRight.style.left=my.offsetLeft+50+'px'
			bulietImgRight.style.top=my.offsetTop+30+'px'
			main.appendChild(bulietImgRight)
		}
	//让子弹飞
		var buliets =main.getElementsByClassName('buliet')
		for(let i=0;i<buliets.length;i++){
			let bulietOver=false
			buliets[i].style.top=buliets[i].offsetTop-14 +'px'
	//子弹超出上边界时消失		
			if(buliets[i].offsetTop-14<0){
				buliets[i].className='buliet finish'
			}
			
			if(bulietOver){
				continue
			}
			
			//一号飞机 打爆炸效果
			const fly1s=main.getElementsByClassName('enemy1')
			for(let j=0;j<fly1s.length;j++){
				if((buliets[i].offsetLeft+6>fly1s[j].offsetLeft)
				&&(buliets[i].offsetLeft<fly1s[j].offsetLeft+34)
				&&(buliets[i].offsetTop<fly1s[j].offsetTop+24)
				&&(buliets[i].offsetTop+14>fly1s[j].offsetTop)){
					fly1s[j].src='image/xiaobaozha.gif'
					buliets[i].style.display='none'
					buliets[i].className='buliet finish'
					
					let a =Math.floor(Math.random()*4)
					// console.log(a)
					if(a){
						var buff =document.createElement('div')
						buff.className ='buff'
						if(a===1){
							buff.style.backgroundColor="red"
						}
						else if(a===2){
							buff.style.backgroundColor="blue"
						}
						else if(a===3){
							buff.style.backgroundColor="green"
						}
						buff.style.left=fly1s[j].offsetLeft+50+'px'
						buff.style.top=fly1s[j].offsetTop+77+'px'
						main.appendChild(buff)
						

					}
					
					
					fly1s[j].className='fly1 finish'
					score.innerText++
					sum=sum+f1
					bulietOver=true
					break
				}
			}
			var buffs =main.getElementsByClassName('buff')
			for(let i=0;i<buffs.length;i++){
				if((my.offsetLeft+66>buffs[i].offsetLeft)
				&&(my.offsetLeft<buffs[i].offsetLeft+10)
				&&(my.offsetTop+80>buffs[i].offsetTop)
				&&(my.offsetTop<buffs[i].offsetTop+10)){
					buffs[i].style.display='none'
	//红色buff效果				
					if(buffs[i].style.backgroundColor==='red'){
						const fly1s =main.getElementsByClassName('enemy1')
						const fly2s =main.getElementsByClassName('enemy2')
						const fly3s =main.getElementsByClassName('enemy3')
						
						for(let j= 0 ;j<fly1s.length;j++){
							fly1s[j].src='image/xiaobaozha.gif'
							score.innerText++
							fly1s[j].className='fly1 finish'
						}
						for(let j= 0 ;j<fly2s.length;j++){
							fly2s[j].src='image/dabaozha.gif'
							score.innerText=Number(score.innerText)+15
							fly2s[j].className='fly2 finish'
						}
						for(let j= 0 ;j<fly3s.length;j++){
							fly3s[j].src='image/zhongbaozha.gif'
							score.innerText=Number(score.innerText)+10
							fly3s[j].className='fly3 finish'
						}
					}
					
	//蓝色buff效果
					else if(buffs[i].style.backgroundColor==='blue'){
						my.setAttribute('three',100)
					}
	//绿色buff效果				
					if(buffs[i].style.backgroundColor==='green'){
						my.setAttribute('wudi',100)
					}
					
					
					
	//捡到buff后buff消失并跳出循环				
					buffs[i].className='buff finish'
					break
				}
				
			}
			if(my.getAttribute('wudi')<0){
				gameover()
			}
			//二号飞机 打爆炸效果
			const fly2s=main.getElementsByClassName('enemy2')
			for(let j=0;j<fly2s.length;j++){
				if((buliets[i].offsetLeft+6>fly2s[j].offsetLeft)
				&&(buliets[i].offsetLeft<fly2s[j].offsetLeft+110)
				&&(buliets[i].offsetTop<fly2s[j].offsetTop+164)
				&&(buliets[i].offsetTop+14>fly2s[j].offsetTop)){
					fly2s[j].src='image/daaida.png'
					buliets[i].style.display='none'
					buliets[i].className='buliet finish'
					
				fly2s[j].setAttribute('blood',fly2s[j].getAttribute('blood')-1)
				if(fly2s[j].getAttribute('blood')<=0){
					fly2s[j].src='image/dabaozha.gif'
					
					// let a =Math.floor(Math.random()*4)
					// console.log(a)
					// if(a){
					// 	var buff =document.createElement('div')
					// 	buff.className ='buff'
					// 	if(a===1){
					// 		buff.style.backgroundColor="red"
					// 	}
					// 	else if(a===2){
					// 		buff.style.backgroundColor="blue"
					// 	}
					// 	else if(a===3){
					// 		buff.style.backgroundColor="green"
					// 	}
					// 	buff.style.left=fly2s[j].offsetLeft+50+'px'
					// 	buff.style.top=fly2s[j].offsetTop+77+'px'
					// 	main.appendChild(buff)
						

					// }
					
					fly2s[j].className='fly2 finish'
					score.innerText=Number(score.innerText)+15
					
				}else{
					fly2s[j].src='image/daaida.png'
				}
				buliets[i].className='buliet finish'
				break
					
				bulietOver=true
				}
			}
			// var buffs =main.getElementsByClassName('buff')
			// for(let i=0;i<buffs.length;i++){
			// 	if((my.offsetLeft+66>buffs[i].offsetLeft)
			// 	&&(my.offsetLeft<buffs[i].offsetLeft+10)
			// 	&&(my.offsetTop+80>buffs[i].offsetTop)
			// 	&&(my.offsetTop<buffs[i].offsetTop+10)){
			// 		buffs[i].style.display='none'
					
			// 		if(buffs[i].style.backgroundColor==='red'){
			// 			const fly1s =main.getElementsByClassName('enemy1')
			// 			const fly2s =main.getElementsByClassName('enemy2')
			// 			const fly3s =main.getElementsByClassName('enemy3')
						
			// 			for(let j= 0 ;j<fly1s.length;j++){
			// 				fly1s[j].src='image/xiaobaozha.gif'
			// 				score.innerText++
			// 				fly1s[j].className='fly1 finish'
			// 			}
			// 			for(let j= 0 ;j<fly2s.length;j++){
			// 				fly2s[j].src='image/dabaozha.gif'
			// 				score.innerText=Number(score.innerText)+15
			// 				fly2s[j].className='fly2 finish'
			// 			}
			// 			for(let j= 0 ;j<fly3s.length;j++){
			// 				fly3s[j].src='image/zhongbaozha.gif'
			// 				score.innerText=Number(score.innerText)+10
			// 				fly3s[j].className='fly3 finish'
			// 			}
			// 		}
					
					
			// 		buffs[i].className='buff finish'
			// 		break
					
			// 	}
				
			// }
			
			
			//三号飞机 打爆炸效果
			const fly3s=main.getElementsByClassName('enemy3')
			for(let j=0;j<fly3s.length;j++){
				if((buliets[i].offsetLeft+6>fly3s[j].offsetLeft)
				&&(buliets[i].offsetLeft<fly3s[j].offsetLeft+46)
				&&(buliets[i].offsetTop<fly3s[j].offsetTop+60)
				&&(buliets[i].offsetTop+14>fly3s[j].offsetTop)){
					fly3s[j].src='image/zhongaida.png'
					buliets[i].style.display='none'
					buliets[i].className='buliet finish'
					
				fly3s[j].setAttribute('blood',fly3s[j].getAttribute('blood')-1)
				if(fly3s[j].getAttribute('blood')<=0){
					fly3s[j].src='image/zhongbaozha.gif'
					fly3s[j].className='fly3 finish'
					score.innerText=Number(score.innerText)+5
					
				}else{
					fly3s[j].src='image/zhongaida.png'
				}
				buliets[i].className='buliet finish'
				break
				
				f3+=3
				bulietOver=true
				}
			}
			
			
			
			

		}
		
}

//敌人移动


// var fly1=document.getElementById('enemy_1')
// var fly2=document.getElementById('enemy_2')
// var fly3=document.getElementById('enemy_3')


var fj =function(num){

	
	
	
	//一号飞机
	if(num%5===0){
		var fly1 = document.createElement('img')
		fly1.className='enemy1 enemy'
		fly1.src='image/enemy1_fly_1.png'
		fly1.style.top=-24+'px'
		fly1.style.left=Math.random()*286+'px'
		main.appendChild(fly1)
		
	}
		
		const fly1s =main.getElementsByClassName('enemy1')
		for(let i=0;i<fly1s.length;i++){
			fly1s[i].style.top=fly1s[i].offsetTop+7+'px'
			
			if(fly1s[i].offsetTop>528){
				fly1s[i].className='fly1 finish'
			}
			
		}
		// if(my.offsetLeft-fly1s[i].offsetLeft<&&)
		
		
	//二号飞机 （随机产生飞机，飞机移动）
	if(num%100===0){
		var fly2 = document.createElement('img')
		fly2.className='enemy2 enemy'
		fly2.src='image/enemy2_fly_1.png'
		fly2.style.top=-164+'px'
		fly2.style.left=Math.random()*210+'px'
		fly2.setAttribute('blood',30)
		main.appendChild(fly2)
	}
	
	var fly2s =main.getElementsByClassName('enemy2')
	for(let i=0;i<fly2s.length;i++){
		fly2s[i].style.top=fly2s[i].offsetTop+2+'px'
		if(fly2s[i].offsetTop>404){
			fly2s[i].className='fly2 finish'
		}
		
	}
	//三号飞机
	if(num%20===0){
		var fly3 = document.createElement('img')
		fly3.className='enemy3 enemy'
		fly3.src='image/enemy3_fly_1.png'
		fly3.style.top=-60+'px'
		fly3.style.left=Math.random()*274+'px'
		fly3.setAttribute('blood',15)
		main.appendChild(fly3)
	}
	
	var fly3s =main.getElementsByClassName('enemy3')
	for(let i=0;i<fly3s.length;i++){
		fly3s[i].style.top=fly3s[i].offsetTop+5+'px'
		
		if(fly3s[i].offsetTop>508){
			fly3s[i].className='fly3 finish'
		}
		
	}
	
	
	
}

