"""
In Datadog, the live tail feature allows users to view logs in real-time, as they are being generated. It also allows you to match logs based on a query. You can enter specific search terms, and the live tail will only display the logs that match these criteria.

Inputs
The input list contains strings that start with either "Q:" or "L:". The live tail will need to match logs to previous queries.

Queries are prefixed with "Q: ", and consist of a case insensitive list of words which must all match.

Logs are prefixed with "L: ".

"""
livetail_stream = [
  "Q: database",
  "Q: Stacktrace",
  "Q: loading failed",
  "L: Database service started",
  "Q: snapshot loading",
  "Q: fail",
  "L: Started processing events",
  "L: Loading main DB snapshot",
  "L: Loading snapshot failed no stacktrace available",
]
"""

Outputs
The live tail outputs a list containing strings that start with either “ACK:” or “M:”.

“ACK:” represents an acknowledgment of a query. Queries are given unique IDs.

“M:” represents a response with successful matches. These indicate which query IDs matched the given log.

Given the input above, the expected output should be similar to the following:
"""

livetail_output = [
  "ACK: database; ID=1",
  "ACK: Stacktrace; ID=2",
  "ACK: loading failed; ID=3",
  "M: Database service started; Q=1",
  "ACK: snapshot loading; ID=4",
  "ACK: fail; ID=5",
  "M: Loading main DB snapshot; Q=4",
  "M: Loading snapshot failed no stacktrace available; Q=2,3,4",
]

def livetail(livetail_stream):
    query_id = 1
    queries = []
    for line in livetail_stream:
        query = get_query(line)
        if len(query) > 0:
            queries.append((query_id, query))
            print(f'ACK: {line}; ID="{query_id}"')
            query_id += 1
        else: # log line
            line = line.lower()
            # matching check
            matched_queries = get_matched_queries(line, queries)
            if len(matched_queries) > 0:
                queries_str = ",".join([str(x) for x in matched_queries])
                print(f'M: "{line}:; Q="{queries_str}"')

               
def get_query(input):
    input = input.lower()
    split_query = input.split(" ")
    # print("split_query=", split_query)
    if split_query[0] == "q:":
        # print("query=", split_query[1:]) 
        return split_query[1:]
       
    return []

def get_matched_queries(line, queries):
    result = []

    for query in queries:
        matched_all = True
        terms = query[1]
        for term in terms:
            if term not in line.split(" "):
                matched_all = False
                break
        if matched_all:
            result.append(query[0])
    return result

livetail(livetail_stream)                 