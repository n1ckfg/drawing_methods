using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BrushDraw : MonoBehaviour {

    public BrushMouse brushMouse;
    public BrushStroke brushPrefab;
    public float brushSize = 0.01f;
    public Color brushColor = new Color(0f, 0f, 0f);

    private bool isDrawing = false;
    private List<BrushStroke> strokes = new List<BrushStroke>();

    private void Awake() {
        if (!brushMouse) brushMouse = GetComponent<BrushMouse>();
    }

	private void Update() {
        if (brushMouse.clicked && !isDrawing) {
            beginStroke();
        } else if (brushMouse.clicked && isDrawing) {
            updateStroke();
        } else if (!brushMouse.clicked && isDrawing) {
            endStroke();
        }
	}

    private void beginStroke() {
        isDrawing = true;
        strokes.Add(Instantiate(brushPrefab, transform));
        strokes[strokes.Count - 1].setBrushSize(brushSize);
        strokes[strokes.Count - 1].setBrushColor(brushColor);
        strokes[strokes.Count - 1].ren.positionCount = 0;
        addPoint(brushMouse.mousePos);
    }

    private void updateStroke() {
        addPoint(brushMouse.mousePos);
    }

    private void endStroke() {
        strokes[strokes.Count - 1].refine();
        isDrawing = false;
    }

    private void addPoint(Vector3 p) {
        strokes[strokes.Count - 1].ren.positionCount++;
        strokes[strokes.Count - 1].ren.SetPosition(strokes[strokes.Count - 1].ren.positionCount-1, p);
    }

}
