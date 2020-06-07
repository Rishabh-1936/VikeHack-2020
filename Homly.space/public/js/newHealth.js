function optionsBuild(obj, block_id, mode) {
    let choice = "";
    obj.forEach((ele, index) => {
        let str1 = 'cl-' + block_id
        let opt = ``;

        if (mode == "checkbox") {
            opt = `
        <div class="form-check form-check-inline">
            <input class="form-check-input ${str1}" type="checkbox" id="id-${block_id}-${index}" value="${ele}" required>
            <label class="form-check-label" for="id-${block_id}-${index}">${ele}</label>
        </div>
        `
        } else if (mode == "radio") {
            opt = `
        <div class="form-check form-check-inline">
            <input class="form-check-input ${str1}" type="radio" name="name-${block_id}" id="id-${block_id}-${index}" value="${ele}">
            <label class="form-check-label" for="id-${block_id}-${index}">${ele}</label>
        </div>
        `
        }

        choice += opt;
    });
    return choice;
}

function builder() {
    let contRef = document.getElementById('health');
    let ele = "";
    ele += `
    <div class="container msg left-msg">
    <div class="msg-img" style="background-image: url('../../public/images/doctor.svg')">
    </div>  
    <div class="msg-bubble">
        <div class="ques msg-text"><p>${ques[click].ques}</p></div>
        <div class="options msg-text" id="id-${click}">
            ${optionsBuild(ques[click].opt, click, ques[click].type)}
        </div>   
    </div>
    </div>
    `
    contRef.innerHTML += ele;
}

// window.onload = function go() {

//     let ele = "";
//     ele += `<div class="container">
//         ${str}
//     </div>`

//     document.getElementById('health').innerHTML += ele;
//     builder();
// }


function submit() {
    document.getElementById('next').style.display = "none";
    document.getElementById('submit').style.display = "block";
}

function result() {
    let contRef = document.getElementById('health');
    let stat = "Low Probability.So take care."
    if (score > 27 && score < 35) {
        stat = "Has a chance of being affected.So if possible visit a doctor."
    }
    else if (score >= 35) {
        stat = "High chance of being affected.So please visit a doctor."
    }
    document.getElementById('result').style.display = "block";
    document.getElementById('result').innerHTML = stat;
}

document.getElementById('next').addEventListener('click', (event) => {

    let contRef = document.getElementById('health');
    let temp = [];
    let score_array = [...ques[click].points];
    let str1 = ".cl-" + click.toString() + "";
    let arr = document.querySelectorAll(str1);

    // console.log('arr', arr)
    // console.log('score', score_array)
    if (click == 9) {
        result();
    } else {
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i].checked) {
                temp.push(arr[i].value)

                score += score_array[i];
            }
        }
        if (temp.length == 0) {
            document.getElementById('alert').style.display = "block";
        }
        else {
            document.getElementById('alert').style.display = "none";
            let str2 = temp.toString()
            let ele = "";
            ele += `
    <div class="container msg right-msg">
        <div class="msg-img" style="background-image: url('../../public/images/user.svg')">
        </div>

        <div class="msg-bubble ans">
            <div class="msg-txt">${str2}</div>
        </div>
    </div>
    `
            ques[click].ans = str2;

            // console.log('hi')
            console.log('click', click, score)
            contRef.innerHTML += ele;
            ++click;

            if (click < 10) {
                builder();
            } else {
                result();
                //submit();
            }
        }
    }


});

