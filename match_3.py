# return a list of lists of continous blocks, for example [7, 7, 7, 7] should return [[7, 4]] where
# 7 is the element and 4 is the length, and [1, 2, 3, 4] should return []
def match_3(a_list: list) -> list:
    result = []
    if not a_list:
        return []
    pre = None
    i = 0
    count = 1
    while i < len(a_list):
        if pre == None:
            pre = a_list[i]
        else:
            if pre == a_list[i]:
                count += 1
            else: # different element
                if count >= 3:
                    result.append([pre, count])
                count = 1
                pre = a_list[i]
        if i == len(a_list) - 1 and count >= 3:
            result.append([pre, count])
        i += 1      
             
    return result                    

if __name__ == "__main__":
    print(match_3([1, 2, 3]))
    print(match_3([7, 7, 7, 7]))
    print(match_3([7, 7, 7, 3, 3, 3, 3]))
    print(match_3([7, 7, 3, 3, 3, 3]))
    print(match_3([7, 7, 7, 3, 3, 3, 3, 1]))
    print(match_3([]))