using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class BankerCard : MonoBehaviour
{
    private int _distanceToMe;
    private Image _image;
    private bool _isBanker;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
        EventManager.AddListener(EventType.ON_BANKER_CARD_CHANGE, UpdateBankerCard);
    }

    private void Start()
    {
        _distanceToMe = transform.parent.GetSiblingIndex();
        _image = GetComponent<Image>();
        gameObject.SetActive(false);
    }

    private void InitRoom()
    {
        gameObject.SetActive(false);
    }

    private void OnDeal(JObject data)
    {
        var seat = (int) data["seat"];
        var bankerSeat = (int) data["banker_seat"];
        _isBanker = (seat + _distanceToMe) % 4 == bankerSeat;
        UpdateBankerCard(data);
    }

    private void UpdateBankerCard(JObject data)
    {
        if (!_isBanker) return;
        
        var bankerCard = (int) data["banker_card"];
        _image.overrideSprite = SpriteContainer.Instance.CardSprites[bankerCard];
        gameObject.SetActive(true);
    }
}