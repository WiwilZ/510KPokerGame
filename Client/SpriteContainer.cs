using UnityEngine;

public class SpriteContainer : MonoBehaviour
{
    public Sprite[] AvatarSprites;
    public Sprite[] CardCountSprites;
    public Sprite[] CardSprites;
    public static SpriteContainer Instance { get; private set; }

    private void Awake()
    {
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }
}