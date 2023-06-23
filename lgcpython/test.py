import json

json_path = 'C:\\Users\\okafka\\Developer\\LGCReportGenerator\\lgcgenapp\\src\\data\\Example.json'

if __name__ == "__main__":
    with open(json_path, 'r') as f:
        data = json.load(f)
        print(data)