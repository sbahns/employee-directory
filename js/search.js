function search() {
  // Declare variables
  let input, filter, row, profile, div, i, txtValue;
  input = document.getElementById('employee-search');
  filter = input.value.toUpperCase();
  row = document.getElementById("employee_grid");
  profile = row.getElementsByClassName('cell');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < profile.length; i++) {
    div = profile[i].getElementsByClassName("user")[0];
		txtValue = div.textContent;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      profile[i].style.display = "";
    } else {
      profile[i].style.display = "none";
    }
  }
}
