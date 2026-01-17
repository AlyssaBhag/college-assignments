using UnityEditor.Tilemaps;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 10;
    public int CharacterFacingDirection = 1;

    public Rigidbody2D RigidBody;
    public Animator animator;

    public PlayerCombat playerCombat;

    // Updates once called 50x frame.
    void UpdateDirections()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        if (horizontal > 0 && transform.localScale.x < 0 || horizontal < 0 && transform.localScale.x > 0)
        {
            FlipCharacter();
        }

            animator.SetFloat("horizontal", Mathf.Abs(horizontal));
        animator.SetFloat("vertical", Mathf.Abs(vertical));

        RigidBody.linearVelocity = new Vector2(horizontal, vertical) * speed;
    }

    void FlipCharacter()
    {
        CharacterFacingDirection *= -1;
        transform.localScale = new Vector3(transform.localScale.x * -1, transform.localScale.y, transform.localScale.z);
    }

    private void Update()
    {
        UpdateDirections();

        if (Input.GetButtonDown("Attack"))
        {
            playerCombat.Attack();
        }

    }
}
