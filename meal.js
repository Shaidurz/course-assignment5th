const searchBtn = document.getElementById('searchMeal');
searchBtn.addEventListener('click', function () {
   const mealItem = document.getElementById('meal').value;
   loadFoodData(mealItem);
})

const loadFoodData = mealName => {
   const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
   fetch(url)
       .then(res => res.json())
       .then(data => {
           if(data.meals != null){
               displayMealItem(data.meals);
           }else{
               alert('Meal is not Available');
           }
       })
}

const displayMealItem = foodItems => {
   const foodContainer = document.getElementById('mealContainer');
   dataClear('mealContainer');
   dataClear('mealItemDetails');
   foodItems.forEach(item => {
       const mealItemName = document.createElement('div');
       mealItemName.className = 'mealItemList';
       const foodInfo = `
       <img src ="${item.strMealThumb}">
       <h3>${item.strMeal}</h3>
       `
       mealItemName.innerHTML = foodInfo;
       mealItemName.addEventListener('click', function () {
           renderMealData(item.idMeal);
       });
       foodContainer.appendChild(mealItemName);
   });
   document.getElementById('meal').value = '';

}
const renderMealData = meal => {
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
   fetch(url)
       .then(res => res.json())
       .then(data => {
           if(data.meals != null){
               detailInfo(data.meals);
           }else{
               alert('Items not found');
           }
       })
       .catch(error => alert('Please input correct data'));
}
const detailInfo = foodDetail => {
   const mealItemDetails = document.getElementById('mealItemDetails');
   dataClear('mealItemDetails');
   foodDetail.forEach(item => {
       const mealItemDetail = document.createElement('div');
       mealItemDetail.className = 'mealDetailInfo';
       const itemName = document.createElement('h2');
       const ingredients = document.createElement('h4');
       ingredients.innerText = 'Ingredients';
       itemName.innerText = item.strMeal;
       const ul = document.createElement('ul');
       const imgUrl = document.createElement('img');
       imgUrl.src = item.strMealThumb;
       mealItemDetail.appendChild(imgUrl);


       const ingredientsItems = [item.strIngredient1,item.strIngredient2,item.strIngredient3,item.strIngredient4,
           item.strIngredient5,item.strIngredient6,item.strIngredient7,item.strIngredient8,item.strIngredient9,item.strIngredient10];
       ingredientsItems.forEach(item =>{
           const li = document.createElement('li');
           if(item != null && item != ''){
               li.innerText = item;
               ul.appendChild(li);
           } 
       })
       mealItemDetail.appendChild(itemName);
       mealItemDetail.appendChild(ingredients);
       mealItemDetail.appendChild(ul);
       mealItemDetails.appendChild(mealItemDetail);

   });

}

const dataClear = id => {
   const mealItemDetails = document.getElementById(id);
   mealItemDetails.innerHTML = "";
}