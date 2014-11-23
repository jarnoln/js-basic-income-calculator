// Remove rows from table (except header row)
function clear_table(table) {
  var old_rows = table.childNodes;
  console.log(old_rows.length, 'old table rows');
  while(old_rows.length > 2) {
  	var line = old_rows[old_rows.length-1];
  	table.removeChild(line);
  	// console.log('Removed line');
  }	
}

function calculate_basic_income_table(basic_income, margin, mandatory_save_pct) {
  // basic_income: Amount given by government for everyone
  // margin: Margin deducted from income
  // mandatory_save_pct: Which part of the deduction goes to own account, rest goes to government.

  console.log('calculate_basic_income_table: basic_income', basic_income,
  			  'margin:', margin,
  			  'save_pct', mandatory_save_pct);
  var basic_table = document.getElementById("basic_income_table");
  var account_table = document.getElementById("basic_income_and_account_table");
  
  // Erase old lines
  clear_table(basic_table);
  clear_table(account_table);
  
  for (var income=0; income<=4000; income+=500) {
    var transfer = basic_income - (margin * income) / 100;
    // console.log('transfer:', transfer);
    var account_transfer = transfer;
    var to_government = 0;
    var to_account = 0;
    var from_account = transfer;
    if (transfer < 0) {
      account_transfer = mandatory_save_pct * transfer / 100;
      to_government = transfer - account_transfer;
      to_account = -account_transfer;
      from_account = 0;
    }
    gross = income + transfer;
    if (income > 0) {
      gross_tax = (income - gross) * 100 / income;
    } else {
      gross_tax = 0
    }
        
    var line = "<td>" + income + "</td>";
    line +=  "<td>" + transfer + "</td>";
    line +=  "<td>" + gross + "</td>";
    if (income === 0) {
      line += "<td> - </td>";
    } else {
      line +=  "<td>" + parseFloat(gross_tax).toFixed(1) + "% </td>";
    }
    var rowElement = document.createElement('tr');
    rowElement.innerHTML = line;
    basic_table.appendChild(rowElement);       

    var line = "<td>" + income + "</td>";
    line +=  "<td>" + from_account.toFixed(0) + "</td>";
    line +=  "<td>" + -to_account.toFixed(0) + "</td>";
    line +=  "<td>" + to_government.toFixed(0) + "</td>";
    line +=  "<td>" + gross.toFixed(0) + "</td>";
    if (income === 0) {
      line += "<td> - </td>";
    } else {
      line +=  "<td>" + parseFloat(gross_tax).toFixed(1) + "% </td>";
    }
    var rowElement = document.createElement('tr');
    rowElement.innerHTML = line;
    account_table.appendChild(rowElement);       
  }
}

function read_values_and_calculate() {
	var basic_income = parseInt(document.getElementById("input_basic_income_amount").value);
	if ((basic_income == NaN) || (basic_income < 0)) {
		basic_income = 0;
	} 
	
	var margin = parseInt(document.getElementById("input_margin_pct").value);
	if ((margin == NaN) || (margin < 0) || (margin > 100)) {		
		margin = 50;
	}
	var mandatory_save_pct = parseInt(document.getElementById("mandatory_save_pct").value);
	if ((mandatory_save_pct == NaN) || (mandatory_save_pct < 0) || (mandatory_save_pct > 100)) {
		mandatory_save_pct = 0;
	}
	
	calculate_basic_income_table(basic_income, margin, mandatory_save_pct);	
}

function calculate_button_clicked(event) {
	console.log('Click');
    read_values_and_calculate();
}

function init() {
	var calculate_button = document.getElementById("calculate_button");
	calculate_button.onclick = calculate_button_clicked;
	read_values_and_calculate();
}

addEventListener('load', init);


