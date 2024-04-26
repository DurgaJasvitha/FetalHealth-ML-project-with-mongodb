import pickle
import pandas as pd
import sys
import json
a=str(sys.argv[1])
# Assuming you have a new input row as a pandas DataFrame
res = json.loads(a)
res.pop("_id", None)  # Remove "_id" key if it exists
res = {k: float(v) for k, v in res.items()}




new_input = pd.DataFrame([res])


# Load the trained model
with open('dbms_model.pkl', 'rb') as file:
    model = pickle.load(file)

predicted_label = model.predict(new_input)
print(int(predicted_label)+1)


