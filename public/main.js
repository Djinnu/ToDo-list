const item = document.querySelectorAll('.item span')
const del = document.querySelectorAll('.fa-trash')
const itemCompleted = document.querySelectorAll('.item .completed')

Array.from(del).forEach(x => x.addEventListener('click', deleteItem))
Array.from(item).forEach(x => x.addEventListener('click', markComplete))
Array.from(itemCompleted).forEach(x => x.addEventListener('click', markUnComplete))

async function deleteItem() {
    const delItem = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': delItem
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.error(err)
    }   
}

async function markComplete() {
    const mark = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('/markCompleted', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': mark
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {
        console.log(err)
    }
}

async function markUnComplete() {
    const unComplete = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('/markUnComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': unComplete
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err) {
        console.log(err)
    }
}