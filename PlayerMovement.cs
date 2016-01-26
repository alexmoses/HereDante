using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour {

	public float speed;
	Animator anim;
	private Rigidbody rb;
	public float MaxTurnSpeed;

	void Start ()
	{
		anim = GetComponent<Animator>();
		rb = GetComponent<Rigidbody>();

	}
	
	void FixedUpdate ()
	{
		float moveHorizontal = Input.GetAxis ("Horizontal");
		float moveVertical = Input.GetAxis ("Vertical");

		//Vector3 movement = new Vector3 (moveHorizontal, 0.0f, moveVertical);
		Vector3 targetDirection = new Vector3(moveHorizontal, 0f, moveVertical);
		targetDirection = Camera.main.transform.TransformDirection(targetDirection);
		targetDirection.y = 0.0f;

		rb.AddForce (targetDirection * speed);


		if (Input.GetKeyDown ("w"))
			   anim.SetBool ("IsWalking", true);
		
		
		else if (Input.GetKeyUp ("w"))
			
			anim.SetBool ("IsWalking", false);
		else if (Input.GetKeyDown ("a"))
			anim.SetBool ("IsWalking", true);
		
		
		else if (Input.GetKeyUp ("a"))
			
			anim.SetBool ("IsWalking", false);
		else if (Input.GetKeyDown ("s"))
			anim.SetBool ("IsWalking", true);
		
		
		else if (Input.GetKeyUp ("s"))
			
			anim.SetBool ("IsWalking", false);
		else if (Input.GetKeyDown ("d"))
			anim.SetBool ("IsWalking", true);
		
		
		else if (Input.GetKeyUp ("d"))
			
			anim.SetBool ("IsWalking", false);
		



	}
	void LateUpdate () {
		Vector3 newpos = transform.position; 
		newpos.y = Terrain.activeTerrain.SampleHeight(transform.position);
		transform.position = newpos;
	}
}