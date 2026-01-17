using UnityEngine;

public class PlayerCombat : MonoBehaviour
{

    public Transform attackPoint;
    public float attackRange = 1;
    public LayerMask enemyLayers;
    public int damage = 1;

    public Animator animator;


    public void Attack()
    {
        // Play an attack animation
        animator.SetBool("isAttacking", true);

    }

    public void FinishAttack()
    {
        // Stop the attack animation
        animator.SetBool("isAttacking", false);
    }


    public void DealDamage()
    {
        Collider2D[] enemies = Physics2D.OverlapCircleAll(attackPoint.position, attackRange, enemyLayers);

        if (enemies.Length > 0)
        {
            enemies[0].GetComponent<EnemyHealth>().ChangeHealth(-damage);
        }
    }
}


