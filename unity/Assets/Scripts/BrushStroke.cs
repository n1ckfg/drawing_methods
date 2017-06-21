using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class BrushStroke : MonoBehaviour {

    public LineRenderer ren;

    private float brushSize = 0.1f;
    private int splitReps = 2;
    private int smoothReps = 10;

    private void Awake() {
        ren = GetComponent<LineRenderer>();
    }

    private void Start() {
        setBrushSize(brushSize);
    }
    public void setBrushSize(float f) {
        brushSize = f;
        ren.startWidth = f;
        ren.endWidth = f;
    }

    public float getBrushSize() {
        return brushSize;
    }

    private void smoothStroke() {
        float weight = 18f;
        float scale = 1f / (weight + 2f);
        int nPointsMinusTwo = ren.positionCount - 2;
        Vector3 lower, upper, center;

        for (int i = 1; i < nPointsMinusTwo; i++) {
            lower = ren.GetPosition(i - 1);
            center = ren.GetPosition(i);
            upper = ren.GetPosition(i + 1);

            center.x = (lower.x + weight * center.x + upper.x) * scale;
            center.y = (lower.y + weight * center.y + upper.y) * scale;
            center.z = (lower.z + weight * center.z + upper.z) * scale;

            ren.SetPosition(i, center);
        }
    }

    private void splitStroke() {
        for (int i = 1; i < ren.positionCount; i += 2) {
            Vector3 center = ren.GetPosition(i);
            Vector3 lower = ren.GetPosition(i - 1);
            float x = (center.x + lower.x) / 2f;
            float y = (center.y + lower.y) / 2f;
            float z = (center.z + lower.z) / 2f;
            Vector3 p = new Vector3(x, y, z);
            spliceLineRenderer(i, p);
        }
    }

    private void spliceLineRenderer(int index, Vector3 pos) {
        Vector3[] pa = new Vector3[ren.positionCount];
        ren.GetPositions(pa);
        List<Vector3> pl = pa.ToList<Vector3>();
        pl.Insert(index, pos);
        ren.SetPositions(pl.ToArray());
    }

    public void refine() {
        for (int i = 0; i < splitReps; i++) {
            splitStroke();
            smoothStroke();
        }
        for (int i = 0; i < smoothReps - splitReps; i++) {
            smoothStroke();
        }
    }

}
