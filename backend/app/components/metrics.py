# app/components/metrics.py
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

def calculate_metrics(submission_path: str, ground_truth_path: str):
    submission_df = pd.read_csv(submission_path, delimiter=',')
    ground_truth_df = pd.read_csv(ground_truth_path, delimiter=',')

    merged_df = pd.merge(submission_df, ground_truth_df, on='id')

    y_pred = merged_df['predicted']
    y_true = merged_df['ground_truth']

    accuracy = float(accuracy_score(y_true, y_pred))
    precision = float(precision_score(y_true, y_pred, average='binary'))
    recall = float(recall_score(y_true, y_pred, average='binary'))
    f1 = float(f1_score(y_true, y_pred, average='binary'))

    return accuracy, precision, recall, f1

def calculate_final_score(accuracy, jury_score, weight_accuracy=0.7, weight_jury=0.3):
    if accuracy is None:
        accuracy = 0
    if jury_score is None:
        jury_score = 0
    return weight_accuracy * accuracy + weight_jury * jury_score
