using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class PlayAloneResult : MonoBehaviour
{
    [SerializeField] private Image[] avatars;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_ACT, OnAct);
    }

    private void Start()
    {
        gameObject.SetActive(false);
    }

    private void InitRoom()
    {
        gameObject.SetActive(false);
    }

    private void OnAct(JObject data)
    {
        JToken winnerToken;
        if (!data.TryGetValue("winner", out winnerToken)) return;

        var winner = (int) winnerToken;
        for (var i = 0; i < 4; i++)
        {
            var index = (winner + i) % 4;
            avatars[i].overrideSprite = SpriteContainer.Instance.AvatarSprites[index];
        }

        gameObject.SetActive(true);
    }
}