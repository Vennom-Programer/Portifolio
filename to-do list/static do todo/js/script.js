const taskInput = document.getElementById('taskInput');
        const addBtn = document.getElementById('addBtn');
        const taskList = document.getElementById('taskList');
        const emptyMessage = document.getElementById('emptyMessage');
        const totalTasksEl = document.getElementById('totalTasks');
        const completedTasksEl = document.getElementById('completedTasks');
        const pendingTasksEl = document.getElementById('pendingTasks');

        // Carregar tarefas do localStorage
        function loadTasks() {
            const saved = localStorage.getItem('tasks');
            return saved ? JSON.parse(saved) : [];
        }

        // Salvar tarefas no localStorage
        function saveTasks(tasks) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Atualizar estatísticas
        function updateStats() {
            const tasks = loadTasks();
            const completed = tasks.filter(t => t.completed).length;
            const pending = tasks.length - completed;

            totalTasksEl.textContent = tasks.length;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }

        // Renderizar tarefas
        function renderTasks() {
            const tasks = loadTasks();
            taskList.innerHTML = '';

            if (tasks.length === 0) {
                emptyMessage.style.display = 'block';
            } else {
                emptyMessage.style.display = 'none';
                tasks.forEach((task, index) => {
                    const li = document.createElement('li');
                    li.className = `task-item ${task.completed ? 'completed' : ''}`;
                    li.innerHTML = `
                        <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} 
                            onchange="toggleTask(${index})">
                        <span class="task-text">${task.text}</span>
                        <button class="delete-btn" onclick="deleteTask(${index})">Deletar</button>
                    `;
                    taskList.appendChild(li);
                });
            }

            updateStats();
        }

        // Adicionar tarefa
        function addTask() {
            const text = taskInput.value.trim();
            if (text === '') {
                alert('Por favor, digite uma tarefa!');
                return;
            }

            const tasks = loadTasks();
            tasks.push({ text, completed: false });
            saveTasks(tasks);
            taskInput.value = '';
            renderTasks();
            taskInput.focus();
        }

        // Marcar tarefa como concluída
        function toggleTask(index) {
            const tasks = loadTasks();
            tasks[index].completed = !tasks[index].completed;
            saveTasks(tasks);
            renderTasks();
        }

        // Deletar tarefa
        function deleteTask(index) {
            if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
                const tasks = loadTasks();
                tasks.splice(index, 1);
                saveTasks(tasks);
                renderTasks();
            }
        }

        // Event listeners
        addBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTask();
        });

        // Renderizar ao carregar a página
        renderTasks();