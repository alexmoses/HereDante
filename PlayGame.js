#pragma strict
var isQuitButton = false;

function OnMouseEnter(){
GetComponent.<Renderer>().material.color = Color.cyan;
}
function OnMouseExit(){
GetComponent.<Renderer>().material.color = Color.white;
}
function onMouseExit()
{
if( isQuitButton )
{
Application.Quit();
}

else{
Application.LoadLevel(1);
Debug.Log("Drag ended!");
}
}