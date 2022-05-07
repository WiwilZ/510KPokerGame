using System;
using System.Linq;
using Newtonsoft.Json.Linq;
using UnityEngine;

public class PassAction : MonoBehaviour
{
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
        gameObject.SetActive(false);
    }

    private void InitRoom()
    {
        gameObject.SetActive(false);
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
            gameObject.SetActive(data["action_cards"].ToList().Count == 0);
        }
        else if (_distanceToMe == 0)
        {
            JToken nextSeat;
            if (data.TryGetValue("next_seat", out nextSeat) && _seat == (int) nextSeat)
                gameObject.SetActive(false);
        }

        if (data.Property("scorer") != null)
            _onAct = OnReceiveAction1;
    }

    private void OnReceiveAction1(JObject data)
    {
        gameObject.SetActive(false);
        _onAct = OnReceiveAction0;
    }
}