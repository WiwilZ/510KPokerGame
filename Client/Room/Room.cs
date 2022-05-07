using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.SceneManagement;

public class Room : MonoBehaviour
{
    private bool _gameStarted;

    private void Awake()
    {
        EventManager.AddListener(EventType.ON_ROOM_MEMBER_CHANGE, OnRoomMemberChange);
        EventManager.AddListener(EventType.ON_DEAL, OnDeal);
    }

    private void Start()
    {
        _gameStarted = false;

        EventManager.DispatchEvent(EventType.GET_ROOM_INFO);
    }

    private void OnDestroy()
    {
        EventManager.RemoveListener(EventType.INIT_ROOM);
        EventManager.RemoveListener(EventType.ON_ROOM_MEMBER_CHANGE);
        EventManager.RemoveListener(EventType.ON_DEAL);
        EventManager.RemoveListener(EventType.ON_BANKER_CARD_CHANGE);
        EventManager.RemoveListener(EventType.ON_ACT);
    }

    private void OnRoomMemberChange(JObject data)
    {
        if (_gameStarted && (int) data["member_count"] < 4)
        {
            EventManager.DispatchEvent(EventType.INIT_ROOM);
            _gameStarted = false;
        }

        if ((int) data["seat"] == 3)
            EventManager.DispatchEvent(EventType.DEAL);
    }

    private void OnDeal(JObject data)
    {
        _gameStarted = true;
    }

    public void ExitRoom()
    {
        EventManager.DispatchEvent(EventType.EXIT_ROOM);
        SceneManager.LoadScene(1);
    }

    public void PlayAgain()
    {
        EventManager.DispatchEvent(EventType.INIT_ROOM);
        EventManager.DispatchEvent(EventType.RESTART);
    }
}