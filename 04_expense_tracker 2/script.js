document.addEventListener('DOMContentLoaded', () => {
    const expenseName = document.getElementById('expense-name')
    const expenseAmount = document.getElementById('expense-amount')
    const submitBtn = document.getElementById('submit')
    const expenseList = document.getElementById('expense-list')
    const totalAmount = document.getElementById('total-amount')

    let expenses = JSON.parse(localStorage.getItem('expenses')) || []
    
    saveExpenses()

    function saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    console.log(typeof parseFloat(totalAmount.innerText));

    expenses.forEach(e => {
        renderExpense(e)
    });

    submitBtn.addEventListener('click', (e) => {
        if(!expenseName.value || !expenseAmount.value)return;
            e.preventDefault()
            let expense = {
                id: new Date(),
                name : expenseName.value,
                amount: expenseAmount.value
            }

            expenses.push(expense)
            saveExpenses()
            renderExpense(expense)
            expenseName.value = ''
            expenseAmount.value = ''
    })



    
    
    function calculateTotal() {
        let total = 0;
        expenses.forEach(e => {
            total += parseInt(e.amount)
            console.log(total);
            
        });
        totalAmount.innerText = total
        
    }
    

    function renderExpense(expense) {
        let item = document.createElement('li')
        item.innerHTML = `
        <span>${expense.name} - $${expense.amount}</span>
        <button>Delete</button>`
        expenseList.appendChild(item)
        let total = calculateTotal() 
        //totalAmount.innerText = total
        
        item.addEventListener('click', (e) => {
            if(e.target.tagName = 'BUTTON'){ //event delegation
               e.target.parentNode.remove()

               expenses = expenses.filter((e) => 
                    e.id !== expense.id)

               saveExpenses()
               calculateTotal()
               //totalAmount.innerText = calculateTotal() 
            }
        })
    }
})