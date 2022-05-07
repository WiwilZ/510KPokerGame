using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class ActionCards : MonoBehaviour
{
    private readonly Image[] _images = new Image[26];
    private int _distanceToMe;

    private Action<JObject> _onAct;
    private int _seat;

    private void Awake()
    {
        EventManager.AddListener(EventType.INIT_ROOM, evt => InitRoom());
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
        EventManager.AddListener(EventType.ON_ACT, OnAct);
    }

    private void Start()
    {
        _distanceToMe = transform.GetSiblingIndex();
        for (var i = 0; i < transform.childCount; i++)
            _images[i] = transform.GetChild(i).GetComponent<Image>();

        HideChildren();
    }

    private void InitRoom()
    {
        HideChildren();
    }

    private void OnDeal(JObject data)
    {
        _onAct = OnReceiveAction0;
        _seat = ((int) data["seat"] + _distanceToMe) % 4;
    }

    private void OnAct(JObject data)
    {
        _onAct(data);
    }

    private void OnReceiveAction0(JObject data)
    {
        if (_seat == (int) data["from_seat"])
        {
            var actionCards = data["action_cards"].Select(e => (int) e).ToArray();
            for (var i = 0; i < actionCards.Length; i++)
            {
                _images[i].overrideSprite = SpriteContainer.Instance.CardSprites[actionCards[i]];
                transform.GetChild(i).gameObject.SetActive(true);
            }

            for (var i = actionCards.Length; i < transform.childCount; i++)
                transform.GetChild(i).gameObject.SetActive(false);
        }
        else if (_distanceToMe == 0)
        {
            JToken nextSeat;
            if (data.TryGetValue("next_seat", out nextSeat) && _seat == (int) nextSeat)
                HideChildren();
        }

        if (data.Property("scorer") != null)
            _onAct = OnReceiveAction1;
    }

    private void OnReceiveAction1(JObject data)
    {
        HideChildren();

        if (_seat == (int) data["from_seat"])
        {
            var actionCards = data["action_cards"].Select(e => (int) e).ToArray();
            for (var i = 0; i < actionCards.Length; i++)
            {
                _images[i].overrideSprite = SpriteContainer.Instance.CardSprites[actionCards[i]];
                transform.GetChild(i).gameObject.SetActive(true);
            }
        }

        _onAct = OnReceiveAction0;
    }

    private void HideChildren()
    {
        foreach (Transform child in transform)
            child.gameObject.SetActive(false);
    }
}