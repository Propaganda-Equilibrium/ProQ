from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NarrativeRequest(BaseModel):
    text: str

class NarrativeResponse(BaseModel):
    level1: str
    level2: str
    level3: str
    note: str

@app.post("/analyze", response_model=NarrativeResponse)
def analyze_narrative(request: NarrativeRequest):
    return NarrativeResponse(
        level1="ღირებულებითი წესრიგის რევიზიის მცდელობა",
        level2="საზოგადოებრივი ბზარების ტაქტიკური გამოყენება",
        level3="ემოციური შოკის ოპერატიული სქემა",
        note="შესაძლოა იყოს პროპაგანდისტული ნარატივი"
    )

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
