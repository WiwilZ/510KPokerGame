using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class QQTest : MonoBehaviour
{
    public Text callbackText;

    public void LoginClick()
    {
        AndroidJavaClass jc = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
        AndroidJavaObject jo = jc.GetStatic<AndroidJavaObject>("currentActivity");

        jo.Call("LoginQQ");
    }
    
    public void AndroidCallBack(string callbackinfo)
    {
        callbackText.text = callbackinfo;
    }

}
