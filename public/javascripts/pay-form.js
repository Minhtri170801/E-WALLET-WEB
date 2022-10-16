// Get the modal
var modal = document.getElementById("pay-form");

// Get the button that opens the modal
var btn = document.getElementById("pay-fee");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

$(document).ready(() => {
  // When the user clicks on the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  $("#mssv").change(() => {
    var id = $("#mssv").val();
    if(id.length >= 8) {
      fetch('/api/student/'+id)
      .then((res) => res.json())
      .then((json) => {
        if(json.code == 0) {
          var student = json.student;
          $('#name-student').val(student.fullName);    
          $('#fee').val(student.fee); 
          $('#pay-fee').val(student.fee);
        }
        else {
          $('#name-student').val("");    
          $('#fee').val("");
          $('#pay-fee').val("");
        }
      })
    }
    else {
      $('#name-student').val("");    
      $('#fee').val("");
      $('#pay-fee').val("");
    }
  })
})
