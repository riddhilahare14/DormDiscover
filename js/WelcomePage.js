var questE1 = document.querySelector("#quest");

var textE1 = "What are you hoping to discover?";

var textIndex = 0;

update_text();

function update_text(){

    textIndex++;

    questE1.innerHTML = `${textE1.slice(0, textIndex)}`;


    setTimeout(update_text, 100);    

}
