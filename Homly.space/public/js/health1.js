window.onload = function go() {
    alert('i am here ');
    //    render();
    // var ele = document.getElementById('health');

    var str = "Please note that information from this chat will be used for monitoring & management of the current health crisis and research in the fight against COVID-19."

    var ques = [
        {
            id: 1,
            ques: "Are you experiencing any of the following symptoms?",
            opt: ['Cough', 'Fever', 'Difficulty in Breathing', 'None of the above'],
            ans: ""

        },
        {
            id: 2,
            ques: "Have you ever had any of the following?",
            opt: ['Diabetes', 'Hypertension', 'Lung Disease', 'Heart Disease', 'None of the above'],
            ans: ""
        },
        {
            id: 3,
            ques: "Have you traveled anywhere internationally within a month?",
            opt: ['Yes', 'No'],
            ans: ""
        },
        {
            id: 4,
            ques: "Which of the following apply to you?",
            opt: ['I have recently interacted or lived with someone who has tested positive for COVID -19', 'I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear', 'None of the above'],
            ans: ""
        },
    ]




    var ele = "";
    ele += `<div class="container">
        ${str}
    </div>`
    ques.forEach(e => {
        ele += card(e);
    });
    document.getElementById('health').innerHTML = ele;

}

// var str = "Please note that information from this chat will be used for monitoring & management of the current health crisis and research in the fight against COVID-19."

// var ques = [
//     {
//         id: 1,
//         ques: "Are you experiencing any of the following symptoms?",
//         opt: ['Cough', 'Fever', 'Difficulty in Breathing', 'None of the above'],
//         ans: ""

//     },
//     {
//         id: 2,
//         ques: "Have you ever had any of the following?",
//         opt: ['Diabetes', 'Hypertension', 'Lung Disease', 'Heart Disease', 'None of the above'],
//         ans: ""
//     },
//     {
//         id: 3,
//         ques: "Have you traveled anywhere internationally within a month?",
//         opt: ['Yes', 'No'],
//         ans: ""
//     },
//     {
//         id: 4,
//         ques: "Which of the following apply to you?",
//         opt: ['I have recently interacted or lived with someone who has tested positive for COVID -19', 'I am a healthcare worker and I examined a COVID-19 confirmed case without protective gear', 'None of the above'],
//         ans: ""
//     },
// ]

function render() {
    var ele = document.getElementById('health');
    ele += `<div class="container">
        ${str}
    </div>`
    ques.array.forEach(e => {
        ele += card(e);
    });

}
function card(obj) {
    let data = `
    <div class="container">
        <div class="container-fluid ques box">
            <p>${obj.ques}</p>
        </div>
        <div class="container-fluid ans">`;

    (obj.opt).forEach(ele => {
        data += `<div class="box">` + ele + `</div>`
    });
    data += `
        </div>
        <input type="text" id="${obj.id}" placeholder="Enter..." name="${obj.id}" value="">
    </div> 
    `
    return data;
}

// document.getElementById('next').addEventListener('click', (event) => {

//     // let contRef = document.getElementById('health');
//     // let optRef = document.getElementById('id-' + click);

//     let temp = [];
//     let str1 = '.cl-' + click + ' ';
//     let arr = document.querySelectorAll(str1 + '.form-check-input');
//     // console.log('block i am inS', document.querySelectorAll('.form-check-input'))
//     console.log('class', document.getElementsByClassName('cl-0'))

//     console.log('sss', str1)

//     console.log('block i am inS', document.querySelectorAll(str1 + '.form-check-input'))

//     for (let i = 0; i < arr.length; ++i) {
//         if (arr[i].checked) {
//             console.log('yes');
//             temp.push(arr[i].value)
//         }
//     }
//     console.log(temp, '-', temp.toString())
//     //return temp.toString();








//     let str2 = temp.toString()
//     console.log('clicked', click)
//     let ele = "";
//     ele += `
//     <div class="container box user">
//         <div class="ans">
//             ${str2}
//         </div>
//     </div>
//     `
//     console.log('hi')
//     // contRef.innerHTML += ele;
//     ++click;
//     // builder();
// });

