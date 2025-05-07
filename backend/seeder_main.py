from faker import Faker
from src.database.postgres import SessionLocal
from src.seeder.project import insert_initial_data
from src.database.postgres import engine, Base
from sqlalchemy import text

fake = Faker()

def check_data_exists(db):
    """
    Checks if data already exists in the main tables.
    Returns True if data is found, False if they are empty.
    """
    try:
        result = db.execute(text("SELECT COUNT(*) FROM projects")).scalar()
        if result > 0:
            return True
        return False
    except Exception as e:
        print(f"Error checking existing data: {e}")
        return False

def main():
    db = SessionLocal()
    try:
        Base.metadata.create_all(bind=engine)
        if check_data_exists(db):
            print("Data already exists in the database. Skipping insertion.")
        else:
            insert_initial_data(db)
            print("Initial data inserted successfully.")
    except Exception as e:
        print(f"Error during the seeding process: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    main()