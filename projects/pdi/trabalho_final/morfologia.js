
var px_size = 9;
var dilate_color = "#0f5";
var erode_color = "#f00";


function setPixel(c, i, j, cor){
	var ctx = c.getContext("2d");
	ctx.fillStyle=cor;
	ctx.beginPath();
	ctx.fillRect(i*(px_size+1),j*(px_size+1),px_size,px_size);
	ctx.stroke();
}
function getPixel(c, i, j) {
    var ctx = c.getContext("2d");
	var pix = ctx.getImageData(i*(px_size+1)+px_size/2,j*(px_size+1)+px_size/2, 1, 1).data;
    var px= "#" + (pix[0]/16).toString(16)[0]+ (pix[1]/16).toString(16)[0]+ (pix[2]/16).toString(16)[0];
    //document.getElementById("demo").innerHTML =px;
    return px;
}
function quadricular(c){
  var ctx = c.getContext("2d");
  ctx.fillStyle="#888";
  ctx.beginPath();
  ctx.fillRect(0,0,c.width,c.height);
  ctx.stroke();
  for(var i=0;i<c.width/(px_size+1);i++)
    for(var j=0;j<c.height/(px_size+1);j++)
      setPixel(c,i,j,"#FFF");
}
function setPixel_mouse(c,e){
  	var ctx = c.getContext("2d");
	var X = e.offsetX;
    var Y = e.offsetY;
	var pix = ctx.getImageData(X,Y, 1, 1).data;
    var px= "#" + (pix[0]/16).toString(16)[0]+ (pix[1]/16).toString(16)[0]+ (pix[2]/16).toString(16)[0];
    if(px=="#000")
		setPixel(c,Math.floor(X/(px_size+1)),Math.floor(Y/(px_size+1)),"#fff");
    else if(px=="#fff")
		setPixel(c,Math.floor(X/(px_size+1)),Math.floor(Y/(px_size+1)),"#000");
}
/////////////////// tela de trabalho 1 (entrada) /////////////////////////////
  	var morph_input = document.getElementById("input");
  	quadricular(morph_input);
    for(var i=5;i<14;i++)
        for(var j=5;j<14;j++)
            setPixel(morph_input,i,j, "#000");
    for(var i=7;i<10;i++)
        for(var j=7;j<10;j++)
            setPixel(morph_input,i,j, "#fff");
    setPixel(morph_input,20,15, "#000");

/////////////////// mask /////////////////////////////
	var mask = document.getElementById("mask");
    var mask_size = Math.floor(mask.width/(px_size+1)); 
    quadricular(mask);
	setPixel(mask,Math.floor(mask_size/2),Math.floor(mask_size/2),"#0ff");
	setPixel(mask,Math.floor(mask_size/2)+1,Math.floor(mask_size/2),"#000");
	setPixel(mask,Math.floor(mask_size/2)-1,Math.floor(mask_size/2),"#000");
	setPixel(mask,Math.floor(mask_size/2),Math.floor(mask_size/2)+1,"#000");
	setPixel(mask,Math.floor(mask_size/2),Math.floor(mask_size/2)-1,"#000");
    
/////////////////// tela de trabalho 2 (saida) /////////////////////////////
  	var morph_output = document.getElementById("output");
  	quadricular(morph_output);

function clear_mat(){
    quadricular(morph_input);
    quadricular(morph_output);
}


function morph(erode){
  	quadricular(morph_output);
    var manter = document.getElementById("manter_in").checked;
    for(var i=0;i<morph_input.width/(px_size+1);i++)
      for(var j=0;j<morph_input.height/(px_size+1);j++){
		if(!erode){
            if(getPixel(morph_input,i,j) == "#000"){
                for(var im=-Math.floor(mask_size/2); im<=Math.floor(mask_size/2); im++)
                    for(var jm=-Math.floor(mask_size/2); jm<=Math.floor(mask_size/2); jm++){
                        if(getPixel(mask,Math.floor(mask_size/2)+im,Math.floor(mask_size/2)+jm) == "#000"){
                                if(getPixel(morph_input,i+im,j+jm) == "#fff")
                                    setPixel(morph_output,i+im,j+jm,dilate_color);
                        }
                        setPixel(morph_output,i,j,"#000");
                    }
            }	
        }//dilate
        else{
            if(getPixel(morph_input,i,j) == "#000"){
                setPixel(morph_output,i,j,"#000");
                for(var im=-Math.floor(mask_size/2); im<=Math.floor(mask_size/2); im++)
                    for(var jm=-Math.floor(mask_size/2); jm<=Math.floor(mask_size/2); jm++)
                        if(getPixel(mask,Math.floor(mask_size/2)+im,Math.floor(mask_size/2)+jm)=="#000")
                            if(getPixel(morph_input,i+im,j+jm) != "#000"){
                                setPixel(morph_output,i,j,erode_color);
                                break;
                            }
            }
        }
	}
    for(var i=0;i<morph_input.width/(px_size+1);i++)
      for(var j=0;j<morph_input.height/(px_size+1);j++){
        if(!manter){
            if(getPixel(morph_output,i,j) == "#000" || getPixel(morph_output,i,j) == "#fff")
                setPixel(morph_input,i,j,getPixel(morph_output,i,j));

            else if(getPixel(morph_output,i,j) == erode_color)
                setPixel(morph_input,i,j,"#fff");

            else if(getPixel(morph_output,i,j) == dilate_color)
                setPixel(morph_input,i,j,"#000");
            
        }
    }
}



