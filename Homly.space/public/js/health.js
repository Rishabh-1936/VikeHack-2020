var click = 0;
var score = 0;

var str = "Hi! Our coronavirus disease self assessment scan has been developed on the basis of guidelines from the WHO and MHFW, Government of India.Please note that information from this chat will be used for monitoring & management of the current health crisis and research in the fight against COVID-19."

var ques = [
    {
        id: 1,
        ques: "Please select your age group( years old )",
        opt: ['0-17', '18-44', '45-64', '65-74', '75+'],
        ans: "",
        points: [1, 2, 2, 3, 4],
        type: "radio"
    },
    {
        id: 2,
        ques: "Please select your gender",
        opt: ['Male', 'Female', 'Others'],
        ans: "",
        points: [3, 2, 1],
        type: "radio"
    },
    {

        id: 3,
        ques: "Please let us know your current body temperature in degree Fahrenheit (Normal body temperature is 98.6°F):",
        opt: ['Normal (96°F-98.6°F)', 'Fever (98.6°F-102°F)', 'High Fever (>102°F)', 'Don’t know'],
        ans: "",
        points: [1, 3, 4, 2],
        type: "radio"
    },
    {
        id: 4,
        ques: "Are you experiencing any of the following symptoms?",
        opt: ['Cough', 'Sore Throat', 'Loss or diminished sense of smell', 'Difficulty in Breathing', 'None of the above'],
        ans: "",
        points: [1, 1, 2, 3, 0],
        type: "checkbox"
    },
    {
        id: 5,
        ques: "Have you ever had any of the following?",
        opt: ['Diabetes', 'Hypertension', 'Lung Disease', 'Heart Disease', 'Cancer', 'None of the above'],
        ans: "",
        points: [4, 2, 3, 5, 1],
        type: "checkbox"
    },
    {
        id: 6,
        ques: "Additionally, please verify if you are experiencing any of the symptoms below (mark all those applicable)",
        opt: ['Moderate to Severe Cough', 'Feeling Breathless', 'Difficulty in Breathing', 'Drowsiness', 'Persistant Pain and Pressure in Chest', 'Severe Weakness', 'Pneumonia', 'None of the above'],
        ans: "",
        points: [4, 4, 4, 5, 5, 5, 5, 1],
        type: "checkbox"
    },
    {
        id: 7,
        ques: "We would like to know about your smoking history",
        opt: ['Current Smoker', 'Previous Smoker (before last 6 months)', 'Never Smoke'],
        ans: "",
        points: [3, 5, 1],
        type: "checkbox"
    },
    {
        id: 8,
        ques: "Please select your international travel and exposure details",
        opt: ['No Travel History', 'No contact with anyone with Symptoms', 'History of travel or meeting in affected geographical area in last 14 days', 'Close contact with a person with Fever and Cough in last 14 days'],
        ans: "",
        points: [1, 2, 3, 5],
        type: "checkbox"
    },
    {
        id: 9,
        ques: "Which of the following apply to you?",
        opt: ['I have recently interacted or lived with someone who has tested positive for COVID -19', 'I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear', 'None of the above'],
        ans: "",
        points: [3, 4, 0],
        type: "checkbox"
    },
    {
        id: 10,
        ques: "Thank You for your response.Click next for submiting the response.",
        opt: [],
        ans: "",
        points: [],
        type: "checkbox"
    },
]


window.onload = function go() {

    let contRef = document.getElementById('health');
    let ele = "";
    ele += `
    <div class="container msg left-msg">
    <div class="msg-img" style="background-image: url('../../public/images/doctor.svg')">
    </div>  
    <div class="msg-bubble">
        <div class="ques msg-text"><p>${str}</p></div>  
    </div>
    </div>
    `
    contRef.innerHTML = ele;
    builder();
}

