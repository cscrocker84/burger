const createHTML = (id, burgerName, devoured = false) => {
    let container = $('<p>')
        .attr('id', 'burger-' + id + '-container')

    let name = $('<span>')
        .attr('id', 'burger-' + id + '-name')
        .text(burgerName)

    let btn = $('<button>')
        .data('id', id)

    if (devoured) {
        btn
            .addClass('remove-burger-btn btn btn-danger')
            .text('Remove')

    } else {
        btn
            .addClass('eat-burger-btn btn btn-success')
            .text('Eat!')
    }

    // append elements and return it
    container
        .append(name)
        .append(btn)

    return container
}

// event listeners
// $('.eat-burger-btn').click(function (evt) {
$('#uneaten-burgers').on('click', '.eat-burger-btn', function (evt) {

    // grab the burger id
    const id = $(this).data('id')
    const burgerName = $(`#burger-${id}-name`).text()

    // change the burger to devoured in the database
    $.ajax({
        method: 'PUT',
        url: '/burger',
        data: {
            id,
            devoured: true
        }
    }).then(data => {

        // copy the container to post later
        // const con = $(`#burger-${id}-container`)
        $(`#burger-${id}-container`).remove()
        // $('#eaten-burgers').append(con)

        // grab the burger name and create a new container for it
        const newElement = createHTML(id, burgerName, true)

        // append it to the 'Devoured' side
        $('#eaten-burgers')
            .append(newElement)

    })

})

// $('.remove-burger-btn').click(function (evt) {
$('#eaten-burgers').on('click', '.remove-burger-btn', function (evt) {

    // get the id
    const id = $(this).data('id')

    // delete request to database
    $.ajax({
        method: 'DELETE',
        url: '/burger',
        data: {
            id
        },
        success: data => {
            if (!data.success) {
                return console.log('Somthing went wrong when deleting the burger')
            }

            // remove element from the page
            $(`#burger-${id}-container`).remove()
        }
    })
})

$('#submit-order-form').submit(function (evt) {
    evt.preventDefault()
    
    // grab the name of the burger
    const burgerName = $('#new-burger-input').val()

    // add the burger to the database
    $.ajax({
        method: 'POST',
        url: '/burger',
        data: {
            name: burgerName
        }
    }).then(data => {
        if (data.success) {
            const insertId = data.insertId

            // create a container with the new id
            const newElement = createHTML(insertId, burgerName)

            // append it onto the uneaten burger side
            $('#uneaten-burgers').append(newElement)
            
            // clear the input 
            $('#new-burger-input').val('')
        } else {
            console.log('failed')
        }
    })
})