using Newtonsoft.Json.Linq;
using UnityEngine;
using UnityEngine.UI;

public class Avatar : MonoBehaviour
{
    private int _distanceToMe;
    private Image _image;

    private void Awake()
    {
        EventManager.AddListener(EventType.ON_ROOM_MEMBER_CHANGE, OnRoomMemberChange);
    }

    private void Start()
    {
        _distanceToMe = transform.parent.GetSiblingIndex();
        _image = GetComponent<Image>();
        gameObject.SetActive(false);
    }

    private void OnRoomMemberChange(JObject data)
    {
        var index = ((int) data["seat"] + _distanceToMe) % 4;
        if (index < (int) data["member_count"])
        {
            _image.overrideSprite = SpriteContainer.Instance.AvatarSprites[index];
            gameObject.SetActive(true);
        }
        else
        {
            gameObject.SetActive(false);
        }
    }
}