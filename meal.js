const search = document.getElementById("search");
const submit = document.getElementById("submit");
const mealElement = document.getElementById("meals");
const resultHeading = document.getElementsByClassName("result-heading");

function searchMeal(element){
    element.preventDefault();

    const term = search.value;
    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search Result for ${term}`;
            if(data.meals === null){
                resultHeading.innerHTML = `<h2> There are no Result for ${term}`;
            }else{
                mealElement.innerHTML = data.meals.map(
                    meal => `
                    <div onclick="displayMealDetail('${meal.strMeal}')" class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                    </div>
                    `
                )
                .join("");
            }
        });
    } else {
        alert("Input a value");
    }


}
submit.addEventListener('submit', searchMeal);

const displayMealDetail = name => {
    
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s${name}`
    fetch(url)
    .then(res => res.json())
    .then(data => renderMealInfo(data));
}
const renderMealInfo = meal => {
    const countryDiv = document.getElementById("mealDetail");
    countryDiv.innerHTML = `
        <h1>${meal.strMeal}</h1>
        
        <img src="${meal.strMealThumb}">
        `
}
