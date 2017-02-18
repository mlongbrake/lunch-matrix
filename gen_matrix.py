#!/usr/bin/env python
import json
from jinja2 import FileSystemLoader, Environment

# Load restaurant data from JSON
with open('restaurant_list.json') as f:
    data = json.load(f)

# Create a list of restaurants for each category
lists = {}
for cat in data['Categories']:
    lists[cat] = [x['name'] for x in data['Restaurants'] 
            if cat in x['categories']]

loader = FileSystemLoader('.')
env = Environment(loader=loader, trim_blocks=True, lstrip_blocks=True)
template = env.get_template('template.html')
output = template.render(Categories=data['Categories'], lists=lists)

with open('mobile.html', 'w') as f:
    f.write(output)
