using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class BrushStroke : MonoBehaviour {

    public LineRenderer ren;

    private float brushSize = 0.1f;
    private Color brushColor = new Color(0f, 0f, 0f);
    private int splitReps = 2;
    private int smoothReps = 10;
    private int colorID;
    private MaterialPropertyBlock block;


    private void Awake() {
        colorID = Shader.PropertyToID("_Color");
        block = new MaterialPropertyBlock();
        ren = GetComponent<LineRenderer>();
    }

    private void Start() {
        setBrushSize(brushSize);
        setBrushColor(brushColor);
    }

    public void setBrushSize(float f) {
        brushSize = f;
        ren.widthMultiplier = brushSize;
    }

    public float getBrushSize() {
        return brushSize;
    }

    public void setBrushColor(Color c) {
        brushColor = c;
        block.SetColor(colorID, brushColor);
        ren.SetPropertyBlock(block);
    }

    public Color getBrushColor() {
        return brushColor;
    }

    private List<Vector3> smoothStroke(List<Vector3> pl) {
        float weight = 18f;
        float scale = 1f / (weight + 2f);
        int nPointsMinusTwo = pl.Count - 2;
        Vector3 lower, upper, center;

        for (int i = 1; i < nPointsMinusTwo; i++) {
            lower = pl[i - 1];
            center = pl[i];
            upper = pl[i + 1];

            center.x = (lower.x + weight * center.x + upper.x) * scale;
            center.y = (lower.y + weight * center.y + upper.y) * scale;
            center.z = (lower.z + weight * center.z + upper.z) * scale;

            pl[i] = center;
        }
        return pl;
    }

    private List<Vector3> splitStroke(List<Vector3> pl) {
        for (int i = 1; i < pl.Count; i += 2) {
            Vector3 center = pl[i];
            Vector3 lower = pl[i - 1];
            float x = (center.x + lower.x) / 2f;
            float y = (center.y + lower.y) / 2f;
            float z = (center.z + lower.z) / 2f;
            Vector3 p = new Vector3(x, y, z);
            pl.Insert(i, p);
        }
        return pl;
    }

    public void refine() {
        Vector3[] pa = new Vector3[ren.positionCount];
        ren.GetPositions(pa);
        List<Vector3> pl = pa.ToList<Vector3>();

        for (int i = 0; i < splitReps; i++) {
            pl = splitStroke(pl);
            pl = smoothStroke(pl);
        }
        for (int i = 0; i < smoothReps - splitReps; i++) {
            pl = smoothStroke(pl);
        }

        ren.positionCount = pl.Count;
        ren.SetPositions(pl.ToArray());
    }

}
