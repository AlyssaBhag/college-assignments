using UnityEngine;
using UnityEngine.XR;

public class EnemyMovement_Fire : MonoBehaviour
{
    public float enemySpeed;

    private Rigidbody2D enemyRigidbody;
    public Animator Enemyanimator;

    public float attackRange = 2;
    public Transform Player;
    public int facingDirection = 1;
    private EnemyState enemyState;


    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        ChangeState(EnemyState.idle);
        enemyRigidbody = GetComponent<Rigidbody2D>();
        Enemyanimator = GetComponent<Animator>();
    }

    // Update is called once per frame
    void Update()
    {

        if (Player.position.x > transform.position.x && facingDirection == -1 || 
            Player.position.x < transform.position.x && facingDirection == 1)
        {
            FlipEnemy();
        }

        Vector2 direction = (Player.position - transform.position).normalized;
        enemyRigidbody.linearVelocity = direction * enemySpeed;


    }

    void FlipEnemy()
    {
        facingDirection *= -1;
        transform.localScale = new Vector3(transform.localScale.x * -1, transform.localScale.y, transform.localScale.x);
    }

    void ChangeState(EnemyState newState)
    {

        if (enemyState == EnemyState.running)
        {
            Enemyanimator.SetBool("isRunning", false);
        }
        else if (enemyState == EnemyState.attacking)
        {
            Enemyanimator.SetBool("isAttacking", false);
        }

        enemyState = newState;

        if (enemyState == EnemyState.running)
        {
            Enemyanimator.SetBool("isRunning", true);
        }
        else if (enemyState == EnemyState.attacking)
        {
            Enemyanimator.SetBool("isAttacking", true);
        }

}


    public enum EnemyState
    {
        idle,
        running,
        attacking,
    }

}