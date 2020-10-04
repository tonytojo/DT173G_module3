# Kursen Webbutveckling III(DT173G), Moment 5 REST-webbtjänster

## Syfte

Detta program konsumerar ett REST-API. Det enda man behöver är URLen till REST-API
Syftet med en REST_API är att det är platsformsoberoende.
Detta REST-API returnerar alla kurser som jag har läst
Denna tjänst använder JSON format genomgående dvs alla data som man skickar in är i jsom och lika så returerad data äe också i json. 


### Description

Jag använder jQquery genomgående eftersom jag tycker det är lite omständigt med JavaScript
Vid klick på länken "Till kursplanen" anropas aktuell href som finns för denna rad.
För att öka läsbarheten har jag valt att ha annan färg på varannan rad. 
Samtliga länkar och knappar är genomgående blåa för att tydliggöra att de är
klickbara.  

Detta program använder GET för att visa alla kurser och GET för att hämta en specific kurs.
Programmet tar också bort vald kurs genom DELETE och kan uppdatera vald genom PUT genom att helt
enkelt uppdatera aktuell rad i html tabellen.
Jag använder en html tabell för att visa alla kurser, ta bort en kurs samt uppdatera en kurs och en form för att mata in nya kurser.

När programmet startar och DOM är klar sker följande.
Jag anropar getCourses() som hämtar alla data genom fetch och bygger upp varje rad i html tabellen genom backtics och template literals

När jag skall lägga in en ny kurs matar jag först in de data som jag vill ha i input field i formuläret
När det är klart klickar jag på knappen "Lägg till kurs" som anropar Event hanteraren addCourse som
skickar iväg data till REST-API genom fetch API funktionen. Nu anropar jag getCourses för att uppdatera
min skärm så att jag alltid har korrekt status av de kurser som finns i databasan. Notera att ingen
refresh görs när fälten i form är ogiltiga. Inga av fälten får vara tomma

När jag vill radera en kurs klickar jag bara på knappen delete för vald rad i html tabellen. Sedan anropar jag getCourses för att uppdatera min skärm så att jag alltid har aktuell status av de kurser som finns i databasan

När jag vill uppdatera en kurs ändrar jag bara på en godtycklig rad och klickar sedan på knappen
update för vald rad i html tabellen. Sedan anropar jag getCourses för att uppdatera min skärm så att jag alltid har aktuell status av de kurser som finns i databasan. Notera här att det inte går att uppdatera Kursplan. Om man vill göra det får man först redera aktuell kurs och därefter lägg atill den på nytt med den nya kursplanen

Jag måste specialhantera href så här i funktionen updateCource för att det ska fungera
href ligger som ett barn till td kursplan.
$('#'+id).find("td").each(function() {
      arrCourse.push($(this).text())
      if (count++ ==3)
      {
         a_href = $(this).find('a:first').attr('href');
      }
    });


Denna konstruktion förhindrar att ingen refresh. Om någon fält är tomt undertrycks refresh.
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

För att hantera presentationshanteringen med sass har jag delat upp i följande filer.
_base.scss => basen där jag har altl annat som t.ex. variabler
_button.scss => hanterar allt som man kan klicka på
_form.scss =>hanterar formulär
_layout.scss => hanterar layouten
_mobile.scss => media queries
_table.scss => hanterar allt om tabeller




This file represnts a REST- API and we can handle the following 4 methods
GET, POST,PUT and DELETE.
I have use Advanced Rest client to test the REST-API
Description GET method
   When we use GET we make a select from the database
   All: http://localhost:8080/DT173_Webbutveckling_3/moment5/courses
   One: http://localhost:8080/DT173_Webbutveckling_3/moment5/courses?id=x
   where x is the id I want to get

Description POST method
   When we use POST we make an insert into the database
   http://localhost:8080/DT173_Webbutveckling_3/moment5/courses
   
Description PUT method
   When we use PUT we update the database
   http://localhost:8080/DT173_Webbutveckling_3/moment5/courses?id=x
   where x is the id I want to update

Description DELETET method
   When we use DETETE we delete from the database
   http://localhost:8080/DT173_Webbutveckling_3/moment5/courses?id=x
   where x is the id I want to delete

I use two classes Database and Courses to hande the connection to the database
This database class is where I connect and close the database.
I use C-tor to connect in the Database class

To get,add,update and delete is happening in the Course class.


## Installation

En installation av remote repository går till på följande sätt.

1. git clone https://github.com/tonytojo/DT173G_module2.git DT173G_m2
2. cd DT173G_m2
3. npm install(Här skapas node_modules)
Notera: Jag kallar target folder för DT173G_m2 men du kan kalla det för vad du vill. Det är alltid bra att ha ett namn som förknippas med innebörden av repositoryt.
Du kan också förkorta skrivsättet genom att skriva "npm i" vilket är samma sak som 
"npm install"
