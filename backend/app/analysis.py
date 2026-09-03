import pandas as pd
import numpy as np
import json
from datetime import datetime

def generate_viz_a_data(df):
    """Visualization A: Distribution of Transaction Amounts"""
    try:
        hist, bin_edges = np.histogram(df['TransactionAmount'], bins=60)
        bin_labels = [f"£{bin_edges[i]:.0f}-£{bin_edges[i+1]:.0f}" for i in range(len(bin_edges)-1)]
        
        return {
            'success': True,
            'chart_type': 'histogram',
            'title': 'Distribution of Transaction Amounts',
            'data': {
                'bins': bin_labels,
                'frequencies': hist.tolist(),
                'mean': float(df['TransactionAmount'].mean()),
                'median': float(df['TransactionAmount'].median()),
                'std': float(df['TransactionAmount'].std())
            }
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

def generate_viz_b_data(df):
    """Visualization B: Transaction Amount Over Time"""
    try:
        df['Date'] = pd.to_datetime(df['Date'])
        daily_revenue = df.groupby('Date')['TransactionAmount'].sum().reset_index()
        
        df['Week'] = df['Date'].dt.to_period('W')
        weekly_revenue = df.groupby('Week')['TransactionAmount'].sum().reset_index()
        weekly_revenue['Week'] = weekly_revenue['Week'].astype(str)
        
        return {
            'success': True,
            'chart_type': 'line',
            'title': 'Transaction Amount Over Time',
            'data': {
                'daily': {
                    'dates': daily_revenue['Date'].astype(str).tolist(),
                    'revenues': daily_revenue['TransactionAmount'].tolist()
                },
                'weekly': {
                    'weeks': weekly_revenue['Week'].tolist(),
                    'revenues': weekly_revenue['TransactionAmount'].tolist()
                }
            }
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

def generate_viz_c_data(df):
    """Visualization C: Revenue by Product Category"""
    try:
        category_revenue = df.groupby('Category')['TransactionAmount'].agg(['sum', 'count']).reset_index()
        category_revenue = category_revenue.sort_values('sum', ascending=False)
        
        total_revenue = category_revenue['sum'].sum()
        
        return {
            'success': True,
            'chart_type': 'bar',
            'title': 'Revenue by Product Category',
            'data': {
                'categories': category_revenue['Category'].tolist(),
                'revenues': category_revenue['sum'].tolist(),
                'transaction_counts': category_revenue['count'].tolist(),
                'percentages': (category_revenue['sum'] / total_revenue * 100).tolist()
            }
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

def generate_viz_d_data(df):
    """Visualization D: Customer Purchasing Behavior"""
    try:
        customer_spend = df.groupby('CustomerNo')['TransactionAmount'].sum().reset_index()
        customer_spend.columns = ['CustomerNo', 'TotalSpend']
        
        country_revenue = df.groupby('Country')['TransactionAmount'].sum().reset_index()
        country_revenue.columns = ['Country', 'Revenue']
        country_revenue = country_revenue.sort_values('Revenue', ascending=False).head(10)
        
        return {
            'success': True,
            'chart_type': 'scatter',
            'title': 'Customer Purchasing Behavior',
            'data': {
                'customer_stats': {
                    'total_customers': len(customer_spend),
                    'avg_spend': float(customer_spend['TotalSpend'].mean()),
                    'median_spend': float(customer_spend['TotalSpend'].median()),
                    'max_spend': float(customer_spend['TotalSpend'].max()),
                    'min_spend': float(customer_spend['TotalSpend'].min())
                },
                'top_countries': country_revenue['Country'].tolist(),
                'country_revenues': country_revenue['Revenue'].tolist()
            }
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

def generate_insights(df):
    """Generate business insights"""
    try:
        df['Date'] = pd.to_datetime(df['Date'])
        
        insights = {
            'success': True,
            'summary': {
                'total_revenue': float(df['TransactionAmount'].sum()),
                'total_transactions': len(df),
                'average_transaction': float(df['TransactionAmount'].mean()),
                'unique_customers': int(df['CustomerNo'].nunique()),
                'unique_countries': int(df['Country'].nunique()),
                'date_range': f"{df['Date'].min().date()} to {df['Date'].max().date()}"
            },
            'top_categories': df.groupby('Category')['TransactionAmount'].sum().nlargest(3).to_dict(),
            'top_countries': df.groupby('Country')['TransactionAmount'].sum().nlargest(5).to_dict()
        }
        return insights
    except Exception as e:
        return {'success': False, 'error': str(e)}
