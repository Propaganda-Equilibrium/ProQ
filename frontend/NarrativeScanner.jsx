import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function NarrativeScanner() {
  const [narrative, setNarrative] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeNarrative = async () => {
    setLoading(true);
    setResult(null);
    const response = await fetch("https://proq-b745.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: narrative })
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">ProQ – Propaganda Qualifier</h1>
      <Textarea
        value={narrative}
        onChange={(e) => setNarrative(e.target.value)}
        placeholder="ჩაწერე ტექსტი..."
        className="min-h-[120px]"
      />
      <Button onClick={analyzeNarrative} disabled={loading}>
        {loading ? "გაანალიზება..." : "გაანალიზე"}
      </Button>
      {result && (
        <Card>
          <CardContent className="space-y-2 p-4">
            <p><strong>I დონე:</strong> {result.level1}</p>
            <p><strong>II დონე:</strong> {result.level2}</p>
            <p><strong>III დონე:</strong> {result.level3}</p>
            <p className="text-muted-foreground text-sm">{result.note}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
