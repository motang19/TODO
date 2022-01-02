from app import db

def fetch_todo() -> dict:
    conn = db.connect()
    query_results = conn.execute("Select * from tasks;").fetchall()
    conn.close()
    todo_list = []
    for result in query_results:
        item = {
            "id": result[0],
            "task": result[1],
            "status": result[2]
        }
        todo_list.append(item)
    return todo_list

def update_task_entry(task_id: int, text: str) -> None:
    conn = db.connect()
    query = 'Update tasks set task = "{}" where Id = {};'.format(text, task_id)
    conn.execute(query)
    conn.close()

def update_status_entry(task_id: int, text: str) -> None:
    conn = db.connect()
    query = 'Update tasks set status = "{}" where Id = {};'.format(text, task_id)
    conn.execute(query)
    conn.close()

def insert_new_task(text: str) ->  int:
    conn = db.connect()
    query = 'Insert Into tasks (task, status) VALUES ("{}", "{}");'.format(
        text, "Todo")
    conn.execute(query)
    query_results = conn.execute("Select LAST_INSERT_ID();")
    query_results = [x for x in query_results]
    task_id = query_results[0][0]
    conn.close()

    return task_id

def remove_task_by_id(task_id: int) -> None:
    """ remove entries based on task ID """
    conn = db.connect()
    query = 'Delete From tasks where Id={};'.format(task_id)
    conn.execute(query)
    max_num = conn.execute('SELECT MAX( Id ) FROM tasks ;')
    max_num = [x for x in max_num]
    query='ALTER TABLE tasks AUTO_INCREMENT = {};'.format(max_num[0][0]+1)
    conn.execute(query)
    
    conn.close()

def clear()->None:
    conn = db.connect()
    query = 'Delete From tasks'
    conn.execute(query)
    query='ALTER TABLE tasks AUTO_INCREMENT = 0;'
    conn.execute(query)
    query='ALTER TABLE tasks AUTO_INCREMENT = 0;'
    conn.execute(query)
