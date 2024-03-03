import dash
from dash import dcc, html
import plotly.graph_objs as go
import pandas as pd
import numpy as np

# Example data: list of sets of symptoms
symptom_sets = [
["Headache", "Fever", "Cough"],
    ["Fever", "Nausea"],
    ["Headache", "Fever"],
    ["Cough", "Sore Throat"],
    ["Nausea", "Vomiting"],
    ["Fever", "Cough", "Sore Throat"],
    ["Headache", "Nausea", "Dizziness"],
    ["Fever", "Cough", "Nausea", "Vomiting"]
]

# Data Preparation
symptom_counts = pd.Series(np.concatenate(symptom_sets)).value_counts()
co_occurrences = pd.Series([(min(s1, s2), max(s1, s2)) for ss in symptom_sets for s1 in ss for s2 in ss if s1 != s2]).value_counts()

# Create a mapping from symptom to its position for plotting
positions = {symptom: (np.random.rand()*10, np.random.rand()*10) for symptom in symptom_counts.index}

# Constructing the Graph
edges = []
for (s1, s2), count in co_occurrences.items():
    x0, y0 = positions[s1]
    x1, y1 = positions[s2]
    edges.append(go.Scatter(x=[x0, x1], y=[y0, y1], mode='lines', line=dict(width=count)))

nodes = go.Scatter(
    x=[pos[0] for pos in positions.values()],
    y=[pos[1] for pos in positions.values()],
    mode='markers+text',
    text=symptom_counts.index,
    marker=dict(size=symptom_counts*10)  # Adjust size multiplier as needed
)

# Dash App
app = dash.Dash(__name__)
app.layout = html.Div([
    dcc.Graph(
        id='symptom-network',
        figure={
            'data': edges + [nodes],
            'layout': go.Layout(showlegend=False, xaxis={'showgrid': False, 'zeroline': False}, yaxis={'showgrid': False, 'zeroline': False})
        }
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
