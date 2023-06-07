using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class RoomNo : MonoBehaviour
{
    private Text _roomNoText;

    private void Awake()
    {
        EventManager.AddListener(EventType.ON_ROOM_MEMBER_CHANGE, OnRoomMemberChange);
    }

    private void Start()
    {
        _roomNoText = GetComponent<Text>();
        _roomNoText.text = string.Empty;
    }

    private void OnRoomMemberChange(JObject data)
    {
        _roomNoText.text = $"房间号: {data["room_no"]}";
    }
}