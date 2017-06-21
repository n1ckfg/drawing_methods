using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BrushMouse : MonoBehaviour {

    public bool clicked = false;
    public Vector3 mousePos = Vector3.zero;

    private float zPos = 1f;
    
    private void Update() {
        if (Input.GetMouseButton(0) && GUIUtility.hotControl == 0) {
            clicked = true;
            mousePos = Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, zPos));
        } else {
            clicked = false;
        }
	}

}
