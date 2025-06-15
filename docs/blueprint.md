# **App Name**: Cloud Price Comparator

## Core Features:

- Service and Region Selection: Allow users to select specific cloud services (e.g., compute, storage, database) and regions for comparison.
- Dynamic Pricing Table: Fetch pricing data from a GCS bucket to populate a table, in which different cloud providers' costs are presented in a consistent, sortable manner.
- Price Table: Display the compared prices of AWS, Azure and GCP in a clear table. Allows users to sort and filter the table, and has clear indications when data is outdated
- AI Config Tool: AI powered pricing alerts - a tool that identifies optimal configurations across cloud providers and recommend configurations based on cost.
- Automated Data Update: Automated data updates via background processes which retrieve pricing data and keeps prices updated.

## Style Guidelines:

- Primary color: HSL(220, 70%, 50%) converted to RGB hex: #337AB7 for trustworthiness.
- Background color: HSL(220, 20%, 95%) converted to RGB hex: #F2F4F7 - soft, light background to ensure readability.
- Accent color: HSL(250, 50%, 60%) converted to RGB hex: #7A52DD for interactive elements.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text.
- Use consistent, simple icons from a set like Material Icons or FontAwesome to represent cloud services and regions.
- A clean, tabular layout with clear separation of cloud providers, services, and regions for easy comparison.
- Subtle transition effects when sorting or filtering the price table.