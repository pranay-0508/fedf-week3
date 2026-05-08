import { addItem } from './utils.js';
import { renderTable } from './ui.js';
import { createCounter } from './counter.js';

let facultyList = [];
const getId = createCounter();

const readImage = file =>
    new Promise(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(file);
    });

export const addFaculty = async () => {

    const name = document.getElementById("name").value;
    const empid = document.getElementById("empid").value;
    const dept = document.getElementById("dept").value;
    const desig = document.getElementById("desig").value;
    const file = document.getElementById("photo").files[0];

    const photo = file ? await readImage(file) : "";

    const newObj = {
        id: getId(),
        name,
        empid,
        dept,
        desig,
        photo
    };

    facultyList = addItem(facultyList, newObj);

    renderTable(facultyList);
};

window.downloadCard = (i) => {

    const f = facultyList[i];

    const win = window.open("", "", "width=400,height=600");

    win.document.write(`
    <html>
    <head>
    <style>
    body { font-family: Arial; text-align:center; }

    .id-card {
        width:320px;
        height:500px;
        border:2px solid black;
        border-radius:10px;
        padding:10px;
    }

    .photo-box {
        width:105px;
        height:135px;
        margin:10px auto;
        overflow:hidden;
        border:2px solid black;
    }

    .photo-box img {
        width:100%;
        height:100%;
        object-fit:cover;
    }

    .name {
        font-weight:bold;
        color:blue;
        font-size:18px;
    }
    </style>
    </head>

    <body>

    <div class="id-card">

        <p>Faculty ID Card</p>

        <div class="photo-box">
            <img src="${f.photo}">
        </div>

        <div class="name">${f.name}</div>
        <p>Emp ID: ${f.empid}</p>
        <p>${f.desig}</p>
        <p>${f.dept}</p>

    </div>
    </body>
    </html>
    `);

    win.print();
};