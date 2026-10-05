from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)


# ==============================
# DATABASE CONNECTION
# ==============================

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Vaishnavi@1",
        database="smart_banking"
    )


# ==============================
# HOME
# ==============================

@app.route("/")
def home():
    return jsonify({
        "message": "Smart Banking Backend is running!"
    })


# ==============================
# HEALTH CHECK
# ==============================

@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "Backend API is healthy"
    })


# ==============================
# REGISTER
# ==============================

@app.route("/api/register", methods=["POST"])
def register():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({
            "message": "All fields are required"
        }), 400

    hashed_password = generate_password_hash(password)

    connection = None
    cursor = None

    try:

        connection = get_db_connection()
        cursor = connection.cursor()

        # Create user
        cursor.execute(
            """
            INSERT INTO users (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (name, email, hashed_password)
        )

        user_id = cursor.lastrowid

        # Automatically create a savings account
        account_number = "SB" + str(user_id).zfill(8)

        cursor.execute(
            """
            INSERT INTO accounts
            (user_id, account_number, account_type, balance)
            VALUES (%s, %s, %s, %s)
            """,
            (
                user_id,
                account_number,
                "Savings",
                0
            )
        )

        connection.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "name": name,
                "email": email
            }
        }), 201

    except mysql.connector.IntegrityError:

        if connection:
            connection.rollback()

        return jsonify({
            "message": "Email already exists"
        }), 409

    except Exception as e:

        if connection:
            connection.rollback()

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# ==============================
# LOGIN
# ==============================

@app.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email and password are required"
        }), 400

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE email = %s
            """,
            (email,)
        )

        user = cursor.fetchone()

        if not user:

            return jsonify({
                "message": "Invalid email or password"
            }), 401

        if not check_password_hash(
            user["password"],
            password
        ):

            return jsonify({
                "message": "Invalid email or password"
            }), 401

        return jsonify({

            "message": "Login successful",

            "user": {
                "id": user["user_id"],
                "name": user["name"],
                "email": user["email"]
            }

        }), 200

    except Exception as e:

        return jsonify({
            "message": str(e)
        }), 500

    finally:

        if cursor:
            cursor.close()

        if connection:
            connection.close()


# ==============================
# DASHBOARD API
# ==============================

@app.route("/api/dashboard/<int:user_id>", methods=["GET"])
def dashboard(user_id):

    connection = None
    cursor = None

    try:

        connection = get_db_connection()

        cursor = connection.cursor(dictionary=True)

        # --------------------------------
        # USER
        # --------------------------------

        cursor.execute(
            """
            SELECT user_id, name, email
            FROM users
            WHERE user_id = %s
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        if not user:

            return jsonify({
                "message": "User not found"
            }), 404


        # --------------------------------
        # TOTAL BALANCE
        # --------------------------------

        cursor.execute(
            """
            SELECT COALESCE(SUM(balance), 0) AS total_balance
            FROM accounts
            WHERE user_id = %s
            """,
            (user_id,)
        )

        balance_data = cursor.fetchone()

        total_balance = float(
            balance_data["total_balance"] or 0
        )


        # --------------------------------
        # THIS MONTH INCOME
        # --------------------------------

        cursor.execute(
            """
            SELECT COALESCE(SUM(t.amount), 0) AS total_income

            FROM transactions t

            INNER JOIN accounts a
                ON t.receiver_account_id = a.account_id

            WHERE a.user_id = %s

            AND t.transaction_type = 'Credit'

            AND t.status = 'Success'

            AND MONTH(t.transaction_date) = MONTH(CURRENT_DATE())

            AND YEAR(t.transaction_date) = YEAR(CURRENT_DATE())
            """,
            (user_id,)
        )

        income_data = cursor.fetchone()

        total_income = float(
            income_data["total_income"] or 0
        )


        # --------------------------------
        # THIS MONTH EXPENSES
        # --------------------------------

        cursor.execute(
            """
            SELECT COALESCE(SUM(t.amount), 0) AS total_expenses

            FROM transactions t

            INNER JOIN accounts a
                ON t.sender_account_id = a.account_id

            WHERE a.user_id = %s

            AND t.transaction_type IN ('Debit', 'Transfer')

            AND t.status = 'Success'

            AND MONTH(t.transaction_date) = MONTH(CURRENT_DATE())

            AND YEAR(t.transaction_date) = YEAR(CURRENT_DATE())
            """,
            (user_id,)
        )

        expense_data = cursor.fetchone()

        total_expenses = float(
            expense_data["total_expenses"] or 0
        )


        # --------------------------------
        # RECENT TRANSACTIONS
        # --------------------------------

        cursor.execute(
            """
            SELECT

                t.transaction_id,

                t.amount,

                t.location,

                t.category,

                t.transaction_type,

                t.status,

                t.transaction_date,

                CASE

                    WHEN receiver.user_id = %s
                    THEN 'income'

                    WHEN sender.user_id = %s
                    THEN 'expense'

                    ELSE 'other'

                END AS direction

            FROM transactions t

            LEFT JOIN accounts sender
                ON t.sender_account_id = sender.account_id

            LEFT JOIN accounts receiver
                ON t.receiver_account_id = receiver.account_id

            WHERE

                sender.user_id = %s

                OR receiver.user_id = %s

            ORDER BY t.transaction_date DESC

            LIMIT 5
            """,
            (
                user_id,
                user_id,
                user_id,
                user_id
            )
        )

        transactions = cursor.fetchall()


        # --------------------------------
        # FORMAT TRANSACTIONS
        # --------------------------------

        formatted_transactions = []

        for transaction in transactions:

            direction = transaction["direction"]

            amount = float(
                transaction["amount"]
            )

            if direction == "expense":

                display_amount = -amount

            else:

                display_amount = amount


            # Use category first,
            # then location,
            # then transaction type

            name = (
                transaction["category"]
                or transaction["location"]
                or transaction["transaction_type"]
            )


            formatted_transactions.append({

                "id": transaction["transaction_id"],

                "name": name,

                "category": (
                    transaction["category"]
                    or transaction["transaction_type"]
                ),

                "amount": display_amount,

                "direction": direction,

                "date": transaction["transaction_date"].strftime(
                    "%d %b %Y"
                ),

                "status": transaction["status"]

            })


        # --------------------------------
        # RETURN DASHBOARD DATA
        # --------------------------------

        return jsonify({

            "user": {

                "id": user["user_id"],

                "name": user["name"],

                "email": user["email"]

            },

            "summary": {

                "total_balance": total_balance,

                "income": total_income,

                "expenses": total_expenses

            },

            "transactions": formatted_transactions

        }), 200


    except Exception as e:

        return jsonify({

            "message": str(e)

        }), 500


    finally:

        if cursor:

            cursor.close()

        if connection:

            connection.close()


# ==============================
# RUN SERVER
# ==============================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )