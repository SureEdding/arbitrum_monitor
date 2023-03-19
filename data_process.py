
# read cex_addresses.csv file into arrays
import csv
import json

with open('cex_addresses.csv', 'r') as f:
    reader = csv.reader(f)
    addresses = list(reader)
    # split each line into two columns
    result = {}
    for i in range(len(addresses)):
        line = addresses[i]
        address = line[0]
        cex = line[1]
        if cex not in result:
            result[cex] = []
        result[cex].append(address)
    # write the result to a json file
    with open('cex_addresses.json', 'w') as f:
        json.dump(result, f)
