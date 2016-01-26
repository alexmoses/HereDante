 
/*
 
AI Steering Behavior Script by Attilio Carotenuto - 2012 - All Rights Reserved
http://www.attiliocarotenuto.com
 
*/
 
#pragma strict
 
public var target : Transform;
 
public var moveSpeed : float = 19.0;
public var rotationSpeed : float = 3.0;
 
private var minDistance : int = 15;
private var safeDistance : int = 20;
 
enum AIState {Idle, Seek, Flee, Arrive, Pursuit, Evade}
public var currentState : AIState;
 
function Update () {
Evade();	
    switch(currentState){
        //case AIState.Idle:
         //   break;
       // case AIState.Seek:
          //  Seek();
         //  break;
        // case AIState.Flee:
           // Flee();
          //  break;
       // case AIState.Arrive:
       //     Arrive();
       //     break;
       // case AIState.Pursuit:
        //    Pursuit();
        //   break;
        case AIState.Evade:
           Evade();
         //  break;
    }
}
 
function Seek () : void{
    var direction : Vector3 = target.position - transform.position;
   direction.y = 0;
 
   transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
 
   if(direction.magnitude > minDistance){
 
      var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
 
      transform.position += moveVector;
 
   }
}
 
function Flee () : void{
    var direction : Vector3 = transform.position - target.position;
   direction.y = 0;
   
   if(direction.magnitude < safeDistance){
      transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
      var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
      transform.position += moveVector;
   }
}
 
function Arrive () : void{
    var direction : Vector3 = target.position - transform.position;
    direction.y = 0;
   
    var distance : float = direction.magnitude;
   
    var decelerationFactor : float = distance / 5;
   
    var speed : float = moveSpeed * decelerationFactor;
   
    transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
 
    var moveVector : Vector3 = direction.normalized * Time.deltaTime * speed;
    transform.position += moveVector;
}
 
function Pursuit () : void{
    var iterationAhead : int = 30;
   
    var targetSpeed = target.gameObject.GetComponent(MoveAI).instantVelocity;
   
    var targetFuturePosition : Vector3 = target.transform.position + (targetSpeed * iterationAhead);
   
    var direction : Vector3 = targetFuturePosition - transform.position;
    direction.y = 0;
 
   transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
 
   if(direction.magnitude > minDistance){
 
      var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
 
      transform.position += moveVector;
 
   }
}
 
function Evade () : void{
    var iterationAhead : int = 10;
   
    var targetSpeed = target.gameObject.GetComponent(MoveAI).instantVelocity;
   
    var targetFuturePosition : Vector3 = target.position + (targetSpeed * iterationAhead);
   
    var direction : Vector3 = transform.position - targetFuturePosition;
    direction.y = 0;
 
   transform.rotation = Quaternion.Slerp(transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
 
   if(direction.magnitude < safeDistance){
 
      var moveVector : Vector3 = direction.normalized * moveSpeed * Time.deltaTime;
 
      transform.position += moveVector;
 
   }
}
 