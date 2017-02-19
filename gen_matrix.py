#!/usr/bin/env python
import json
from jinja2 import FileSystemLoader, Environment

# Load restaurant list from JSON
with open('restaurant_list.json') as f:
    data = json.load(f)

desired_cats = data['Categories']

# Create a list of restaurants for each category
lists = {}
found_cats = set()
for rest in data['Restaurants']:
    for cat in rest['categories']:
        found_cats.add(cat)
        try:
            lists[cat].append(rest['name'])
        except KeyError:
            lists[cat] = [rest['name']]

# Ensure that the categories found in the restaurant list match those in the
# desired category list.  This is essentially a typo check on the JSON.
if set(desired_cats) != found_cats:
    raise ValueError('Detected restaurant categories do not match the '
            'category list.')

loader = FileSystemLoader('.')
env = Environment(loader=loader, trim_blocks=True, lstrip_blocks=True)
template = env.get_template('template.html')
output = template.render(categories=desired_cats, lists=lists)

with open('mobile.html', 'w') as f:
    f.write(output)
