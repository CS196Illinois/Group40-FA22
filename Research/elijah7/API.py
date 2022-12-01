import sqlite3
from flask import Flask, request, jsonify  # added to top of file
from flask_cors import CORS  # added to top of file


def connect_to_db():
    con = sqlite3.connect('database.db')
    return con


global conn


def create_table():
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE users (
                user_id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                admission TEXT NOT NULL,
                size TEXT NOT NULL,
                commitment TEXT NOT NULL,
                season TEXT NOT NULL
            );
        ''')
        conn.commit()
        print("User table created successfully")
    except Exception as e:
        print("User table creation failed - Maybe table")
        print(e)
    finally:
        conn.close()


def get_users():
    users = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            user = {"user_id": i["user_id"], "name": i["name"], "type": i["type"], "admission": i["admission"],
                    "size": i["size"], "commitment": i["commitment"], "season": i["season"]}
            users.append(user)

    except:
        users = []

    return users


def get_user_by_id(user_id):
    user = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE user_id = ?", user_id)
        row = cur.fetchone()

        # convert row object to dictionary
        user["user_id"] = row["user_id"]
        user["name"] = row["name"]
        user["type"] = row["type"]
        user["admission"] = row["admission"]
        user["size"] = row["size"]
        user["commitment"] = row["commitment"]
        user["season"] = row["season"]
    except:
        user = {}

    return user


def insert_user(user):
    inserted_user = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO users (name, type, admission, size, commitment, season) VALUES (?, ?, ?, ?, ?, ?)",
                    (user['name'], user['type'], user['admission'], user['size'], user['commitment'], user['season']))
        conn.commit()
        inserted_user = get_user_by_id(cur.lastrowid)
    except:
        conn().rollback()

    finally:
        conn.close()

    return inserted_user


def update_user(user):
    updated_user = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE users SET name = ?, type = ?, admission = ?, size = ?, commitment = ?, season = ? WHERE "
                    "user_id =?",
                    (user["name"], user["type"], user["admission"],
                     user["size"], user["commitment"], user["season"],
                     user["user_id"],))
        conn.commit()
        updated_user = get_user_by_id(user["user_id"])

    except:
        conn.rollback()
        updated_user = {}
    finally:
        conn.close()

    return updated_user


def delete_user(user_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from users WHERE user_id = ?", user_id)
        conn.commit()
        message["status"] = "User deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete user"
    finally:
        conn.close()

    return message


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/api/users', methods=['GET'])
def api_get_users():
    return jsonify(get_users())


@app.route('/api/users/<user_id>', methods=['GET'])
def api_get_user(user_id):
    return jsonify(get_user_by_id(user_id))


@app.route('/api/users/add', methods=['POST'])
def api_add_user():
    user = request.get_json()
    return jsonify(insert_user(user))


@app.route('/api/users/update', methods=['PUT'])
def api_update_user():
    user = request.get_json()
    return jsonify(update_user(user))


@app.route('/api/users/delete/<user_id>', methods=['DELETE'])
def api_delete_user(user_id):
    return jsonify(delete_user(user_id))

conn = connect_to_db()
cur = conn.cursor()
cur.fetchall()

table = create_table()

if __name__ == "__main__":
    # app.debug = True
    # app.run(debug=True)
    app.run()  # run app
