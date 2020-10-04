"use strict"

//Define some variable and const
let coursesEl = $("#sources")[0]; //Is used for display all courses
let arrCourse = [];
let devMode = true;
let API;

if (devMode)
   API = "http://localhost:8080/DT173G_SRV_REST_API/courses"; //address to server REST-API
else
   API = "http://localhost:8080/DT173G_SRV_REST_API/courses"; //address to server REST-API

//Define eventlistener
$("#addCourse")[0].addEventListener("click", addCourse);

//This function getCourses will consume a REST-API by using the fetch API function with the default
//method GET
//It will fill a HTML table with the data received from the REST-API.
//I use plural to indicate that I get all the courses
function getCourses()
{
   coursesEl.empty; //clear the html table

   fetch(API)
   .then(response => response.json())
   .then(data =>
      {
         coursesEl.innerHTML = "<thead><tr><th>Kurs <br>kod</th><th>Kurs<br>namn</th><th>Prog<br>ression</th><th>Kurs<br>plan</th><th>Delete</th><th>Update</th></tr></thead>";
         data.forEach(item =>
         {
            coursesEl.innerHTML += `<tr id=${item.id}> <td class="code">${item.code}</td><td class="name">${item.name}</td><td class="progression">${item.progression}</td><td class="plan"><a target="_blank" href=${item.plan}>Till kursplanen</a></td> <td class="delete"><button class="btn" onclick="deleteCource(${item.id})">Delete</button></td> <td class="update"><button class="btn" onclick="updateCource(${item.id})">Update</button></td></tr>`;
         });
      })
      .catch(error => {
         console.log('Error:', error);
         //alert("An error occured with getCourses:"+ error);
      })
}

//This function deleteCourse will consume a REST-API by using the fetch api function with the DELETE method
//It will delete the course with the selected id and call getCourses() to refresh
//the screen with the correct status of the existing courses in the db
function deleteCource(id)
{
   fetch(API+'?id=' + id, {
       method: 'DELETE',
   })
   .then(response =>response.json())
   .then(data =>
    {
      getCourses();
    })
    .catch(error => {
       console.log('Error:', error);
       alert("An error occured when deleteCourse:"+ error);
    })
}

//This function updateCourse will consume a REST-API by using the fetch function with the PUT method
//It will update the course with the selected id and call getCourses() to refresh
//the screen with the correct status of the updated courses
//I can change any row in the HTML except kursplan. I get the selected tr and fill an object
//with the associated td into an object
//If you want to change kursplan you have to delete the row and then create the new course with
//actual courseplan
//When I update I must extract the href in a special way to make it work
function updateCource(id)
{
   arrCourse = [];
   let a_href;
   let count=0;

   $('#'+id).find("td").each(function() {
      arrCourse.push($(this).text())
     
      if (count++ ==3)
      {
         a_href = $(this).find('a:first').attr('href');
      }
    });

    let course = {'code': arrCourse[0] ,'name': arrCourse[1],'progression': arrCourse[2],'plan': a_href};
   
     fetch(API+'?id=' + id, {
       method: 'PUT',
       body: JSON.stringify(course)
    })
   .then(response =>response.json())
   .then(data =>
    {
      getCourses();
      $('#'+id).css('background-color','green');
    })
    .catch(error => {
       console.log('Error:', error);
       alert("An error occured when updateCourse:"+ error);
    })
}

//This function addCourse will consume a REST-API by using the fetch function
//with the POST method. It will get the data by reading the html table data into an object
//It will call getCourses() to get the current status of existing courses
function addCourse()
{
   let fieldValid = true;
   /* arrCourse = []; //clear
      $('#newCourse').find("td").each(function() { //Find alla td for the specified newCourse
      arrCourse.push($(this).text())
    }); 
    */

    $("#myform input[type=text]").each(function() {
      if(this.value === "") {
        fieldValid = false;
      }
    });

    if (fieldValid)
    {
      //let course = {'code': arrCourse[0] ,'name': arrCourse[1],'progression': arrCourse[2],'plan': arrCourse[3]};
      let course = {'code': $('#code').val() ,'name': $('#name').val(),'progression': $('#progression').val(),'plan': $('#plan').val()};

      fetch(API, {
            method: 'POST',
            body: JSON.stringify(course),
      })
      .then(response =>response.json())
      .then(data =>
      {
         getCourses();
      })
      .catch(error => {
         console.log('Error:', error);
         //alert("An error occured when addCourse:"+ error);
      })
   }
   else{
      alert("Du har tomma fält i din form");
   }
}

//Create the html table for adding new course
/* function createtblNewCourse()
{
   newCourse.innerHTML = "<thead><tr><th>Kurskod</th><th>Kursnamn</th><th>Progression</th><th>Kursplan</th></tr></thead> <tbody><tr><td></td><td></td><td></td><td></td></tr></tbody>";
} 
 function clearAll()
{
   $("#newCourse").empty(); //clear the html table
   createtblNewCourse()
} 
*/

//This helper function make sure that no refresh is done when the forms field is invalid
$('#myform').submit(function() {
   let fieldValid = true;
   $("#myform input[type=text]").each(function() {
      if(this.value === "") {
        fieldValid = false;
      }
   });
   
   if (!fieldValid) {
       return false;
   }
});


//Is called when the DOM is loaded
$(function() {
   getCourses();
   //createtblNewCourse();
 });