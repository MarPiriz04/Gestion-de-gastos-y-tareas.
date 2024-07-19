document.addEventListener('DOMContentLoaded', function () {
    const financeForm = document.getElementById('finance-form');
    const taskForm = document.getElementById('task-form');
    const financeChartCtx = document.getElementById('finance-chart').getContext('2d');
    const financeList = document.getElementById('finance-list');
    
    let finances = JSON.parse(localStorage.getItem('finances')) || [];
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function saveFinances() {
        localStorage.setItem('finances', JSON.stringify(finances));
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function updateChart() {
        const income = finances.filter(finance => finance.type === 'income').reduce((sum, current) => sum + current.amount, 0);
        const expenses = finances.filter(finance => finance.type === 'expense').reduce((sum, current) => sum + current.amount, 0);
        new Chart(financeChartCtx, {
            type: 'pie',
            data: {
                labels: ['Ingresos', 'Gastos'],
                datasets: [{
                    data: [income, expenses],
                    backgroundColor: ['#4CAF50', '#FF6384'],
                }]
            },
        });
    }
    function renderFinances() {
        financeList.innerHTML = '';
        finances.forEach((finance, index) => {
            const li = document.createElement('li');
            li.textContent = `${finance.amount} - ${finance.type} - ${finance.description}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'No podrás revertir esto',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        finances.splice(index, 1);
                        saveFinances();
                        renderFinances();
                        updateChart();
                        Swal.fire('Eliminado', 'La finanza ha sido eliminada.', 'success');
                    }
                });
            });
            li.appendChild(deleteButton);
            financeList.appendChild(li);
        });
    }
    financeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const type = document.getElementById('type').value;
        const description = document.getElementById('description').value;
        finances.push({ amount, type, description });
        saveFinances();
        renderFinances();
        updateChart();
        Swal.fire('¡Éxito!', 'Finanza agregada', 'success');
    });
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const task = document.getElementById('task').value;
        const date = document.getElementById('date').value;
        tasks.push({ task, date });
        saveTasks();
        renderTasks();
        Swal.fire('¡Éxito!', 'Tarea agregada', 'success');
    });
    function renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach((taskItem, index) => {
            const li = document.createElement('li');
            li.textContent = `${taskItem.task} - ${taskItem.date}`; 
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'No podrás revertir esto',
                    icon: 'warning',
                    showCancelshowCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        tasks.splice(index, 1);
                        saveTasks();
                        renderTasks();
                        Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
                    }
                });
            });
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }
    function renderFinances() {
        financeList.innerHTML = '';
        finances.forEach((finance, index) => {
            const li = document.createElement('li');
            li.textContent = `${finance.amount} - ${finance.type} - ${finance.description}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: 'No podrás revertir esto',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminarlo'
                }).then((result) => {
                    if (result.isConfirmed) {
                        finances.splice(index, 1);
                        saveFinances();
                        renderFinances();
                        updateChart();
                        Swal.fire('Eliminado', 'La finanza ha sido eliminada.', 'success');
                    }
                });
            });
            li.appendChild(deleteButton);
            financeList.appendChild(li);
        });
    }
    renderTasks();
    renderFinances();
    updateChart();
    const timezoneSelect = document.getElementById('timezone');
    const fetchTimeButton = document.getElementById('fetch-time-button');
    const currentTimeElement = document.getElementById('current-time');
    const timezones = {
        'UTC': 'Etc/UTC',
        'GMT': 'Etc/GMT',
        'PST': 'America/Los_Angeles',
        'EST': 'America/New_York'
    };
    for (const [label, zone] of Object.entries(timezones)) {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = label;
        timezoneSelect.appendChild(option);
    }
    fetchTimeButton.addEventListener('click', function() {
        const selectedZone = timezoneSelect.value;
        fetch(`https://worldtimeapi.org/api/timezone/${selectedZone}`)
            .then(response => response.json())
            .then(data => {
                const dateTime = new Date(data.datetime);
                currentTimeElement.textContent = `Hora actual en ${selectedZone}: ${dateTime.toLocaleString()}`;
            })
            .catch(error => {
                console.error('Error al obtener la hora:', error);
                currentTimeElement.textContent = 'Error al obtener la hora';
            });
    });
});
// Función para limpiar el LocalStorage
function clearLocalStorage() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, reiniciarlo'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('finances');
            localStorage.removeItem('tasks');
            location.reload(); // Recargar la página para actualizar los datos
            Swal.fire(
                'Reiniciado',
                'Los datos han sido reiniciados.',
                'success'
            );
        }
    });
}