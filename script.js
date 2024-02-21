

const getDbase = () => JSON.parse(localStorage.getItem('despesas')) ?? [];
const setDbase = (valores) => localStorage.setItem('despesas', JSON.stringify(valores))

function create(valores) {
    const arr = getDbase();
    arr.push(valores)
    setDbase(arr)

}

function Update(index, newname, newamount) {
    const arr = getDbase()
    arr[index].name = newname
    arr[index].amount = newamount
    setDbase(arr)

}

function DeleteOperator(index) {
    const arr = getDbase();
    arr.splice(index, 1);
    setDbase(arr)

}


function saveBalance(event) {
    
    event.preventDefault()

    const InputText = document.getElementById('text').value
    const InputAmount = document.getElementById('amount').value

    if(InputText == "" || InputAmount == ""){
         alert('Informe o nome ou um valor válido, por favor!')
         return  
    }

    const balance = {

        name: document.getElementById('text').value, 
        amount: document.getElementById('amount').value, 
    
    }
    document.getElementById('text').value = ''
    document.getElementById('amount').value = ''

    const index = document.querySelector('#text').dataset.index
    
    if (index == 'new') {
        create(balance)
        initialize()
        location.reload()

    }else {
        Update(index, balance.name, balance.amount)
        initialize()
        location.reload()

    }


}




function createUpdate (arr) {
    document.querySelector('#text').value = arr.name;
    document.querySelector('#amount').value = arr.amount
    document.querySelector('#text').dataset.index = arr.index
}



function editFileds(index) {
    const valores = getDbase()[index]
    valores.index = index
    createUpdate(valores)

}


const addTransactionsIntoDOM = (transaction, index) => {

    const operator = transaction.amount < 0 ? ' - ' :  ' + '
    const li = document.createElement('li');

    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    li.classList.add(CSSclass)

    li.innerHTML = ` ${transaction.name}  R$ ${operator} ${Math.abs(transaction.amount)} </span>
    <div id="container-btn"> 
    <button id="delete-${index}" class="delete-btn">delete</button> 
    <button id="update-${index}" class="update-btn">update</button>
    </div>`
    document.querySelector('#transactions').prepend(li)
}


const UpdateBalance = () => {

    const values = getDbase()

    const balanceValues = values.map((transaction) => Number(transaction.amount));
    const total = balanceValues.reduce((acc, item) => acc + item, 0).toFixed(2);


    const salario = balanceValues.filter((value) => value > 0 );
    const gastos = balanceValues.filter((value) => value < 0);


    const receita = salario.reduce((acc, value) => acc + value, 0)
    const despesas = gastos.reduce((acc, value) => acc + value, 0)

    document.querySelector('#balance').textContent = ` ${total} R$`
    document.querySelector('#money-minus').textContent = `R$ ${Math.abs(despesas)} R$` 
    document.querySelector('#money-plus').textContent = ` ${receita} R$`


}
 

function editDelete (event) {
    const [action, index] = event.target.id.split('-'); 
    if(action == 'delete'){
        DeleteOperator(index)
        initialize()

    }else {
        editFileds(index)
        initialize()
    }

}


const initialize = () => {

    const valores = getDbase()
    document.querySelector('#transactions').innerHTML = ''
    valores.forEach(addTransactionsIntoDOM)
    UpdateBalance()
    setDbase(valores)

}

initialize() 


document.querySelector('#form').addEventListener('submit', saveBalance)
document.querySelector('#transactions').addEventListener('click', editDelete)