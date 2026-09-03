from flask import Blueprint, jsonify, request
import pandas as pd
import os
from . import analysis

bp = Blueprint('api', __name__, url_prefix='/api')

# Load data
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'cleaned_data.csv')

try:
    df = pd.read_csv(DATA_PATH)
    df['Date'] = pd.to_datetime(df['Date'])
except Exception as e:
    print(f"Error loading data: {e}")
    df = None

@bp.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'message': 'DataVinci Analytics API is running',
        'version': '1.0.0'
    }), 200

@bp.route('/data/summary', methods=['GET'])
def get_summary():
    """Get summary statistics"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    
    summary = {
        'total_transactions': len(df),
        'total_revenue': float(df['TransactionAmount'].sum()),
        'average_transaction': float(df['TransactionAmount'].mean()),
        'median_transaction': float(df['TransactionAmount'].median()),
        'unique_customers': int(df['CustomerNo'].nunique()),
        'unique_countries': int(df['Country'].nunique()),
        'unique_categories': int(df['Category'].nunique())
    }
    return jsonify(summary), 200

@bp.route('/visualizations/a', methods=['GET'])
def get_viz_a():
    """Get Visualization A data"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    data = analysis.generate_viz_a_data(df)
    return jsonify(data), 200

@bp.route('/visualizations/b', methods=['GET'])
def get_viz_b():
    """Get Visualization B data"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    data = analysis.generate_viz_b_data(df)
    return jsonify(data), 200

@bp.route('/visualizations/c', methods=['GET'])
def get_viz_c():
    """Get Visualization C data"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    data = analysis.generate_viz_c_data(df)
    return jsonify(data), 200

@bp.route('/visualizations/d', methods=['GET'])
def get_viz_d():
    """Get Visualization D data"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    data = analysis.generate_viz_d_data(df)
    return jsonify(data), 200

@bp.route('/insights', methods=['GET'])
def get_insights():
    """Get business insights"""
    if df is None:
        return jsonify({'error': 'Data not loaded'}), 500
    insights = analysis.generate_insights(df)
    return jsonify(insights), 200
