// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var devouredElem = $("#devouredBurger");
      var noDevouredElem = $("#notDevouredBurger");
  
      var burger = data.burger;
      var len = burger.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          burger[i].id + 
          ". "+burger[i].burger_name +
          "<button class='change-state' data-id='" +
          burger[i].id +
          "' data-newDevoured='" +
          !burger[i].devoured +
          "'>";
  
        if (burger[i].devoured) {
          new_elem += "Devour";
        } else {
          new_elem += "Delete";
        }
  
        new_elem += "</button>";
  
        new_elem +=
          "<button class='delete-burger' data-id='" +
          burger[i].id +
          "'>DELETE</button></li>";
  
        if (burger[i].devoured) {
          devouredElem.append(new_elem);
        } else {
          noDevouredElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-state", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).data("newDevoured")===true;
  
      var newDevouredState = {
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.ajax("/burger/" + id, {
        type: "PUT",
        data: JSON.stringify(newDevouredState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newCat = {
        burger_name: $("#burger")
          .val()
          .trim(),
        devoured: $("[burger_name=devoured]:checked")
          .val()
          .trim()
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-burger", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted cat", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });
  