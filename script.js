

const getDbase = () => JSON.parse(localStorage.getItem('despesas')) ?? [];
const setDbase = (valores) => localStorage.setItem('despesas', JSON.stringify(valores))

function create(valores) {
    const arr = getDbase();
    arr.push(valores)
    setDbase(arr)

}

function DeleteOperator(index) {
    const arr = getDbase();
    arr.splice(index, 1);
    setDbase(arr)

}


function createBalance(event) {
    
    event.preventDefault()

    const balance = {

        name: document.getElementById('text').value, 
        amount: document.getElementById('amount').value, 
    
    }

    create(balance)
    initialize() 


}




const addTransactionsIntoDOM = (transaction, index) => {

    const operator = transaction.amount < 0 ? '-' :  '+'
    const li = document.createElement('li');

    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus' // 
    li.classList.add(CSSclass)

    li.innerHTML = `${transaction.name} <span> R$ ${operator} ${Math.abs(transaction.amount)} </span> <button id="delete-${index}" class="delete-btn">x</button> <button id="update-${index}" class=".update-btn">update</button>`
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

    document.querySelector('#balance').textContent = `R$ ${total}`
    document.querySelector('#money-minus').textContent = `R${despesas} ` 
    document.querySelector('#money-plus').textContent = `R${receita} `


}
 

function editDelete (event) {
    const [action, index] = event.target.id.split('-'); 
    if(action == 'delete'){
        DeleteOperator(index)
        initialize()

    }else {
        console.log('Editando')
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



document.querySelector('#form').addEventListener('submit', createBalance);
document.querySelector('#transactions').addEventListener('click', editDelete)