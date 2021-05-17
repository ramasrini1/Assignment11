import {getUsers} from './modules/init.js';

// CREATE AN ARRAY OF EMPLOYEES
let arrEmployees = [];
// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees');
let empCount    = document.querySelector('#empCount');
let counter = 0;

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(arrEmployees);

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            empTable.deleteRow(rowIndex);
            counter--;
            //empCount.value = `(${arrEmployees.length} -1)`;
            empCount.value = counter ;
        }
    }
});

// BUILD THE EMPLOYEES GRID
async function buildGrid(arrEmployees) {
    
    //arrEmployees = renderUsers();
    //console.log(arrEmployees);


    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
   
    let users= await getUsers();
    users.forEach(user => {
        //innerArray.push(`${user.id} ${user.name} ${user.ext} ${user.email} ${user.department}` );
        let innerArray = [];
        innerArray.push(user.id);
        innerArray.push(user.name) ;
        innerArray.push(user.ext) ;
        innerArray.push(user.email) ;
        innerArray.push(user.department) ;

        //${user.ext} ${user.email} ${user.department}` );
        arrEmployees.push(innerArray);
        counter++;
       
    });
     

   for (let employee of arrEmployees) {
    tbody.innerHTML += 
    `
    <tr>
        <td>${employee[0]}</td>
        <td>${employee[1]}</td>
        <td>${employee[2]}</td>
        <td><a href="mailto:${employee[3]}">${employee[3]}</a></td>
        <td>${employee[4]}</td>
        <td><button class="btn btn-sm btn-danger delete">X</button></td>
    </tr>
    `
    }
    
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody);
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrEmployees.length})`;
}
