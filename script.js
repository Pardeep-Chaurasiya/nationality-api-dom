const div = document.createElement("div");
const form = document.createElement("form");
const input = document.createElement("input");
const displayDiv = document.createElement("div");


document.body.append(div);
div.append(form)
div.append(displayDiv)
form.append(input)

input.setAttribute("type","text")
input.setAttribute("placeholder","please enter the name")
div.setAttribute("class"," d-flex flex-column mt-5 justify-content-center align-items-center")
displayDiv.setAttribute("class"," d-flex flex-column flex-column mt-5 justify-content-center align-items-center")
displayDiv.setAttribute("style","width: 220px;")
displayDiv.setAttribute("class","bg-info")

form.addEventListener("submit",(e)=>{
    console.log(input.value)
    displayNationality(input.value)
    input.value="";
    e.preventDefault();

})

async function displayNationality(name){
    try{
        const res = await fetch(`https://api.nationalize.io/?name=${name}`)
        const data = await res.json();

        let value = "";
        if(data.country.length === 0){
            console.log("please try again")
            value = `No Data Found for this "${name}" name`
        }
        else{
        value += `
            Nationality : <h1>${data.country[0].country_id}</h1>
            Probability : <h3>${data.country[0].probability}</h3>
        `
        
        console.log(data)
        console.log(data.country[0].country_id)
        console.log(data.country[0].probability)
    }
    displayDiv.innerHTML = value;
    }catch(err){
        console.log(err)
    }
}
