import pymongo

# Connect to the MongoDB database
client = pymongo.MongoClient("mongodb://localhost:27017/purchaseApp")
db = client["your_database_name"]
collection = db["your_collection_name"]

# Retrieve data from the collection
cursor = collection.find()

# Print each document in the collection
for document in cursor:
    print(document)
