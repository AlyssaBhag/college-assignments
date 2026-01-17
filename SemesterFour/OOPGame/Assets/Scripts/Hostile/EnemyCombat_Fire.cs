using UnityEngine;

public class EnemyCombat : MonoBehaviour
{
    public int damage = 1;

    public void OnCollisionEnter2D(Collision2D collision)
    {
        // Deals damage only when it hits the player.
        if(collision.gameObject.tag == "Player")
        {
            collision.gameObject.GetComponent<PlayerHealth>().ChangeHealth(-damage);
        }
    }
}
