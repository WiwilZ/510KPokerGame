using System;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class MyHandCard : EventTrigger
{
    private bool _selected;
    public Action<bool> OnClickCallback1 { get; set; }
    public Action OnClickCallback2 { get; set; }
    
    public void ResetStatus()
    {
        if (_selected)
            transform.position += Vector3.down * 60;
        _selected = false;
    }
    
    public void OnClick()
    {
        transform.position += (_selected ? Vector3.down : Vector3.up) * 60;
        OnClickCallback1?.Invoke(_selected);
        OnClickCallback2?.Invoke();
        _selected = !_selected;
    }
}