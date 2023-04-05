// CRUD >> Create, Read, Update , Delete
let cl = console.log;
const postContainer = document.getElementById('postContainer');
const postForm = document.getElementById('postForm');
const titleControl = document.getElementById('title');
const contentControl = document.getElementById('content');
let baseUrl = `https://jsonplaceholder.typicode.com/posts`;
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
const templating = (arr) => {
    let result = '';
    arr.forEach(ele => {
        result += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h3>${ele.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>
                            ${ele.body}
                        </p>
                    </div>
                    <div class="card-footer text-right">
                        <button class="btn btn-primary">Edit</button>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        
        
                `
    });
    postContainer.innerHTML = result;
}

function makeApicall(methodName, apiUrl, body) { // post
    let xhr = new XMLHttpRequest();
    xhr.open(methodName, apiUrl);
    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 201) {
            cl(xhr.response)
            let data = JSON.parse(xhr.response)
            if (methodName === 'GET') {
                templating(data)
            }
        }
    }

    xhr.send(body)
}

makeApicall("GET", baseUrl);

const onPostSubmit = (eve) => {
    eve.preventDefault();
    let postObj = {
        title: titleControl.value,
        body: contentControl.value,
        userId: Math.floor(Math.random() * 10) + 1,
        id: uuid()
    }
    cl(postObj)

    makeApicall('POST', baseUrl, JSON.stringify(postObj))
}

postForm.addEventListener("submit", onPostSubmit)


