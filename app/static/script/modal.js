$(document).ready(function () {
    $('#task-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget); // Button that triggered the modal
        let taskID = button.data('source'); // Extract info from data-* attributes
        let content = button.data('content'); // Extract info from data-* attributes

       let modal = $(this);
            modal.find('.modal-title').text(taskID);
            $('#task-form-display').removeAttr('taskID');
        if (content) {
            modal.find('.form-control').val(content);
        } else {
            modal.find('.form-control').val('');
        }
    })

    $('#edit-modal').on('show.bs.modal', function (event) {
        let button = $(event.relatedTarget); // Button that triggered the modal
        let taskID = button.data('source'); // Extract info from data-* attributes
        let content = button.data('content'); // Extract info from data-* attributes

       let modal = $(this);
            modal.find('.modal-title').text('Edit Task ' + taskID);
            $('#task-form-display').attr('taskID', taskID);

        if (content) {
            modal.find('.form-control').val(content);
        } else {
            modal.find('.form-control').val('');
        }
    })


    $('#edit-task').click(function () {
        let tID = $('#task-form-display').attr('taskID');
        console.log($('#edit-modal').find('.form-control').val());
        $.ajax({
            type: 'POST',
            url: '/edit/'+tID,
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'description': $('#edit-modal').find('.form-control').val()
            }),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('#submit-task').click(function () {
        console.log($('#task-modal').find('.form-control').val());
        $.ajax({
            type: 'POST',
            url: '/create',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'description': $('#task-modal').find('.form-control').val()
            }),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('.remove').click(function () {
        let remove = $(this);
        $.ajax({
            type: 'POST',
            url: '/delete/' + remove.data('source'),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('.state').click(function () {
        let state = $(this);
        let tID = state.data('source');
        let new_state;
        if (state.text() === "In Progress") {
            new_state = "Complete";
        } else if (state.text() === "Complete") {
            new_state = "Todo";
        } else if (state.text() === "Todo") {
            new_state = "In Progress";
        }

        $.ajax({
            type: 'POST',
            url: '/edit/' + tID,
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'status': new_state
            }),
            success: function (res) {
                console.log(res)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('.clear').click(function () {
        $.ajax({
            type: 'POST',
            url: '/clear',
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

});