import pickle
import pandas as pd

# Assuming you have a new input row as a pandas DataFrame
new_input = pd.DataFrame({
    "baseline value": [148],
    "accelerations": [0],
    "fetal_movement": [0.005],
    "uterine_contractions": [0.002],
    "light_decelerations": [0],
    "severe_decelerations": [0],
    "prolongued_decelerations": [0],
    "abnormal_short_term_variability": [72],
    "mean_value_of_short_term_variability": [0.3],
    "percentage_of_time_with_abnormal_long_term_variability": [74],
    "mean_value_of_long_term_variability": [4.6],
    "histogram_width": [16],
    "histogram_min": [136],
    "histogram_max": [152],
    "histogram_number_of_peaks": [0],
    "histogram_number_of_zeroes": [0],
    "histogram_mode": [150],
    "histogram_mean": [148],
    "histogram_median": [150],
    "histogram_variance": [0],
    "histogram_tendency": [1]

    
    # ... include all the features in the same order as your training data
})


# Load the trained model
with open('dbms_model.pkl', 'rb') as file:
    model = pickle.load(file)

predicted_label = model.predict(new_input)
print(int(predicted_label)+1)


