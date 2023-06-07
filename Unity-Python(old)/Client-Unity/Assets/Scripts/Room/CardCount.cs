using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class CardCount : MonoBehaviour
{
    private int _count;
    private int _distanceToMe;
    private Image _image;
    private Action _onAct;
    private int _seat;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
        EventManager.AddListener(EventType.ON_ACT, OnAct);
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
        _count = 26;
        _onAct = OnReceiveAction0;
        _seat = ((int) data["seat"] + _distanceToMe) % 4;
    }

    private void OnAct(JObject data)
    {
        if (_seat != (int) data["from_seat"]) return;
        _count -= data["action_cards"].ToList().Count;
        _onAct();
    }

    private void OnReceiveAction0()
    {
        if (_count > 5) return;
        _image.overrideSprite = SpriteContainer.Instance.CardCountSprites[_count];
        gameObject.SetActive(true);
        _onAct = OnReceiveAction1;
    }

    private void OnReceiveAction1()
    {
        _image.overrideSprite = SpriteContainer.Instance.CardCountSprites[_count];
    }
}