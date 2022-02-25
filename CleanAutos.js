"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 2;
ctx.lineCap = "round";
ctx.lineJoin = "round";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

function Draw(e) {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
}



canvas.addEventListener("mousemove", Draw);

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

canvas.addEventListener("mouseout", () => isDrawing = false);

window.addEventListener("dblclick", (e) => {
    if (e.path.includes(document.querySelector("canvas")))
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
});

$(document).ready(function () {

    $("input[type=date]").val(moment().format('YYYY-MM-DD'));

    $("button").click(function () {
        const previousTitle = document.title;
        const nom = $("#tbNom").val();
        const prenom = $("#tbPrenom").val();

        document.title = `${moment().format('YYYY-MM-DD HH_mm_ss')} Fiche intervention ${prenom} ${nom} `;
        
        window.print();
        document.title = previousTitle;
    });
});
