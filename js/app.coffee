# Mainly DOM manipulation

$(document).ready ->
  console.log 'Super Simple Tasks v1.4'
  console.log 'Like looking under the hood? Feel free to help make this site better at https://github.com/humphreybc/super-simple-tasks'

  $new_task_input = $('#new-task')

  # Runs functions on page load
  initialize = ->
    allTasks = Task.getAllTasks()
    Views.showTasks(allTasks)
    $new_task_input.focus()

    tour = $('#tour').tourbus({onStop: Views.finishTour})

    # Start the tour if it hasn't run before and the window is wider than 600px
    if (localStorage.getItem('sst-tour') == null) and ($(window).width() > 600) and (allTasks.length > 0)
      tour.trigger 'depart.tourbus'

    # Show the What's new dialog if the user has seen the tour, hasn't seen the dialog
    if (localStorage.getItem('sst-tour') != null) and (localStorage.getItem('whats-new') == null)
      $('.whats-new').show()

  # Dismissing the what's new dialog
  $('#whats-new-close').click (e) ->
    $('.whats-new').hide()
    Views.closeWhatsNew()

  # Triggers the setting of the new task when clicking the button
  $('#task-submit').click (e) ->
    e.preventDefault()

    name = $new_task_input.val()
    Task.setNewTask(name)
    
    $('#new-task').val('')
    $('#new-task').focus()

  # Click Mark all done. If there are no tasks, gives you a different message.
  $('#mark-all-done').click (e) ->
    e.preventDefault()  
    allTasks = Task.getAllTasks()
    if allTasks.length == 0
      confirm 'No tasks to mark done!'
    else
      if confirm 'Are you sure you want to mark all tasks as done?'
        Task.markAllDone()
      else
        return

  # Click Export tasks
  $('#export-tasks').click (e) ->
    e.preventDefault()
    allTasks = Task.getAllTasks()
    Exporter(allTasks, 'super simple tasks backup', true)

  # If the user clicks on the undo thing, run Task.undoLast()
  $('#undo').click (e) ->
    Task.undoLast()

  # When you click the checkbox or the label for the checkbox, 
  # hide the entire li and run markDone() to remove from storage
  $(document).on 'click', '#task-list li label input', (e) ->
    li = $(this).closest('li')
    
    li.slideToggle ->
      Task.markDone(Views.getId(li))

  # Click on an attribute (in this case .priority)
  # Run the changeAttr() function and pass parameter
  $(document).on 'click', '.priority', (e) ->
    e.preventDefault()
    type_attr = $(e.currentTarget).attr('type')
    value = $(this).attr(type_attr)
    li = $(this).closest('li')
    
    Task.changeAttr(li, type_attr, value)

  # When hovering over a task, unfocus the new task input field
  $(document).on
    mouseenter: ->
      $new_task_input.blur()

  , '.task'

  # Runs the initialize function when the page loads
  initialize()

